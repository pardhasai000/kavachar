const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const dbDir = path.join(__dirname, '..', '..', 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'ps41_safety.db');
const db = new Database(dbPath);

// Enable foreign keys and WAL mode for high performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('admin', 'worker', 'verifier')),
      employee_id TEXT,
      department TEXT,
      avatar TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS modules (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      duration TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      sop_content TEXT NOT NULL,
      icon TEXT DEFAULT 'ShieldCheck',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS simulations (
      id TEXT PRIMARY KEY,
      module_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      scene_type TEXT NOT NULL,
      steps TEXT NOT NULL, -- JSON array of checklist items
      passing_score INTEGER DEFAULT 80,
      FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS simulation_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      module_id TEXT NOT NULL,
      score INTEGER NOT NULL,
      completed_steps TEXT NOT NULL,
      passed INTEGER NOT NULL,
      time_spent_secs INTEGER,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS assessments (
      id TEXT PRIMARY KEY,
      module_id TEXT NOT NULL,
      title TEXT NOT NULL,
      passing_percentage INTEGER DEFAULT 70,
      time_limit_mins INTEGER DEFAULT 10,
      questions TEXT NOT NULL, -- JSON array of questions
      FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS assessment_submissions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      module_id TEXT NOT NULL,
      assessment_id TEXT NOT NULL,
      score INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      percentage INTEGER NOT NULL,
      passed INTEGER NOT NULL,
      answers TEXT NOT NULL,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS certificates (
      id TEXT PRIMARY KEY,
      cert_number TEXT UNIQUE NOT NULL,
      user_id TEXT NOT NULL,
      user_name TEXT NOT NULL,
      module_id TEXT NOT NULL,
      module_title TEXT NOT NULL,
      score INTEGER NOT NULL,
      issue_date TEXT NOT NULL,
      expiry_date TEXT NOT NULL,
      tamper_hash TEXT NOT NULL,
      qr_code TEXT NOT NULL,
      status TEXT DEFAULT 'valid' CHECK(status IN ('valid', 'revoked')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      event_type TEXT NOT NULL,
      actor_name TEXT NOT NULL,
      details TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  seedData();
}

function computeTamperHash(data) {
  const str = `${data.cert_number}|${data.user_name}|${data.module_title}|${data.issue_date}|${data.score}|PS-41-AUTH-SEAL`;
  return crypto.createHash('sha256').update(str).digest('hex');
}

function seedData() {
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  if (userCount > 0) return;

  console.log('[DB] Seeding initial users, training modules, simulations, and assessments...');

  // 1. Seed Users
  const insertUser = db.prepare(`
    INSERT INTO users (id, name, email, password, role, employee_id, department, avatar)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertUser.run(
    'usr_admin_1',
    'Dr. Vikram Sharma',
    'admin@safety.gov.in',
    'admin123',
    'admin',
    'ADM-8092',
    'National Industrial Safety Bureau',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  );

  insertUser.run(
    'usr_worker_1',
    'Rajesh Kumar',
    'rajesh.kumar@plant.in',
    'worker123',
    'worker',
    'WRK-4107',
    'Heavy Machinery & Boiler Operations',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  );

  insertUser.run(
    'usr_worker_2',
    'Pooja Verma',
    'pooja.verma@grid.in',
    'worker123',
    'worker',
    'WRK-4108',
    'High Voltage Electrical Maintenance',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  );

  insertUser.run(
    'usr_verifier_1',
    'Inspector Ananya Patil',
    'inspector.patil@audit.org',
    'audit123',
    'verifier',
    'AUD-209',
    'Directorate General of Factory Advice',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  );

  // 2. Seed Modules
  const insertModule = db.prepare(`
    INSERT INTO modules (id, title, category, description, duration, difficulty, sop_content, icon)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertModule.run(
    'mod_boiler_01',
    'PS-41: Industrial Boiler & Steam Valve Safety Operations',
    'Machinery Safety',
    'Comprehensive standard operating procedures for high-pressure steam boilers, emergency valve depressurization, and explosive hazard containment in manufacturing plants.',
    '45 Mins',
    'Advanced',
    `# Standard Operating Procedure: High-Pressure Steam Boilers

## 1. Objective
Ensure zero-casualty protocols during sudden pressure surges in industrial water-tube and fire-tube boiler systems exceeding 150 PSI.

## 2. Personal Protective Equipment (PPE) Mandatory Checklist
- **Class E Heat-Resistant Safety Helmet** with full polycarbonate face visor.
- **Heavy Aluminized Heat-Reflective Kevlar Gloves** (rated for >350°C contact).
- **Steel-Toe Non-Conductive Anti-Static Boots** (EN ISO 20345 compliant).
- **Audio-Visual Personal Gas & Steam Sniffer Badge**.

## 3. Emergency Depressurization Drill
1. **Visual Scan**: Confirm pressure dial status. If needles swing into the red zone (>160 PSI), do NOT open drain valves directly.
2. **Emergency Isolator Kill-Switch**: Engage the magnetic trip lever within 8 seconds of audible high-pitch whistle alert.
3. **Manual Safety Relief Bypass**: Rotate primary counterweight steam blowdown wheel 4 full counter-clockwise turns until audible venting initiates.
4. **CO2 Auxiliary Discharge**: Suppress secondary electrical flame front at furnace burner base using PASS method.`,
    'Flame'
  );

  insertModule.run(
    'mod_electrical_02',
    'PS-41: High-Voltage Substation & Arc-Flash Safety Drill',
    'Electrical Safety',
    'Rigorous protocols for 33kV switchyard maintenance, Lockout/Tagout (LOTO) verification, live ground-line discharge, and NFPA 70E Arc-Flash compliance.',
    '35 Mins',
    'Expert',
    `# SOP: High-Voltage Switchgear & LOTO Execution

## 1. Safety Boundary Zones
Maintain minimum approach distance of 3.2 meters for uninsulated 33kV overhead lines unless certified grounding clamps are anchored.

## 2. Lockout / Tagout (LOTO) Sequence
1. De-energize primary breaker and withdraw draw-out circuit trolley.
2. Affix dual padlocks with distinct master keys and red danger tags.
3. Use calibrated contactless capacitive voltage detector rod to confirm ZERO live residual charge.
4. Fasten portable cluster grounding earth clamps starting strictly from earth ground first, then phase conductors.`,
    'Zap'
  );

  insertModule.run(
    'mod_hazmat_03',
    'PS-41: Hazardous Chemical Spill & Toxic Gas Emergency Protocol',
    'Chemical Safety',
    'Rapid-response hazardous material containment, Level-B Hazmat suit deployment, neutralizer absorbent application, and victim decontamination triage.',
    '30 Mins',
    'Intermediate',
    `# SOP: Corrosive & Volatile Chemical Incident Protocol

## 1. Immediate Evacuation Radius
Establish 100-meter exclusion perimeter upwind of the spill plume.

## 2. Neutralization Protocol
- Never spray direct water jets on concentrated Oleum or Sulphuric acid containers.
- Deploy dry Soda Ash absorbent polymer barrier around spill drainage perimeter.
- Activate emergency eyewash & drench shower continuously for minimum 15 minutes upon contact.`,
    'Biohazard'
  );

  // 3. Seed Simulations
  const insertSim = db.prepare(`
    INSERT INTO simulations (id, module_id, title, description, scene_type, steps, passing_score)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const boilerSteps = [
    {
      id: 'step_ppe',
      label: 'Equip Safety Gear (PPE Check)',
      instruction: 'Verify and equip full industrial PPE: Visor Helmet, Aluminized Heat Gloves, and Steel-Toe Boots.',
      targetHotspot: 'ppe_station',
      completed: false
    },
    {
      id: 'step_gauge',
      label: 'Inspect Boiler Pressure Gauge',
      instruction: 'Walk to the steam manifold and verify gauge readings. Note the critical red warning state (>180 PSI).',
      targetHotspot: 'pressure_gauge',
      completed: false
    },
    {
      id: 'step_valve',
      label: 'Operate Steam Release Relief Valve',
      instruction: 'Turn the safety release valve wheel counter-clockwise to vent excess pressure down to safe operating range.',
      targetHotspot: 'relief_valve',
      completed: false
    },
    {
      id: 'step_switch',
      label: 'Trigger Emergency Fuel Cutoff Switch',
      instruction: 'Engage the master red emergency shutoff lever to immediately cut burner fuel supply and extinguish combustion.',
      targetHotspot: 'emergency_switch',
      completed: false
    },
    {
      id: 'step_extinguish',
      label: 'Deploy Class B/CO2 Fire Extinguisher',
      instruction: 'Aim nozzle at burner base and spray suppressant in a sweeping motion to secure the hazard zone.',
      targetHotspot: 'fire_extinguisher',
      completed: false
    }
  ];

  insertSim.run(
    'sim_boiler_01',
    'mod_boiler_01',
    '3D/AR High-Pressure Steam Hazard Response Simulation',
    'Step onto the factory floor in interactive 3D/AR. Complete critical equipment handling and emergency decompression under simulated high-pressure hazard conditions.',
    'boiler_plant',
    JSON.stringify(boilerSteps),
    80
  );

  // 4. Seed Assessments
  const insertAssessment = db.prepare(`
    INSERT INTO assessments (id, module_id, title, passing_percentage, time_limit_mins, questions)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const boilerQuestions = [
    {
      id: 'q1',
      question: 'When the boiler pressure gauge enters the critical red zone (>180 PSI), what is the first priority action?',
      options: [
        'Pour cold water directly into the boiler firebox',
        'Turn on maximum feedwater intake immediately',
        'Trigger the Emergency Fuel Cutoff and safely vent steam via pressure relief valve',
        'Ignore the alert if steam production quota is unmet'
      ],
      correctAnswer: 2,
      explanation: 'Triggering emergency fuel cutoff and venting steam prevents catastrophic pressure vessel explosion. Cold water on hot metal causes thermal shock and catastrophic ruptures.'
    },
    {
      id: 'q2',
      question: 'Which fire extinguisher category is mandatory for extinguishing liquid burner fuel or electrical arc fires around industrial boilers?',
      options: [
        'Water jet (Class A only)',
        'Carbon Dioxide (CO2) or Dry Chemical Powder (Class B/C)',
        'Wet Chemical kitchen foam (Class K)',
        'Combustible metal powder (Class D)'
      ],
      correctAnswer: 1,
      explanation: 'Class B/C (CO2 or dry chemical) suppresses fuel fire and is non-conductive, protecting personnel from high-voltage electrocution.'
    },
    {
      id: 'q3',
      question: 'What is the correct protocol for operating the manual steam blowdown or relief bypass valve wheel?',
      options: [
        'Spin it rapidly with an unauthorized cheater pipe extension',
        'Turn slowly and steadily while standing clear of the direct discharge outlet line',
        'Hammer the valve spindle until it jams open',
        'Close all exhaust vents completely'
      ],
      correctAnswer: 1,
      explanation: 'Always stand clear of the discharge nozzle to prevent severe superheated steam burns and turn smoothly without excessive mechanical torque.'
    },
    {
      id: 'q4',
      question: 'What does the acronym PASS stand for in emergency fire extinguisher operation?',
      options: [
        'Press, Aim, Strike, Stop',
        'Pull pin, Aim at base of fire, Squeeze handle, Sweep side-to-side',
        'Push lever, Alert team, Smother flame, Secure area',
        'Prime, Activate, Spray, Secure'
      ],
      correctAnswer: 1,
      explanation: 'PASS: Pull pin, Aim nozzle at the base of the fire, Squeeze the operating handle, and Sweep side to side.'
    },
    {
      id: 'q5',
      question: 'According to Industrial Safety Regulations (Factories Act & OSHA), how frequently must high-pressure safety valves be hydraulically calibrated and inspected?',
      options: [
        'Once every 10 years',
        'Only after a major rupture occurs',
        'At least annually (every 12 months) by a certified Competent Boiler Inspector',
        'Every day before the morning shift'
      ],
      correctAnswer: 2,
      explanation: 'Statutory boiler regulations mandate annual comprehensive inspection and hydraulic pressure testing certified by authorized boiler inspectors.'
    }
  ];

  insertAssessment.run(
    'asm_boiler_01',
    'mod_boiler_01',
    'Competency Examination: High-Pressure Boiler & Valve Safety Protocols',
    80,
    10,
    JSON.stringify(boilerQuestions)
  );

  // 5. Seed a sample certificate for Pooja Verma to show existing registry
  const sampleCertId = 'c7e849b2-38b4-4b51-9318-7a523b499182';
  const sampleCertNumber = 'CERT-2026-IND-8821';
  const sampleCertData = {
    cert_number: sampleCertNumber,
    user_name: 'Pooja Verma',
    module_title: 'PS-41: High-Voltage Substation & Arc-Flash Safety Drill',
    issue_date: '2026-09-18',
    score: 95
  };
  const sampleHash = computeTamperHash(sampleCertData);

  const insertCert = db.prepare(`
    INSERT INTO certificates (
      id, cert_number, user_id, user_name, module_id, module_title, score,
      issue_date, expiry_date, tamper_hash, qr_code, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertCert.run(
    sampleCertId,
    sampleCertNumber,
    'usr_worker_2',
    'Pooja Verma',
    'mod_electrical_02',
    'PS-41: High-Voltage Substation & Arc-Flash Safety Drill',
    95,
    '2026-09-18',
    '2028-09-18',
    sampleHash,
    `http://localhost:3000/verify/${sampleCertId}`,
    'valid'
  );

  // Log creation in audit log
  const insertAudit = db.prepare(`
    INSERT INTO audit_logs (id, event_type, actor_name, details)
    VALUES (?, ?, ?, ?)
  `);

  insertAudit.run(
    'aud_init_1',
    'SYSTEM_BOOT',
    'SYSTEM',
    'PS-41 Safety Verification & Training Engine initialized with standard industrial curricula.'
  );

  insertAudit.run(
    'aud_cert_1',
    'CERT_ISSUED',
    'System Automated Issuer',
    `Certificate ${sampleCertNumber} issued to Pooja Verma (Score: 95%). SHA-256 integrity hash: ${sampleHash.substring(0, 16)}...`
  );

  console.log('[DB] Seeding completed successfully!');
}

module.exports = {
  db,
  initDatabase,
  computeTamperHash
};

