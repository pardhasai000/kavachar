const express = require('express');
const router = express.Router();
const { db } = require('../db/database');
const { verifyAuth, requireRole } = require('../middleware/auth');

// Admin: Get all users with their training statistics
router.get('/', verifyAuth, requireRole('admin'), (req, res) => {
  const users = db.prepare(`
    SELECT id, name, email, role, employee_id, department, avatar, created_at
    FROM users
    ORDER BY role ASC, created_at DESC
  `).all();

  const enrichedUsers = users.map(u => {
    const certCount = db.prepare('SELECT COUNT(*) as count FROM certificates WHERE user_id = ?').get(u.id).count;
    const simCount = db.prepare('SELECT COUNT(*) as count FROM simulation_records WHERE user_id = ?').get(u.id).count;
    const examCount = db.prepare('SELECT COUNT(*) as count FROM assessment_submissions WHERE user_id = ?').get(u.id).count;
    return {
      ...u,
      certCount,
      simCount,
      examCount
    };
  });

  res.json({ users: enrichedUsers });
});

module.exports = router;

