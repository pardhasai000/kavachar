const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { db } = require('../db/database');
const { verifyAuth, requireRole } = require('../middleware/auth');

// Optional auth helper to check if a user is logged in
function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const jwt = require('jsonwebtoken');
    const { JWT_SECRET } = require('../middleware/auth');
    try {
      req.user = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    } catch (e) {}
  }
  next();
}

// Get all modules
router.get('/', optionalAuth, (req, res) => {
  const modules = db.prepare('SELECT * FROM modules ORDER BY created_at ASC').all();

  // If user is authenticated, attach their progress
  if (req.user) {
    const userId = req.user.id;
    const enriched = modules.map(mod => {
      const simRecord = db.prepare(`
        SELECT score, passed FROM simulation_records
        WHERE user_id = ? AND module_id = ? ORDER BY completed_at DESC LIMIT 1
      `).get(userId, mod.id);

      const examRecord = db.prepare(`
        SELECT score, percentage, passed FROM assessment_submissions
        WHERE user_id = ? AND module_id = ? ORDER BY submitted_at DESC LIMIT 1
      `).get(userId, mod.id);

      const certRecord = db.prepare(`
        SELECT id, cert_number, status FROM certificates
        WHERE user_id = ? AND module_id = ? LIMIT 1
      `).get(userId, mod.id);

      return {
        ...mod,
        userProgress: {
          simulationPassed: simRecord ? Boolean(simRecord.passed) : false,
          simulationScore: simRecord ? simRecord.score : null,
          assessmentPassed: examRecord ? Boolean(examRecord.passed) : false,
          assessmentScore: examRecord ? examRecord.percentage : null,
          certificateIssued: Boolean(certRecord),
          certificateId: certRecord ? certRecord.id : null,
          certificateNumber: certRecord ? certRecord.cert_number : null
        }
      };
    });
    return res.json({ modules: enriched });
  }

  res.json({ modules });
});

// Get single module details
router.get('/:id', optionalAuth, (req, res) => {
  const mod = db.prepare('SELECT * FROM modules WHERE id = ?').get(req.params.id);
  if (!mod) {
    return res.status(404).json({ error: 'Module not found' });
  }

  const simulation = db.prepare('SELECT * FROM simulations WHERE module_id = ?').get(mod.id);
  const assessment = db.prepare('SELECT id, module_id, title, passing_percentage, time_limit_mins FROM assessments WHERE module_id = ?').get(mod.id);

  let userProgress = null;
  if (req.user) {
    const simRecord = db.prepare(`
      SELECT * FROM simulation_records WHERE user_id = ? AND module_id = ? ORDER BY completed_at DESC LIMIT 1
    `).get(req.user.id, mod.id);

    const examRecord = db.prepare(`
      SELECT * FROM assessment_submissions WHERE user_id = ? AND module_id = ? ORDER BY submitted_at DESC LIMIT 1
    `).get(req.user.id, mod.id);

    const cert = db.prepare(`
      SELECT * FROM certificates WHERE user_id = ? AND module_id = ? LIMIT 1
    `).get(req.user.id, mod.id);

    userProgress = {
      simRecord,
      examRecord,
      certificate: cert
    };
  }

  res.json({
    module: mod,
    simulation: simulation ? {
      ...simulation,
      steps: JSON.parse(simulation.steps)
    } : null,
    hasAssessment: Boolean(assessment),
    assessmentMeta: assessment,
    userProgress
  });
});

// Admin: Create module
router.post('/', verifyAuth, requireRole('admin'), (req, res) => {
  const { title, category, description, duration, difficulty, sop_content, icon } = req.body;
  if (!title || !category || !description) {
    return res.status(400).json({ error: 'Title, category, and description are required' });
  }

  const id = `mod_${uuidv4().substring(0, 8)}`;
  db.prepare(`
    INSERT INTO modules (id, title, category, description, duration, difficulty, sop_content, icon)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    title,
    category,
    description,
    duration || '30 Mins',
    difficulty || 'Intermediate',
    sop_content || 'Standard safety operating procedure content.',
    icon || 'ShieldCheck'
  );

  // Auto-create default simulation and assessment scaffolding for the new module
  const simSteps = [
    { id: 's1', label: 'Verify Equipment Isolation', instruction: 'Inspect lockouts and isolation switches.', completed: false },
    { id: 's2', label: 'Check Safety Relief System', instruction: 'Ensure pressure bypass is free of obstructions.', completed: false },
    { id: 's3', label: 'Run Diagnostic Sequence', instruction: 'Confirm normal sensor status on telemetry board.', completed: false }
  ];

  db.prepare(`
    INSERT INTO simulations (id, module_id, title, description, scene_type, steps, passing_score)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    `sim_${uuidv4().substring(0, 8)}`,
    id,
    `${title} - 3D Safety Walkthrough`,
    'Interactive 3D drill covering key hazards and checklist verifications.',
    'boiler_plant',
    JSON.stringify(simSteps),
    80
  );

  const defaultQuestions = [
    {
      id: 'q1',
      question: `What is the primary safety regulation governing ${title}?`,
      options: ['OSHA / Factories Act Safety Standards', 'Local Municipal Traffic Code', 'Consumer Protection Guidelines', 'Maritime Cargo Law'],
      correctAnswer: 0,
      explanation: 'Industrial safety operations fall directly under statutory OSHA and national Factories Act protocols.'
    },
    {
      id: 'q2',
      question: 'Before commencing high-risk operations, what step is strictly mandatory?',
      options: ['Complete visual and PPE safety checklist inspection', 'Proceed immediately without inspection', 'Disable warning alarms', 'Increase steam pressure to limit'],
      correctAnswer: 0,
      explanation: 'Verifying personal protective gear and scanning hazards is the mandatory precursor to operating equipment.'
    }
  ];

  db.prepare(`
    INSERT INTO assessments (id, module_id, title, passing_percentage, time_limit_mins, questions)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    `asm_${uuidv4().substring(0, 8)}`,
    id,
    `Certification Exam: ${title}`,
    75,
    10,
    JSON.stringify(defaultQuestions)
  );

  res.status(201).json({ success: true, moduleId: id });
});

// Admin: Delete module
router.delete('/:id', verifyAuth, requireRole('admin'), (req, res) => {
  db.prepare('DELETE FROM modules WHERE id = ?').run(req.params.id);
  res.json({ success: true, message: 'Module deleted' });
});

module.exports = router;

