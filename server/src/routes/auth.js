const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { db } = require('../db/database');
const { signToken, verifyAuth } = require('../middleware/auth');

// Get demo users list for easy one-click testing
router.get('/demo-users', (req, res) => {
  const users = db.prepare(`
    SELECT id, name, email, role, employee_id, department, avatar
    FROM users
  `).all();
  res.json({ users });
});

// Demo login without password hassle
router.post('/demo-login', (req, res) => {
  const { userId, role } = req.body;
  let user;
  if (userId) {
    user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  } else if (role) {
    user = db.prepare('SELECT * FROM users WHERE role = ? LIMIT 1').get(role);
  }

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const token = signToken(user);
  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      employee_id: user.employee_id,
      department: user.department,
      avatar: user.avatar
    }
  });
});

// Standard login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase().trim());
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = signToken(user);
  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      employee_id: user.employee_id,
      department: user.department,
      avatar: user.avatar
    }
  });
});

// Register new user
router.post('/register', (req, res) => {
  const { name, email, password, role = 'worker', department, employee_id } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase().trim());
  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists' });
  }

  const newId = `usr_${uuidv4().substring(0, 8)}`;
  const empId = employee_id || `WRK-${Math.floor(1000 + Math.random() * 9000)}`;
  const dept = department || 'General Plant Safety Operations';
  const avatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`;

  db.prepare(`
    INSERT INTO users (id, name, email, password, role, employee_id, department, avatar)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(newId, name, email.toLowerCase().trim(), password, role, empId, dept, avatar);

  const newUser = db.prepare('SELECT * FROM users WHERE id = ?').get(newId);
  const token = signToken(newUser);

  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      employee_id: newUser.employee_id,
      department: newUser.department,
      avatar: newUser.avatar
    }
  });
});

// Get current logged-in user profile
router.get('/me', verifyAuth, (req, res) => {
  const user = db.prepare(`
    SELECT id, name, email, role, employee_id, department, avatar, created_at
    FROM users WHERE id = ?
  `).get(req.user.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ user });
});

module.exports = router;

