import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { answerOfficerQuestion } from '../services/aiService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/applications.json');

const router = express.Router();

// Helper to read data
function loadApplications() {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

// In-memory working copy initialized from file
let applications = loadApplications();

// Save working copy back to file
function persistApplications() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(applications, null, 2), 'utf-8');
}

/**
 * GET /api/applications/stats
 * Overview dashboard metrics
 */
router.get('/stats', (req, res) => {
  const total = applications.length;
  const pending = applications.filter((a) => a.status === 'PENDING').length;
  const approved = applications.filter((a) => a.status === 'APPROVED').length;
  const rejected = applications.filter((a) => a.status === 'REJECTED').length;
  const returned = applications.filter((a) => a.status === 'RETURNED').length;

  // Urgent: SLA remaining <= 2 days and still pending
  const urgentSla = applications.filter(
    (a) => a.status === 'PENDING' && a.slaDaysRemaining <= 2
  ).length;

  // High risk / flagged
  const highRisk = applications.filter(
    (a) => a.status === 'PENDING' && a.aiAnalysis.riskLevel === 'HIGH'
  ).length;

  // AI pre-cleared for approval
  const aiReadyApproval = applications.filter(
    (a) => a.status === 'PENDING' && a.aiAnalysis.suggestedDecision === 'APPROVE'
  ).length;

  res.json({
    total,
    pending,
    approved,
    rejected,
    returned,
    urgentSla,
    highRisk,
    aiReadyApproval,
  });
});

/**
 * GET /api/applications
 * Query list with filters and smart sorting
 */
router.get('/', (req, res) => {
  const { status, service, risk, search, sortBy } = req.query;

  let results = [...applications];

  // Filter by status
  if (status && status !== 'ALL') {
    results = results.filter((a) => a.status === status);
  }

  // Filter by service
  if (service && service !== 'ALL') {
    results = results.filter((a) => a.serviceType === service);
  }

  // Filter by risk
  if (risk && risk !== 'ALL') {
    results = results.filter((a) => a.aiAnalysis.riskLevel === risk);
  }

  // Search filter
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    results = results.filter(
      (a) =>
        a.applicationNumber.toLowerCase().includes(q) ||
        (a.applicant.nameTe && a.applicant.nameTe.toLowerCase().includes(q)) ||
        (a.applicant.nameEn && a.applicant.nameEn.toLowerCase().includes(q)) ||
        (a.applicant.village && a.applicant.village.toLowerCase().includes(q)) ||
        (a.applicant.aadhaar && a.applicant.aadhaar.toLowerCase().includes(q)) ||
        (a.serviceNameTe && a.serviceNameTe.toLowerCase().includes(q))
    );
  }

  // Sorting
  if (sortBy === 'SLA_URGENT') {
    results.sort((a, b) => a.slaDaysRemaining - b.slaDaysRemaining);
  } else if (sortBy === 'PRIORITY_SCORE') {
    results.sort((a, b) => b.priorityScore - a.priorityScore);
  } else if (sortBy === 'DATE_DESC') {
    results.sort((a, b) => new Date(b.applicationDate) - new Date(a.applicationDate));
  } else {
    // Default smart sort: pending urgent first, then pending others, then processed
    results.sort((a, b) => {
      if (a.status === 'PENDING' && b.status !== 'PENDING') return -1;
      if (a.status !== 'PENDING' && b.status === 'PENDING') return 1;
      return a.slaDaysRemaining - b.slaDaysRemaining;
    });
  }

  res.json(results);
});

/**
 * GET /api/applications/:id
 * Single application details
 */
router.get('/:id', (req, res) => {
  const app = applications.find(
    (a) => a.id === req.params.id || a.applicationNumber === req.params.id
  );
  if (!app) {
    return res.status(404).json({ error: 'Application not found / దరఖాస్తు కనుగొనబడలేదు' });
  }
  res.json(app);
});

