const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { initDatabase } = require('./db/database');

// Initialize database tables and seed sample data
initDatabase();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/modules', require('./routes/modules'));
app.use('/api/simulations', require('./routes/simulations'));
app.use('/api/assessments', require('./routes/assessments'));
app.use('/api/certificates', require('./routes/certificates'));
app.use('/api/verify', require('./routes/verify'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/users', require('./routes/users'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'PS-41 Worker Training, AR Simulation & QR Verification Platform',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend build if dist exists
const clientDistPath = path.join(__dirname, '..', '..', 'client', 'dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));

  // SPA fallback for frontend client-side routing (compatible with Express 5)
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(clientDistPath, 'index.html'));
    }
    next();
  });
}

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 PS-41 Safety Engine Server running on port ${PORT}`);
  console.log(`🌐 Full Application URL: http://localhost:${PORT}`);
  console.log(`📡 API Base: http://localhost:${PORT}/api`);
  console.log(`🔍 QR Verify Endpoint: http://localhost:${PORT}/verify/:certId`);
  console.log(`=======================================================`);
});

