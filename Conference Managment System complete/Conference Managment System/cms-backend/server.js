// server.js
// Override DNS to use Google DNS — fixes ISP blocking of MongoDB Atlas SRV queries
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────
app.use(cors());
app.use(bodyParser.json());

// ─── MongoDB Connection ───────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    seedDatabase();
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('⚠️  Server will continue without DB - check Atlas Network Access (IP Whitelist)');
  });

// ─── Mongoose Schemas ─────────────────────────────────────────

const paperSchema = new mongoose.Schema({
  paperId: { type: String, unique: true },
  title: { type: String, required: true },
  authors: { type: String, required: true },
  track: { type: String, default: 'General' },
  status: { type: String, default: 'pending' },
  score: { type: Number, default: null },
  abstract: { type: String, default: '' },
  keywords: [String],
  submittedDate: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

const reviewSchema = new mongoose.Schema({
  paperId: { type: String },
  paperTitle: { type: String },
  stage: { type: String, default: 'Under Review' },
  reviewer: { type: String },
  date: { type: String },
  score: { type: Number, default: null },
  feedback: { type: String, default: '' },
  criteria: {
    originality: { type: Number, default: 0 },
    relevance: { type: Number, default: 0 },
    methodology: { type: Number, default: 0 },
    clarity: { type: Number, default: 0 }
  }
}, { timestamps: true });

const scheduleSchema = new mongoose.Schema({
  eventId: { type: String, unique: true },
  day: { type: Number },
  time: { type: String },
  endTime: { type: String },
  title: { type: String, required: true },
  speaker: { type: String },
  location: { type: String },
  type: { type: String },
  track: { type: String },
  description: { type: String }
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  name: { type: String, required: true },
  email: { type: String },
  organization: { type: String, default: '' },
  role: { type: String, default: 'Student' },
  ticketType: { type: String, default: 'Student' },
  payment: { type: String, default: 'Pending' },
  status: { type: String, default: 'Pending' },
  registeredDate: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

const Paper = mongoose.model('Paper', paperSchema);
const Review = mongoose.model('Review', reviewSchema);
const Schedule = mongoose.model('Schedule', scheduleSchema);
const User = mongoose.model('User', userSchema);

// ─── Seed Data ────────────────────────────────────────────────
async function seedDatabase() {
  try {
    const paperCount = await Paper.countDocuments();
    if (paperCount === 0) {
      await Paper.insertMany([
        { paperId: 'CMS-2026-001', title: 'Deep Learning Approaches for Real-Time Object Detection in Autonomous Vehicles', authors: 'Vengadesan K., Priya S., Ramesh T.', track: 'AI & Machine Learning', status: 'Accepted', score: 8.5, abstract: 'This paper presents a novel deep learning architecture combining attention mechanisms with lightweight CNNs for real-time object detection in autonomous driving scenarios.', keywords: ['Deep Learning', 'Object Detection', 'Autonomous Vehicles', 'CNN'], submittedDate: '2025-12-10' },
        { paperId: 'CMS-2026-002', title: 'Quantum-Resistant Cryptographic Protocols for IoT Edge Computing', authors: 'Vengadesan K., Kumar R.', track: 'Quantum Computing', status: 'Under Review', score: null, abstract: 'As quantum computing advances threaten current cryptographic standards, this paper proposes lattice-based cryptographic protocols for IoT edge devices.', keywords: ['Quantum Computing', 'Cryptography', 'IoT'], submittedDate: '2025-12-22' },
        { paperId: 'CMS-2026-003', title: 'Federated Learning with Differential Privacy for Healthcare Data Analytics', authors: 'Priya S., Vengadesan K., Dr. Anitha M.', track: 'AI & Machine Learning', status: 'Revision Needed', score: 6.8, abstract: 'A privacy-preserving federated learning framework for collaborative healthcare analytics across multiple hospital networks.', keywords: ['Federated Learning', 'Differential Privacy', 'Healthcare'], submittedDate: '2026-01-05' },
        { paperId: 'CMS-2026-004', title: 'Blockchain-Based Decentralized Identity Management for Smart Cities', authors: 'Kumar R., Vengadesan K.', track: 'Blockchain & Security', status: 'Accepted', score: 9.1, abstract: 'A decentralized identity management system leveraging Ethereum smart contracts and zero-knowledge proofs for smart city applications.', keywords: ['Blockchain', 'Identity Management', 'Smart Cities'], submittedDate: '2025-11-28' },
        { paperId: 'CMS-2026-005', title: 'Energy-Efficient Edge AI: Neural Architecture Search for TinyML Applications', authors: 'Vengadesan K., Nisha P., Thomas J.', track: 'IoT & Embedded Systems', status: 'Submitted', score: null, abstract: 'A hardware-aware neural architecture search framework for deploying AI models on microcontrollers with less than 256KB of SRAM.', keywords: ['TinyML', 'Neural Architecture Search', 'Edge AI'], submittedDate: '2026-01-15' }
      ]);
      console.log('📄 Papers seeded');
    }

    const reviewCount = await Review.countDocuments();
    if (reviewCount === 0) {
      await Review.insertMany([
        { paperId: 'CMS-2026-001', paperTitle: 'Deep Learning Approaches for Real-Time Object Detection in Autonomous Vehicles', stage: 'Decision Made', reviewer: 'Dr. Sarah Johnson (MIT)', date: '2026-02-01', score: 8.5, feedback: 'Excellent paper with strong experimental results. The multi-scale feature aggregation module is a significant contribution.', criteria: { originality: 9, relevance: 8, methodology: 9, clarity: 8 } },
        { paperId: 'CMS-2026-002', paperTitle: 'Quantum-Resistant Cryptographic Protocols for IoT Edge Computing', stage: 'Under Review', reviewer: 'Prof. Michael Chen (Stanford)', date: '2026-02-10', score: null, feedback: 'Review in progress. Initial assessment indicates strong theoretical foundations.', criteria: { originality: 0, relevance: 0, methodology: 0, clarity: 0 } },
        { paperId: 'CMS-2026-003', paperTitle: 'Federated Learning with Differential Privacy for Healthcare Data Analytics', stage: 'Decision Made', reviewer: 'Dr. Emily Watson (Oxford)', date: '2026-01-28', score: 6.8, feedback: 'The paper addresses an important problem. Privacy budget analysis needs more justification for medical applications.', criteria: { originality: 7, relevance: 8, methodology: 6, clarity: 6 } },
        { paperId: 'CMS-2026-004', paperTitle: 'Blockchain-Based Decentralized Identity Management for Smart Cities', stage: 'Decision Made', reviewer: 'Prof. David Kim (ETH Zurich)', date: '2026-02-05', score: 9.1, feedback: 'Outstanding research with excellent practical implications. The integration of zero-knowledge proofs with smart contracts is elegant.', criteria: { originality: 9, relevance: 10, methodology: 9, clarity: 9 } },
        { paperId: 'CMS-2026-005', paperTitle: 'Energy-Efficient Edge AI: Neural Architecture Search for TinyML Applications', stage: 'Reviewer Assigned', reviewer: 'Dr. Ana Martinez (Google Research)', date: '2026-02-15', score: null, feedback: 'Reviewer assigned. Expected review completion by March 1, 2026.', criteria: { originality: 0, relevance: 0, methodology: 0, clarity: 0 } }
      ]);
      console.log('📝 Reviews seeded');
    }

    const scheduleCount = await Schedule.countDocuments();
    if (scheduleCount === 0) {
      await Schedule.insertMany([
        { eventId: 'd1-1', day: 1, time: '08:00', endTime: '09:00', title: 'Registration & Welcome Breakfast', location: 'Grand Lobby', type: 'social', description: 'Collect your badge and enjoy a continental breakfast.' },
        { eventId: 'd1-2', day: 1, time: '09:00', endTime: '09:30', title: 'Opening Ceremony & Inaugural Address', speaker: 'Prof. R. Krishnamurthy, Conference Chair', location: 'Main Auditorium (Hall A)', type: 'keynote', description: 'Welcome address by the Conference Chair.' },
        { eventId: 'd1-3', day: 1, time: '09:30', endTime: '10:45', title: 'Keynote: The Future of Artificial General Intelligence', speaker: 'Dr. Yann LeCun, Chief AI Scientist, Meta', location: 'Main Auditorium (Hall A)', type: 'keynote', description: 'Exploration of the path toward AGI.' },
        { eventId: 'd1-4', day: 1, time: '10:45', endTime: '11:15', title: 'Coffee Break & Networking', location: 'Foyer A & B', type: 'break', description: 'Refreshments served.' },
        { eventId: 'd1-5', day: 1, time: '11:15', endTime: '12:45', title: 'Paper Session: Advanced Deep Learning Architectures', speaker: 'Session Chair: Dr. Anitha M.', location: 'Hall B - Room 201', type: 'paper', track: 'AI & Machine Learning', description: 'Four paper presentations on deep learning.' },
        { eventId: 'd1-6', day: 1, time: '12:45', endTime: '14:00', title: 'Lunch Break', location: 'Banquet Hall, Level 2', type: 'break', description: 'Buffet lunch with various dietary options.' },
        { eventId: 'd1-7', day: 1, time: '14:00', endTime: '15:30', title: 'Workshop: Hands-On Quantum Computing with Qiskit', speaker: 'Dr. James Wright, IBM Quantum', location: 'Computer Lab - Room 102', type: 'workshop', track: 'Quantum Computing', description: 'Practical quantum computing workshop using IBM Qiskit.' },
        { eventId: 'd1-8', day: 1, time: '19:00', endTime: '21:00', title: 'Welcome Dinner & Cultural Program', location: 'Rooftop Garden, Hotel Grand', type: 'social', description: 'Formal welcome dinner with cultural performances.' },
        { eventId: 'd2-1', day: 2, time: '09:00', endTime: '10:15', title: 'Keynote: Quantum Supremacy and Beyond', speaker: 'Prof. John Preskill, Caltech', location: 'Main Auditorium (Hall A)', type: 'keynote', description: 'Current state of quantum computing.' },
        { eventId: 'd2-2', day: 2, time: '10:15', endTime: '10:45', title: 'Coffee Break', location: 'Foyer A & B', type: 'break', description: 'Refreshments served.' },
        { eventId: 'd2-3', day: 2, time: '10:45', endTime: '12:15', title: 'Paper Session: IoT and Edge Computing Systems', speaker: 'Session Chair: Dr. Thomas J.', location: 'Hall B - Room 201', type: 'paper', track: 'IoT & Embedded Systems', description: 'Four paper presentations on IoT.' },
        { eventId: 'd2-4', day: 2, time: '12:15', endTime: '13:30', title: 'Lunch Break & Poster Session', location: 'Banquet Hall & Poster Gallery', type: 'break', description: 'Lunch with interactive poster session.' },
        { eventId: 'd2-5', day: 2, time: '13:30', endTime: '15:00', title: 'Workshop: Building Production-Ready ML Pipelines', speaker: 'Dr. Priya Sharma, Google DeepMind', location: 'Computer Lab - Room 102', type: 'workshop', track: 'AI & Machine Learning', description: 'Hands-on MLOps best practices workshop.' },
        { eventId: 'd3-1', day: 3, time: '09:00', endTime: '10:15', title: 'Keynote: Cybersecurity in the Age of AI', speaker: 'Dr. Bruce Schneier, Harvard Kennedy School', location: 'Main Auditorium (Hall A)', type: 'keynote', description: 'AI transforming cybersecurity threats and defenses.' },
        { eventId: 'd3-2', day: 3, time: '10:15', endTime: '10:45', title: 'Coffee Break', location: 'Foyer A & B', type: 'break', description: 'Final refreshments.' },
        { eventId: 'd3-3', day: 3, time: '10:45', endTime: '12:15', title: 'Paper Session: Privacy & Secure Computing', speaker: 'Session Chair: Prof. Michael Chen', location: 'Hall B - Room 201', type: 'paper', track: 'Blockchain & Security', description: 'Four paper presentations on privacy.' },
        { eventId: 'd3-4', day: 3, time: '15:30', endTime: '16:30', title: 'Awards Ceremony & Best Paper Presentation', speaker: 'Conference Committee', location: 'Main Auditorium (Hall A)', type: 'keynote', description: 'Announcement of Best Paper, Best Student Paper, and other awards.' },
        { eventId: 'd3-5', day: 3, time: '16:30', endTime: '17:00', title: 'Closing Ceremony & ICCS 2027 Announcement', speaker: 'Prof. R. Krishnamurthy, Conference Chair', location: 'Main Auditorium (Hall A)', type: 'keynote', description: 'Conference summary and ICCS 2027 venue announcement.' }
      ]);
      console.log('📅 Schedule seeded');
    }

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.insertMany([
        { userId: 'USR-001', name: 'Vengadesan K.', email: 'vengadesan@gce.edu', role: 'Speaker', payment: '$100', status: 'Confirmed', registeredDate: '2025-12-10' },
        { userId: 'USR-002', name: 'Dr. Priya Sharma', email: 'priya.s@iitm.ac.in', role: 'Workshop Lead', payment: 'Complimentary', status: 'Confirmed', registeredDate: '2025-11-15' },
        { userId: 'USR-003', name: 'Ramesh T.', email: 'ramesh.t@anna.edu', role: 'Student', payment: '$50', status: 'Confirmed', registeredDate: '2025-12-20' },
        { userId: 'USR-004', name: 'Kumar R.', email: 'kumar.r@vit.edu', role: 'Speaker', payment: '$100', status: 'Confirmed', registeredDate: '2025-12-05' },
        { userId: 'USR-005', name: 'Dr. Sarah Johnson', email: 'sarah.j@mit.edu', role: 'Keynote Panelist', payment: 'Complimentary', status: 'Confirmed', registeredDate: '2025-10-20' },
        { userId: 'USR-006', name: 'Nisha P.', email: 'nisha.p@nit.edu', role: 'Student', payment: '$50', status: 'Pending', registeredDate: '2026-01-08' },
        { userId: 'USR-007', name: 'Thomas J.', email: 'thomas.j@srmist.edu', role: 'Professional', payment: '$150', status: 'Confirmed', registeredDate: '2025-12-28' },
        { userId: 'USR-008', name: 'Dr. Anitha M.', email: 'anitha.m@gce.edu', role: 'Session Chair', payment: 'Complimentary', status: 'Confirmed', registeredDate: '2025-11-01' },
        { userId: 'USR-009', name: 'Wei Zhang', email: 'wei.z@tsinghua.edu', role: 'Speaker', payment: '$100', status: 'Pending', registeredDate: '2026-01-12' },
        { userId: 'USR-010', name: 'Carlos Gomez', email: 'carlos.g@unam.mx', role: 'Student', payment: '$50', status: 'Cancelled', registeredDate: '2025-12-15' }
      ]);
      console.log('👥 Users seeded');
    }

    console.log('✅ Database ready');
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  }
}

// ─── API Routes ───────────────────────────────────────────────

// GET /api/papers
app.get('/api/papers', async (req, res) => {
  try {
    const papers = await Paper.find().sort({ createdAt: -1 });
    res.json(papers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/papers
app.post('/api/papers', async (req, res) => {
  try {
    const { title, authors, abstract, track, keywords } = req.body;
    const count = await Paper.countDocuments();
    const paperId = `CMS-2026-${String(count + 1).padStart(3, '0')}`;
    const newPaper = await Paper.create({
      paperId,
      title,
      authors,
      abstract: abstract || '',
      track: track || 'General',
      keywords: keywords || [],
      status: 'pending',
      score: null,
      submittedDate: new Date().toISOString().split('T')[0]
    });
    res.status(201).json(newPaper);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/papers/:id
app.put('/api/papers/:id', async (req, res) => {
  try {
    const paper = await Paper.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!paper) return res.status(404).json({ error: 'Paper not found' });
    res.json(paper);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/reviews
app.post('/api/reviews', async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/schedule
app.get('/api/schedule', async (req, res) => {
  try {
    const events = await Schedule.find().sort({ day: 1, time: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/users
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await User.find().sort({ registeredDate: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/admin/users/:id/activate
app.put('/api/admin/users/:id/activate', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'Confirmed' }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/admin/users/:id
app.delete('/api/admin/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/register
app.post('/api/register', async (req, res) => {
  try {
    const { name, organization, ticketType, email } = req.body;
    const count = await User.countDocuments();
    const userId = `USR-${String(count + 1).padStart(3, '0')}`;
    const newUser = await User.create({
      userId,
      name,
      organization: organization || '',
      ticketType: ticketType || 'Student',
      email: email || '',
      role: ticketType || 'Student',
      payment: 'Pending',
      status: 'Pending',
      registeredDate: new Date().toISOString().split('T')[0]
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/user
app.get('/api/user', async (req, res) => {
  try {
    const user = await User.findOne({ userId: 'USR-001' });
    res.json(user || { name: 'Vengadesan', organization: 'GCE Tirunelveli', ticketType: 'Student' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stats
app.get('/api/stats', async (req, res) => {
  try {
    const totalPapers = await Paper.countDocuments();
    const accepted = await Paper.countDocuments({ status: 'Accepted' });
    const underReview = await Paper.countDocuments({ status: 'Under Review' });
    const totalRegistered = await User.countDocuments();
    res.json({ totalPapers, accepted, underReview, totalRegistered });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});