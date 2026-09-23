const assert = require('assert');

const BASE_URL = process.env.TEST_URL || 'http://localhost:5000';

async function runTests() {
  console.log(`\n======================================================`);
  console.log(`🧪 Running PS-41 Automated Verification Suite...`);
  console.log(`📡 Testing against: ${BASE_URL}`);
  console.log(`======================================================\n`);

  let passedTests = 0;
  let totalTests = 0;

  async function test(name, fn) {
    totalTests++;
    try {
      await fn();
      console.log(`  ✅ [PASS] ${name}`);
      passedTests++;
    } catch (err) {
      console.error(`  ❌ [FAIL] ${name}`);
      console.error(`     Error: ${err.message}`);
    }
  }

  // 1. Health check
  await test('GET /api/health returns online status', async () => {
    const res = await fetch(`${BASE_URL}/api/health`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'online');
  });

  // 2. Demo users endpoint
  let workerUser = null;
  await test('GET /api/auth/demo-users returns seeded roles', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/demo-users`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data.users));
    assert.ok(data.users.length >= 3);
    workerUser = data.users.find(u => u.role === 'worker');
    assert.ok(workerUser, 'Worker user should exist');
  });

  // 3. Demo login
  let workerToken = null;
  await test('POST /api/auth/demo-login authenticates and returns JWT token', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/demo-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'usr_worker_1' })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(data.token, 'Token should be present');
    assert.strictEqual(data.user.role, 'worker');
    workerToken = data.token;
  });

  // 4. Fetch Modules
  await test('GET /api/modules returns safety curricula', async () => {
    const res = await fetch(`${BASE_URL}/api/modules`, {
      headers: { Authorization: `Bearer ${workerToken}` }
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data.modules));
    assert.ok(data.modules.length >= 3);
    const boilerMod = data.modules.find(m => m.id === 'mod_boiler_01');
    assert.ok(boilerMod, 'PS-41 Boiler module should exist');
  });

  // 5. 3D Simulation submission
  await test('POST /api/simulations/submit records 100% safety checklist score', async () => {
    const res = await fetch(`${BASE_URL}/api/simulations/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${workerToken}`
      },
      body: JSON.stringify({
        moduleId: 'mod_boiler_01',
        completedSteps: {
          ppe: true,
          inspect_gauge: true,
          relief_valve: true,
          emergency_switch: true,
          extinguisher: true
        },
        score: 100,
        timeSpentSecs: 75
      })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.passed, true);
    assert.strictEqual(data.score, 100);
  });

  // 6. Assessment submission and instant certificate issuance
  let issuedCert = null;
  await test('POST /api/assessments/submit grades 100% and auto-issues certificate with QR code', async () => {
    // Correct answers for mod_boiler_01: q1: 2, q2: 1, q3: 1, q4: 1, q5: 2
    const answers = {
      q1: 2,
      q2: 1,
      q3: 1,
      q4: 1,
      q5: 2
    };

    const res = await fetch(`${BASE_URL}/api/assessments/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${workerToken}`
      },
      body: JSON.stringify({
        moduleId: 'mod_boiler_01',
        answers
      })
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.passed, true);
    assert.strictEqual(data.percentage, 100);
    assert.ok(data.certificate, 'Certificate must be issued on 100% score');
    assert.ok(data.certificate.qr_code, 'Certificate must include scannable QR data URL');
    assert.ok(data.certificate.tamper_hash, 'Certificate must have SHA-256 seal');
    issuedCert = data.certificate;
  });

  // 7. Public QR Verification Endpoint
  await test('GET /api/verify/:certId cryptographically validates the newly issued certificate', async () => {
    assert.ok(issuedCert, 'Previous test must have issued a certificate');
    const res = await fetch(`${BASE_URL}/api/verify/${issuedCert.id}`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.verified, true);
    assert.strictEqual(data.isAuthentic, true);
    assert.strictEqual(data.status, 'valid');
    assert.strictEqual(data.certificate.traineeName, 'Rajesh Kumar');
    assert.strictEqual(data.certificate.score, 100);
    assert.ok(data.certificate.tamperHash);
  });

  // 8. Admin Telemetry & Analytics
  await test('GET /api/analytics/summary returns updated system KPIs', async () => {
    const adminLoginRes = await fetch(`${BASE_URL}/api/auth/demo-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'usr_admin_1' })
    });
    const adminData = await adminLoginRes.json();

    const res = await fetch(`${BASE_URL}/api/analytics/summary`, {
      headers: { Authorization: `Bearer ${adminData.token}` }
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(data.kpis.totalCerts >= 2, 'Total certs should include newly earned certificate');
    assert.ok(data.auditLogs.length > 0);
  });

  console.log(`\n======================================================`);
  console.log(`📊 Test Summary: ${passedTests} / ${totalTests} Passed`);
  console.log(`======================================================\n`);

  if (passedTests === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test execution fatal error:', err);
  process.exit(1);
});

