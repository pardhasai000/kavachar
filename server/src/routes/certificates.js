const express = require('express');
const router = express.Router();
const { db } = require('../db/database');
const { verifyAuth, requireRole } = require('../middleware/auth');

// Get all certificates earned by logged-in worker
router.get('/my', verifyAuth, (req, res) => {
  const certs = db.prepare(`
    SELECT * FROM certificates
    WHERE user_id = ?
    ORDER BY created_at DESC
  `).all(req.user.id);

  res.json({ certificates: certs });
});

// Admin: Get all issued certificates across platform
router.get('/all', verifyAuth, requireRole('admin', 'verifier'), (req, res) => {
  const certs = db.prepare(`
    SELECT c.*, u.email as user_email, u.employee_id, u.department
    FROM certificates c
    JOIN users u ON c.user_id = u.id
    ORDER BY c.created_at DESC
  `).all();

  res.json({ certificates: certs });
});

// Get specific certificate by ID
router.get('/:id', (req, res) => {
  const cert = db.prepare(`
    SELECT c.*, u.email as user_email, u.employee_id, u.department
    FROM certificates c
    JOIN users u ON c.user_id = u.id
    WHERE c.id = ? OR c.cert_number = ?
  `).get(req.params.id, req.params.id);

  if (!cert) {
    return res.status(404).json({ error: 'Certificate not found' });
  }

  res.json({ certificate: cert });
});

// Admin: Revoke certificate
router.post('/:id/revoke', verifyAuth, requireRole('admin'), (req, res) => {
  const cert = db.prepare('SELECT * FROM certificates WHERE id = ?').get(req.params.id);
  if (!cert) {
    return res.status(404).json({ error: 'Certificate not found' });
  }

  db.prepare("UPDATE certificates SET status = 'revoked' WHERE id = ?").run(req.params.id);

  // Log in audit table
  db.prepare(`
    INSERT INTO audit_logs (id, event_type, actor_name, details)
    VALUES (?, ?, ?, ?)
  `).run(
    `aud_${Date.now()}`,
    'CERT_REVOKED',
    req.user.name,
    `Admin revoked certificate ${cert.cert_number} for trainee ${cert.user_name}. Reason: Compliance suspension.`
  );

  res.json({ success: true, message: 'Certificate has been revoked', status: 'revoked' });
});

// Admin: Reinstate / Reissue certificate
router.post('/:id/reinstate', verifyAuth, requireRole('admin'), (req, res) => {
  const cert = db.prepare('SELECT * FROM certificates WHERE id = ?').get(req.params.id);
  if (!cert) {
    return res.status(404).json({ error: 'Certificate not found' });
  }

  db.prepare("UPDATE certificates SET status = 'valid' WHERE id = ?").run(req.params.id);

  db.prepare(`
    INSERT INTO audit_logs (id, event_type, actor_name, details)
    VALUES (?, ?, ?, ?)
  `).run(
    `aud_${Date.now()}`,
    'CERT_REINSTATED',
    req.user.name,
    `Admin reinstated certificate ${cert.cert_number} for trainee ${cert.user_name}.`
  );

  res.json({ success: true, message: 'Certificate reinstated successfully', status: 'valid' });
});

module.exports = router;

