const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { db } = require('../db/database');
const { verifyAuth } = require('../middleware/auth');

// Get simulation details by module ID
router.get('/:moduleId', (req, res) => {
  const sim = db.prepare('SELECT * FROM simulations WHERE module_id = ?').get(req.params.moduleId);
  if (!sim) {
    return res.status(404).json({ error: 'Simulation not found for this module' });
  }

  res.json({
    simulation: {
      ...sim,
      steps: JSON.parse(sim.steps)
    }
  });
});

// Submit completed simulation run
router.post('/submit', verifyAuth, (req, res) => {
  const { moduleId, completedSteps, score, timeSpentSecs } = req.body;
  const userId = req.user.id;

  if (!moduleId || completedSteps === undefined || score === undefined) {
    return res.status(400).json({ error: 'moduleId, completedSteps, and score are required' });
  }

  const sim = db.prepare('SELECT * FROM simulations WHERE module_id = ?').get(moduleId);
  if (!sim) {
    return res.status(404).json({ error: 'Simulation not found' });
  }

  const passed = score >= sim.passing_score ? 1 : 0;
  const recordId = `simrec_${uuidv4().substring(0, 8)}`;

  db.prepare(`
    INSERT INTO simulation_records (id, user_id, module_id, score, completed_steps, passed, time_spent_secs)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    recordId,
    userId,
    moduleId,
    score,
    JSON.stringify(completedSteps),
    passed,
    timeSpentSecs || 60
  );

  // Audit log
  db.prepare(`
    INSERT INTO audit_logs (id, event_type, actor_name, details)
    VALUES (?, ?, ?, ?)
  `).run(
    `aud_${uuidv4().substring(0, 8)}`,
    'SIMULATION_RUN',
    req.user.name,
    `Completed 3D/AR simulation for ${moduleId} with score ${score}% (${passed ? 'PASSED' : 'NEEDS RETRY'}).`
  );

  res.json({
    success: true,
    recordId,
    passed: Boolean(passed),
    score,
    passingScore: sim.passing_score,
    message: passed
      ? 'Outstanding! You have successfully mastered the 3D/AR safety drill and are now eligible for the Assessment Examination.'
      : 'Simulation score below passing threshold. Please review the checklist and retry.'
  });
});

module.exports = router;

