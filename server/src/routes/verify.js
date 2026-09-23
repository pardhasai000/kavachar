const express = require('express');
const router = express.Router();
const { db, computeTamperHash } = require('../db/database');

// Public Verification Endpoint
// Accessible without login when scanning QR code or visiting /verify/:id
router.get('/:certId', (req, res) => {
  const { certId } = req.params;

  const cert = db.prepare(`
    SELECT c.*, u.employee_id, u.department
    FROM certificates c
    JOIN users u ON c.user_id = u.id
    WHERE c.id = ? OR c.cert_number = ?
  `).get(certId, certId);

  if (!cert) {
    return res.status(404).json({
      verified: false,
      error: 'Certificate record not found in National Safety Registry.',
      message: 'The requested Certificate ID does not correspond to any valid credential issued by PS-41.'
    });
  }

  // Cryptographic integrity validation
  const checkPayload = {
    cert_number: cert.cert_number,
    user_name: cert.user_name,
    module_title: cert.module_title,
    issue_date: cert.issue_date,
    score: cert.score
  };

  const recomputedHash = computeTamperHash(checkPayload);
  const isHashAuthentic = recomputedHash === cert.tamper_hash;
  const isRevoked = cert.status === 'revoked';

  // Fetch training module metadata
  const mod = db.prepare('SELECT category, duration, difficulty FROM modules WHERE id = ?').get(cert.module_id);

  // Return full verification dossier
  res.json({
    verified: isHashAuthentic && !isRevoked,
    isAuthentic: isHashAuthentic,
    isRevoked,
    status: cert.status,
    certificate: {
      id: cert.id,
      certNumber: cert.cert_number,
      traineeName: cert.user_name,
      employeeId: cert.employee_id,
      department: cert.department,
      moduleTitle: cert.module_title,
      category: mod ? mod.category : 'Industrial Safety',
      score: cert.score,
      issueDate: cert.issue_date,
      expiryDate: cert.expiry_date,
      tamperHash: cert.tamper_hash,
      authority: 'National Industrial Safety & Vocational Directorate (PS-41)',
      standard: 'ISO 45001:2018 & Factories Act Safety Compliant'
    },
    verificationTimestamp: new Date().toISOString()
  });
});

module.exports = router;