/**
 * POST /api/applications/:id/decision
 * Officer takes final action: APPROVE, REJECT, or RETURN
 */
router.post('/:id/decision', (req, res) => {
  const { action, officerName, officerRemarks, citizenNotification } = req.body;
  const app = applications.find((a) => a.id === req.params.id);

  if (!app) {
    return res.status(404).json({ error: 'Application not found' });
  }

  if (!['APPROVE', 'REJECT', 'RETURN'].includes(action)) {
    return res.status(400).json({ error: 'Invalid action. Must be APPROVE, REJECT, or RETURN.' });
  }

  const timestamp = new Date().toISOString();
  const orderNumber = `AP-REV-${app.serviceType.substring(0, 3)}-${Date.now().toString().slice(-6)}`;

  let newStatus = 'PENDING';
  let actionTe = '';
  let actionEn = '';

  if (action === 'APPROVE') {
    newStatus = 'APPROVED';
    actionTe = 'మంజూరు చేయబడింది (ఆమోదం)';
    actionEn = 'Approved';
  } else if (action === 'REJECT') {
    newStatus = 'REJECTED';
    actionTe = 'తిరస్కరించబడింది';
    actionEn = 'Rejected';
  } else if (action === 'RETURN') {
    newStatus = 'RETURNED';
    actionTe = 'పునఃసమీక్షకు పంపబడింది';
    actionEn = 'Returned to Citizen for Rectification';
  }

  app.status = newStatus;
  app.officerDecision = {
    decision: action,
    decisionLabelTe: actionTe,
    decisionLabelEn: actionEn,
    officerName: officerName || 'శ్రీ పి. సురేష్ వర్మ (రెవెన్యూ ఇన్‌స్పెక్టర్ / Revenue Inspector)',
    officerDesignationTe: 'రెవెన్యూ ఇన్‌స్పెక్టర్ (భీమునిపట్నం మండలం)',
    officerDesignationEn: 'Revenue Inspector (Bheemili Mandal)',
    decisionDate: timestamp,
    officerRemarks: officerRemarks || '',
    orderNumber: orderNumber,
    citizenNotificationSent: citizenNotification || app.aiAnalysis?.suggestedCitizenRemarkTe || '',
    digitalSignatureHash: `DSC-SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
  };

  // Add to history
  if (!app.history) app.history = [];
  app.history.push({
    action: newStatus,
    timestamp,
    by: officerName || 'Revenue Inspector',
    remarks: officerRemarks,
  });

  persistApplications();

  res.json({
    success: true,
    messageTe: `దరఖాస్తు సంఖ్య ${app.applicationNumber} విజయవంతంగా ${actionTe}.`,
    messageEn: `Application ${app.applicationNumber} successfully ${actionEn}.`,
    application: app,
  });
});

/**
 * POST /api/applications/:id/ask-ai
 * Officer interactive assistant Q&A
 */
router.post('/:id/ask-ai', (req, res) => {
  const { query } = req.body;
  const app = applications.find((a) => a.id === req.params.id);

  if (!app) {
    return res.status(404).json({ error: 'Application not found' });
  }

  const answer = answerOfficerQuestion(app, query);
  res.json({
    query,
    ...answer,
  });
});

/**
 * POST /api/applications/:id/reset
 * Revert single application to PENDING
 */
router.post('/:id/reset', (req, res) => {
  const app = applications.find((a) => a.id === req.params.id);
  if (!app) {
    return res.status(404).json({ error: 'Application not found' });
  }
  app.status = 'PENDING';
  app.officerDecision = null;
  persistApplications();
  res.json({ success: true, application: app });
});

/**
 * POST /api/reset-all
 * Reset all applications to fresh sample state
 */
router.post('/reset-all', (req, res) => {
  applications.forEach((a) => {
    a.status = 'PENDING';
    a.officerDecision = null;
  });
  persistApplications();
  res.json({ success: true, message: 'All applications reset to PENDING state.' });
});

export default router;
