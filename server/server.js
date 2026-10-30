import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import applicationRoutes from './routes/applicationRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/applications', applicationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'అధికారి మిత్ర (Adhikari Mitra) - Revenue Officer Co-Pilot',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Serve frontend production build if available
const clientDist = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  // Fallback for SPA routing
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(clientDist, 'index.html'));
    }
    next();
  });
}

app.listen(PORT, () => {
  console.log(`🏛️ Adhikari Mitra Server running on http://localhost:${PORT}`);
  console.log(`📋 API available at http://localhost:${PORT}/api/applications`);
});
