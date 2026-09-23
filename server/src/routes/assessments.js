const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');
const { db, computeTamperHash } = require('../db/database');
const { verifyAuth } = require('../middleware/auth');

// Get assessment questions for a module
router.get('/:moduleId', verifyAuth, (req, res) => {
  const assessment = db.prepare('SELECT * FROM assessments WHERE module_id = ?').get(req.params.moduleId);
  if (!assessment) {
    return res.status(404).json({ error: 'Assessment not found for this module' });
  }

  const rawQuestions = JSON.parse(assessment.questions);
  // Strip out correct answers for test integrity
  const sanitizedQuestions = rawQuestions.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options
  }));

  res.json({
    assessment: {
      id: assessment.id,
      module_id: assessment.module_id,
      title: assessment.title,
      passing_percentage: assessment.passing_percentage,
      time_limit_mins: assessment.time_limit_mins,
      questions: sanitizedQuestions
    }
  });
});

// Submit assessment answers
router.post('/submit', verifyAuth, async (req, res) => {
  const { moduleId, answers } = req.body;
  const userId = req.user.id;

  if (!moduleId || !answers) {
    return res.status(400).json({ error: 'moduleId and answers object are required' });
  }

  const assessment = db.prepare('SELECT * FROM assessments WHERE module_id = ?').get(moduleId);
  if (!assessment) {
    return res.status(404).json({ error: 'Assessment not found' });
  }

  const mod = db.prepare('SELECT * FROM modules WHERE id = ?').get(moduleId);
  const rawQuestions = JSON.parse(assessment.questions);
  let correctCount = 0;
  const review = [];

  rawQuestions.forEach(q => {
    const selectedAnswerIndex = answers[q.id];
    const isCorrect = selectedAnswerIndex === q.correctAnswer;
    if (isCorrect) correctCount++;

    review.push({
      id: q.id,
      question: q.question,
      options: q.options,
      selectedAnswer: selectedAnswerIndex !== undefined ? selectedAnswerIndex : null,
      correctAnswer: q.correctAnswer,
      isCorrect,
      explanation: q.explanation
    });
  });

  const totalQuestions = rawQuestions.length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const passed = percentage >= assessment.passing_percentage ? 1 : 0;

  const submissionId = `sub_${uuidv4().substring(0, 8)}`;
  db.prepare(`
    INSERT INTO assessment_submissions (
      id, user_id, module_id, assessment_id, score, total_questions, percentage, passed, answers
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    submissionId,
    userId,
    moduleId,
    assessment.id,
    correctCount,
    totalQuestions,
    percentage,
    passed,
    JSON.stringify(answers)
  );

  let certificate = null;

  // Auto-generate certificate if passed!
  if (passed) {
    // Check if certificate already exists
    const existingCert = db.prepare('SELECT * FROM certificates WHERE user_id = ? AND module_id = ?').get(userId, moduleId);

    if (existingCert) {
      certificate = existingCert;
    } else {
      const certId = uuidv4();
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const certNumber = `CERT-2026-IND-${randomSuffix}`;
      const now = new Date();
      const issueDate = now.toISOString().split('T')[0];
      const expiry = new Date(now.setFullYear(now.getFullYear() + 2));
      const expiryDate = expiry.toISOString().split('T')[0];

      const certPayload = {
        cert_number: certNumber,
        user_name: req.user.name,
        module_title: mod.title,
        issue_date: issueDate,
        score: percentage
      };

      const tamperHash = computeTamperHash(certPayload);

      // In production/local, verification URL points to client route /verify/:certId
      const verificationUrl = `http://localhost:3000/verify/${certId}`;
      const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
        errorCorrectionLevel: 'H',
        margin: 2,
        width: 300,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      });

      db.prepare(`
        INSERT INTO certificates (
          id, cert_number, user_id, user_name, module_id, module_title, score,
          issue_date, expiry_date, tamper_hash, qr_code, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        certId,
        certNumber,
        userId,
        req.user.name,
        moduleId,
        mod.title,
        percentage,
        issueDate,
        expiryDate,
        tamperHash,
        qrCodeDataUrl,
        'valid'
      );

      certificate = db.prepare('SELECT * FROM certificates WHERE id = ?').get(certId);

      // Audit log entry
      db.prepare(`
        INSERT INTO audit_logs (id, event_type, actor_name, details)
        VALUES (?, ?, ?, ?)
      `).run(
        `aud_${uuidv4().substring(0, 8)}`,
        'CERT_ISSUED',
        req.user.name,
        `Official National Safety Credential ${certNumber} issued to ${req.user.name} for ${mod.title} with exam score ${percentage}%. Integrity hash: ${tamperHash.substring(0, 16)}...`
      );
    }
  }

  res.json({
    success: true,
    submissionId,
    passed: Boolean(passed),
    percentage,
    correctCount,
    totalQuestions,
    passingPercentage: assessment.passing_percentage,
    review,
    certificate
  });
});

module.exports = router;

