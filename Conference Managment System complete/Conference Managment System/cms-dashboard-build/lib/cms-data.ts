// ─── Types ───────────────────────────────────────────────────
export type Section =
  | "overview"
  | "registration"
  | "submissions"
  | "upload"
  | "reviews"
  | "schedule"
  | "admin"
  | "settings"

export interface Paper {
  id: string
  title: string
  authors: string
  track: string
  status: string
  score: number | null
  abstract: string
  keywords: string[]
  submittedDate: string
}

export interface Review {
  paperId: string
  paperTitle: string
  stage: string
  reviewer: string
  date: string
  score: number | null
  feedback: string
  criteria: {
    originality: number
    relevance: number
    methodology: number
    clarity: number
  }
}

export interface ScheduleEvent {
  id: string
  day: number
  time: string
  endTime: string
  title: string
  speaker?: string
  location: string
  type: "keynote" | "paper" | "workshop" | "break" | "panel" | "social"
  track?: string
  description: string
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  payment: string
  status: "Confirmed" | "Pending" | "Cancelled"
  registeredDate: string
}

export interface Activity {
  id: string
  title: string
  description: string
  time: string
  icon: string
}

// ─── Sample Papers ───────────────────────────────────────────
export const samplePapers: Paper[] = [
  {
    id: "CMS-2026-001",
    title: "Deep Learning Approaches for Real-Time Object Detection in Autonomous Vehicles",
    authors: "Vengadesan K., Priya S., Ramesh T.",
    track: "AI & Machine Learning",
    status: "Accepted",
    score: 8.5,
    abstract:
      "This paper presents a novel deep learning architecture combining attention mechanisms with lightweight convolutional neural networks for real-time object detection in autonomous driving scenarios. Our proposed model achieves 94.2% mAP on the KITTI benchmark while maintaining inference speeds of 45 FPS on embedded hardware. We introduce a multi-scale feature aggregation module that effectively captures both fine-grained details and high-level semantic information, addressing the critical challenge of detecting small and occluded objects in complex driving environments.",
    keywords: ["Deep Learning", "Object Detection", "Autonomous Vehicles", "CNN", "Real-Time"],
    submittedDate: "2025-12-10",
  },
  {
    id: "CMS-2026-002",
    title: "Quantum-Resistant Cryptographic Protocols for IoT Edge Computing",
    authors: "Vengadesan K., Kumar R.",
    track: "Quantum Computing",
    status: "Under Review",
    score: null,
    abstract:
      "As quantum computing advances threaten current cryptographic standards, this paper proposes a suite of lattice-based cryptographic protocols specifically optimized for resource-constrained IoT edge devices. We demonstrate that our protocols maintain security against both classical and quantum adversaries while achieving 60% lower computational overhead compared to existing post-quantum schemes. The experimental evaluation covers ARM Cortex-M4 processors commonly found in IoT gateways, showing practical deployment feasibility with key generation times under 200ms.",
    keywords: ["Quantum Computing", "Cryptography", "IoT", "Post-Quantum", "Edge Computing"],
    submittedDate: "2025-12-22",
  },
  {
    id: "CMS-2026-003",
    title: "Federated Learning with Differential Privacy for Healthcare Data Analytics",
    authors: "Priya S., Vengadesan K., Dr. Anitha M.",
    track: "AI & Machine Learning",
    status: "Revision Needed",
    score: 6.8,
    abstract:
      "This research introduces a privacy-preserving federated learning framework designed for collaborative healthcare analytics across multiple hospital networks. By integrating local differential privacy with secure aggregation protocols, our approach enables hospitals to jointly train predictive models for disease diagnosis without sharing sensitive patient data. Experiments on real-world clinical datasets show our model achieves 91.3% accuracy for early diabetes prediction while providing provable privacy guarantees with epsilon = 1.5.",
    keywords: ["Federated Learning", "Differential Privacy", "Healthcare", "Machine Learning"],
    submittedDate: "2026-01-05",
  },
  {
    id: "CMS-2026-004",
    title: "Blockchain-Based Decentralized Identity Management for Smart Cities",
    authors: "Kumar R., Vengadesan K.",
    track: "Blockchain & Security",
    status: "Accepted",
    score: 9.1,
    abstract:
      "We propose a decentralized identity management system leveraging Ethereum smart contracts and zero-knowledge proofs for smart city applications. The system enables citizens to control their digital identities while providing verifiable credentials for accessing government services, transportation, and healthcare. Our prototype demonstrates sub-second verification times and scales to support 1 million concurrent users with a throughput of 15,000 transactions per second using layer-2 rollup solutions.",
    keywords: ["Blockchain", "Identity Management", "Smart Cities", "Zero-Knowledge Proofs"],
    submittedDate: "2025-11-28",
  },
  {
    id: "CMS-2026-005",
    title: "Energy-Efficient Edge AI: Neural Architecture Search for TinyML Applications",
    authors: "Vengadesan K., Nisha P., Thomas J.",
    track: "IoT & Embedded Systems",
    status: "Submitted",
    score: null,
    abstract:
      "This paper presents a hardware-aware neural architecture search (NAS) framework specifically designed for deploying AI models on microcontrollers with less than 256KB of SRAM. Our differentiable NAS approach jointly optimizes accuracy, latency, and energy consumption, producing models that achieve state-of-the-art accuracy on keyword spotting and gesture recognition tasks while consuming less than 50 micro-joules per inference. The resulting models are 4x smaller and 3x more energy-efficient than existing TinyML solutions.",
    keywords: ["TinyML", "Neural Architecture Search", "Edge AI", "IoT", "Energy Efficiency"],
    submittedDate: "2026-01-15",
  },
]

// ─── Sample Reviews ──────────────────────────────────────────
export const sampleReviews: Review[] = [
  {
    paperId: "CMS-2026-001",
    paperTitle: "Deep Learning Approaches for Real-Time Object Detection in Autonomous Vehicles",
    stage: "Decision Made",
    reviewer: "Dr. Sarah Johnson (MIT)",
    date: "2026-02-01",
    score: 8.5,
    feedback:
      "Excellent paper with strong experimental results. The multi-scale feature aggregation module is a significant contribution. The evaluation on KITTI benchmark is thorough. Minor suggestions: include ablation studies for each module component and compare with transformer-based detectors. The writing quality is very high and the paper is well-structured throughout.",
    criteria: { originality: 9, relevance: 8, methodology: 9, clarity: 8 },
  },
  {
    paperId: "CMS-2026-002",
    paperTitle: "Quantum-Resistant Cryptographic Protocols for IoT Edge Computing",
    stage: "Under Review",
    reviewer: "Prof. Michael Chen (Stanford)",
    date: "2026-02-10",
    score: null,
    feedback: "Review in progress. Initial assessment indicates strong theoretical foundations. Awaiting detailed analysis of the security proofs and performance benchmarks on constrained devices.",
    criteria: { originality: 0, relevance: 0, methodology: 0, clarity: 0 },
  },
  {
    paperId: "CMS-2026-003",
    paperTitle: "Federated Learning with Differential Privacy for Healthcare Data Analytics",
    stage: "Decision Made",
    reviewer: "Dr. Emily Watson (Oxford)",
    date: "2026-01-28",
    score: 6.8,
    feedback:
      "The paper addresses an important problem of privacy in healthcare ML. However, the privacy budget analysis (epsilon = 1.5) needs more justification for medical applications. Please provide comparisons with at least two additional federated learning baselines, and add a discussion on communication costs. The clinical dataset description lacks detail on patient demographics.",
    criteria: { originality: 7, relevance: 8, methodology: 6, clarity: 6 },
  },
  {
    paperId: "CMS-2026-004",
    paperTitle: "Blockchain-Based Decentralized Identity Management for Smart Cities",
    stage: "Decision Made",
    reviewer: "Prof. David Kim (ETH Zurich)",
    date: "2026-02-05",
    score: 9.1,
    feedback:
      "Outstanding research with excellent practical implications. The integration of zero-knowledge proofs with smart contracts is elegant and well-implemented. The scalability analysis is particularly impressive. This work represents a meaningful advancement in decentralized identity systems and should be considered for the Best Paper award.",
    criteria: { originality: 9, relevance: 10, methodology: 9, clarity: 9 },
  },
  {
    paperId: "CMS-2026-005",
    paperTitle: "Energy-Efficient Edge AI: Neural Architecture Search for TinyML Applications",
    stage: "Reviewer Assigned",
    reviewer: "Dr. Ana Martinez (Google Research)",
    date: "2026-02-15",
    score: null,
    feedback: "Reviewer assigned. Expected review completion by March 1, 2026.",
    criteria: { originality: 0, relevance: 0, methodology: 0, clarity: 0 },
  },
]

// ─── Schedule Data ───────────────────────────────────────────
export const scheduleData: ScheduleEvent[] = [
  // Day 1
  {
    id: "d1-1",
    day: 1,
    time: "08:00",
    endTime: "09:00",
    title: "Registration & Welcome Breakfast",
    location: "Grand Lobby, Convention Center",
    type: "social",
    description: "Collect your badge, conference kit, and enjoy a continental breakfast while networking with fellow attendees. Registration desks will be organized alphabetically. WiFi credentials and conference app login details will be provided at the desk.",
  },
  {
    id: "d1-2",
    day: 1,
    time: "09:00",
    endTime: "09:30",
    title: "Opening Ceremony & Inaugural Address",
    speaker: "Prof. R. Krishnamurthy, Conference Chair",
    location: "Main Auditorium (Hall A)",
    type: "keynote",
    description: "Welcome address by the Conference Chair, overview of ICCS 2026 theme \"Computing for a Sustainable Future\", introduction of keynote speakers, and presentation of conference statistics: 350 submissions from 42 countries, 28% acceptance rate. Special remarks by the Vice Chancellor.",
  },
  {
    id: "d1-3",
    day: 1,
    time: "09:30",
    endTime: "10:45",
    title: "Keynote: The Future of Artificial General Intelligence",
    speaker: "Dr. Yann LeCun, Chief AI Scientist, Meta",
    location: "Main Auditorium (Hall A)",
    type: "keynote",
    description: "An exploration of the path toward Artificial General Intelligence (AGI), covering current limitations of large language models, the importance of world models, energy-based architectures, and the JEPA (Joint Embedding Predictive Architecture) framework. Dr. LeCun will discuss how autonomous machine intelligence might emerge and the societal implications of AGI. Includes 15-minute Q&A session.",
  },
  {
    id: "d1-4",
    day: 1,
    time: "10:45",
    endTime: "11:15",
    title: "Coffee Break & Networking",
    location: "Foyer A & B",
    type: "break",
    description: "Refreshments served. Poster session preview available in Foyer B. Sponsor booths open for demonstrations.",
  },
  {
    id: "d1-5",
    day: 1,
    time: "11:15",
    endTime: "12:45",
    title: "Paper Session: Advanced Deep Learning Architectures",
    speaker: "Session Chair: Dr. Anitha M.",
    location: "Hall B - Room 201",
    type: "paper",
    track: "AI & Machine Learning",
    description: "Four paper presentations (20 min each + 5 min Q&A):\n1. \"Deep Learning Approaches for Real-Time Object Detection in Autonomous Vehicles\" - Vengadesan K. et al.\n2. \"Transformer-Based Multi-Modal Fusion for Medical Diagnosis\" - Chen et al.\n3. \"Self-Supervised Learning for Low-Resource Languages\" - Patel et al.\n4. \"Efficient Fine-Tuning of Foundation Models with LoRA Variants\" - Kim et al.",
  },
  {
    id: "d1-6",
    day: 1,
    time: "11:15",
    endTime: "12:45",
    title: "Paper Session: Blockchain & Distributed Ledger Technologies",
    speaker: "Session Chair: Prof. David Kim",
    location: "Hall C - Room 305",
    type: "paper",
    track: "Blockchain & Security",
    description: "Four paper presentations:\n1. \"Blockchain-Based Decentralized Identity Management for Smart Cities\" - Kumar R. et al.\n2. \"Scalable Consensus Protocols for Permissioned Blockchains\" - Wang et al.\n3. \"Smart Contract Vulnerability Detection Using Graph Neural Networks\" - Mohan et al.\n4. \"Cross-Chain Interoperability: Challenges and Solutions\" - Liu et al.",
  },
  {
    id: "d1-7",
    day: 1,
    time: "12:45",
    endTime: "14:00",
    title: "Lunch Break",
    location: "Banquet Hall, Level 2",
    type: "break",
    description: "Buffet lunch with vegetarian, vegan, and halal options available. Special dietary requests will be accommodated at the designated counter. Networking tables organized by research interest.",
  },
  {
    id: "d1-8",
    day: 1,
    time: "14:00",
    endTime: "15:30",
    title: "Workshop: Hands-On Quantum Computing with Qiskit",
    speaker: "Dr. James Wright, IBM Quantum",
    location: "Computer Lab - Room 102",
    type: "workshop",
    track: "Quantum Computing",
    description: "A practical workshop covering quantum computing fundamentals using IBM Qiskit framework. Topics include: quantum gates and circuits, quantum entanglement demonstrations, Grover's search algorithm implementation, VQE for molecular simulation. Laptops required (Qiskit pre-installed). Lab assistants available. Max 40 participants - pre-registration required.",
  },
  {
    id: "d1-9",
    day: 1,
    time: "15:30",
    endTime: "16:00",
    title: "Tea Break",
    location: "Foyer A",
    type: "break",
    description: "Light refreshments and tea/coffee service.",
  },
  {
    id: "d1-10",
    day: 1,
    time: "16:00",
    endTime: "17:30",
    title: "Panel Discussion: Ethics and Governance of AI Systems",
    speaker: "Moderator: Prof. Lisa Park, UC Berkeley",
    location: "Main Auditorium (Hall A)",
    type: "panel",
    description: "Distinguished panelists discuss the ethical implications of AI deployment in critical sectors. Topics: AI bias and fairness in hiring/lending, regulatory frameworks (EU AI Act, India's DPDPA), responsible AI development practices, environmental impact of large model training. Panelists: Dr. Yann LeCun (Meta), Dr. Timnit Gebru (DAIR Institute), Prof. Stuart Russell (UC Berkeley), Ms. Nandini Sharma (NITI Aayog).",
  },
  {
    id: "d1-11",
    day: 1,
    time: "19:00",
    endTime: "21:00",
    title: "Welcome Dinner & Cultural Program",
    location: "Rooftop Garden, Hotel Grand",
    type: "social",
    description: "Formal welcome dinner with traditional cultural performances showcasing local art and dance. Networking opportunity with keynote speakers and industry leaders. Dress code: Smart casual. Transportation provided from the convention center.",
  },

  // Day 2
  {
    id: "d2-1",
    day: 2,
    time: "09:00",
    endTime: "10:15",
    title: "Keynote: Quantum Supremacy and Beyond - Practical Quantum Advantage",
    speaker: "Prof. John Preskill, Caltech",
    location: "Main Auditorium (Hall A)",
    type: "keynote",
    description: "Prof. Preskill explores the current state of quantum computing, from noisy intermediate-scale quantum (NISQ) devices to the path toward fault-tolerant quantum computers. Topics include quantum error correction breakthroughs, quantum machine learning opportunities, quantum simulation for drug discovery, and realistic timelines for quantum advantage in industry applications. Includes live demo of a 100-qubit experiment.",
  },
  {
    id: "d2-2",
    day: 2,
    time: "10:15",
    endTime: "10:45",
    title: "Coffee Break",
    location: "Foyer A & B",
    type: "break",
    description: "Refreshments served. Poster viewing continues.",
  },
  {
    id: "d2-3",
    day: 2,
    time: "10:45",
    endTime: "12:15",
    title: "Paper Session: IoT and Edge Computing Systems",
    speaker: "Session Chair: Dr. Thomas J.",
    location: "Hall B - Room 201",
    type: "paper",
    track: "IoT & Embedded Systems",
    description: "Four paper presentations:\n1. \"Energy-Efficient Edge AI: Neural Architecture Search for TinyML Applications\" - Vengadesan K. et al.\n2. \"Federated Edge Intelligence for Smart Manufacturing\" - Zhang et al.\n3. \"Adaptive Task Offloading in Mobile Edge Computing\" - Reddy et al.\n4. \"Secure Firmware Updates for Constrained IoT Devices\" - Ahmed et al.",
  },
  {
    id: "d2-4",
    day: 2,
    time: "10:45",
    endTime: "12:15",
    title: "Paper Session: Natural Language Processing & Generation",
    speaker: "Session Chair: Dr. Emily Watson",
    location: "Hall C - Room 305",
    type: "paper",
    track: "AI & Machine Learning",
    description: "Four paper presentations:\n1. \"Retrieval-Augmented Generation for Domain-Specific QA\" - Singh et al.\n2. \"Multilingual Sentiment Analysis Using Cross-Lingual Transformers\" - Gomez et al.\n3. \"Hallucination Detection and Mitigation in LLMs\" - Park et al.\n4. \"Code Generation Quality: Benchmarking Modern AI Assistants\" - Chen et al.",
  },
  {
    id: "d2-5",
    day: 2,
    time: "12:15",
    endTime: "13:30",
    title: "Lunch Break & Poster Session",
    location: "Banquet Hall & Poster Gallery",
    type: "break",
    description: "Lunch followed by interactive poster session featuring 45 poster presentations. Authors will be present for discussions. Best Poster Award voting opens.",
  },
  {
    id: "d2-6",
    day: 2,
    time: "13:30",
    endTime: "15:00",
    title: "Workshop: Building Production-Ready ML Pipelines",
    speaker: "Dr. Priya Sharma, Google DeepMind",
    location: "Computer Lab - Room 102",
    type: "workshop",
    track: "AI & Machine Learning",
    description: "Hands-on workshop on MLOps best practices: experiment tracking with MLflow, model versioning and registry, CI/CD for ML models, monitoring model drift in production, A/B testing strategies for model deployment. Participants will build and deploy a complete ML pipeline during the session. Prerequisites: Python, basic ML knowledge.",
  },
  {
    id: "d2-7",
    day: 2,
    time: "15:00",
    endTime: "15:30",
    title: "Tea Break",
    location: "Foyer A",
    type: "break",
    description: "Light refreshments.",
  },
  {
    id: "d2-8",
    day: 2,
    time: "15:30",
    endTime: "17:00",
    title: "Panel: Future of Work - AI, Automation, and Human Collaboration",
    speaker: "Moderator: Dr. Ravi Shankar, IIT Delhi",
    location: "Main Auditorium (Hall A)",
    type: "panel",
    description: "Industry leaders and academics discuss how AI is reshaping the workforce. Topics: agentic AI in enterprise, augmented intelligence vs replacement, reskilling strategies for the AI era, the role of universities in preparing future-ready graduates. Panelists from Microsoft Research, TCS Innovation Labs, Infosys, and leading academic institutions.",
  },
  {
    id: "d2-9",
    day: 2,
    time: "17:00",
    endTime: "18:00",
    title: "Industry Showcase: Startup Innovation Demos",
    speaker: "5 Selected Startups",
    location: "Exhibition Hall D",
    type: "social",
    description: "Five cutting-edge startups present 10-minute live demos of their innovations: (1) AI-powered medical imaging diagnostics, (2) Decentralized energy trading platform, (3) AR/VR collaboration tools for remote teams, (4) Autonomous drone delivery systems, (5) Privacy-preserving data marketplace. Followed by networking with investors and industry mentors.",
  },

  // Day 3
  {
    id: "d3-1",
    day: 3,
    time: "09:00",
    endTime: "10:15",
    title: "Keynote: Cybersecurity in the Age of AI - Threats and Defenses",
    speaker: "Dr. Bruce Schneier, Harvard Kennedy School",
    location: "Main Auditorium (Hall A)",
    type: "keynote",
    description: "A comprehensive overview of how AI is transforming both cyberattacks and cybersecurity defenses. Topics covered: AI-generated phishing and social engineering, deepfake threats to identity verification, autonomous cyber defense systems, the arms race between AI attackers and defenders, policy recommendations for governments and organizations. Dr. Schneier will share real-world case studies from 2025-2026.",
  },
  {
    id: "d3-2",
    day: 3,
    time: "10:15",
    endTime: "10:45",
    title: "Coffee Break",
    location: "Foyer A & B",
    type: "break",
    description: "Refreshments served. Final poster viewing.",
  },
  {
    id: "d3-3",
    day: 3,
    time: "10:45",
    endTime: "12:15",
    title: "Paper Session: Privacy & Secure Computing",
    speaker: "Session Chair: Prof. Michael Chen",
    location: "Hall B - Room 201",
    type: "paper",
    track: "Blockchain & Security",
    description: "Four paper presentations:\n1. \"Quantum-Resistant Cryptographic Protocols for IoT Edge Computing\" - Vengadesan K. et al.\n2. \"Homomorphic Encryption for Privacy-Preserving Cloud ML\" - Tanaka et al.\n3. \"Differential Privacy in Federated Healthcare Analytics\" - Priya S. et al.\n4. \"Zero-Trust Architecture for Multi-Cloud Environments\" - Adams et al.",
  },
  {
    id: "d3-4",
    day: 3,
    time: "10:45",
    endTime: "12:15",
    title: "Paper Session: Computer Vision & Robotics",
    speaker: "Session Chair: Dr. Sarah Johnson",
    location: "Hall C - Room 305",
    type: "paper",
    track: "AI & Machine Learning",
    description: "Four paper presentations:\n1. \"Vision-Language Models for Robotic Manipulation\" - Lee et al.\n2. \"3D Scene Reconstruction from Single Images Using Diffusion Models\" - Brown et al.\n3. \"Autonomous Navigation in Unstructured Environments\" - Gupta et al.\n4. \"Real-Time Video Understanding with Efficient Transformers\" - Yang et al.",
  },
  {
    id: "d3-5",
    day: 3,
    time: "12:15",
    endTime: "13:30",
    title: "Lunch Break",
    location: "Banquet Hall, Level 2",
    type: "break",
    description: "Final networking lunch. Best Poster Award voting closes at 13:00.",
  },
  {
    id: "d3-6",
    day: 3,
    time: "13:30",
    endTime: "15:00",
    title: "Workshop: Responsible AI - From Theory to Practice",
    speaker: "Dr. Timnit Gebru, DAIR Institute",
    location: "Hall B - Room 201",
    type: "workshop",
    track: "AI & Machine Learning",
    description: "Interactive workshop on implementing responsible AI practices: bias auditing frameworks for ML models, fairness metrics and their tradeoffs, creating model cards and datasheets, building diverse and inclusive AI teams, regulatory compliance checklist. Participants will audit a pre-trained model for bias using open-source tools.",
  },
  {
    id: "d3-7",
    day: 3,
    time: "15:00",
    endTime: "15:30",
    title: "Tea Break",
    location: "Foyer A",
    type: "break",
    description: "Light refreshments.",
  },
  {
    id: "d3-8",
    day: 3,
    time: "15:30",
    endTime: "16:30",
    title: "Awards Ceremony & Best Paper Presentation",
    speaker: "Conference Committee",
    location: "Main Auditorium (Hall A)",
    type: "keynote",
    description: "Announcement and presentation of awards:\n- Best Paper Award (sponsored by IEEE)\n- Best Student Paper Award\n- Best Poster Award\n- Outstanding Reviewer Award\n- Innovation in Computing Award\nWinners will give 5-minute acceptance speeches. Certificates and cash prizes presented by Chief Guest.",
  },
  {
    id: "d3-9",
    day: 3,
    time: "16:30",
    endTime: "17:00",
    title: "Closing Ceremony & ICCS 2027 Announcement",
    speaker: "Prof. R. Krishnamurthy, Conference Chair",
    location: "Main Auditorium (Hall A)",
    type: "keynote",
    description: "Conference summary and highlights, thank-you address to sponsors, reviewers, and organizing committee. Announcement of ICCS 2027 venue and dates. Group photograph of all attendees. Conference proceedings publication timeline announced.",
  },
  {
    id: "d3-10",
    day: 3,
    time: "17:00",
    endTime: "19:00",
    title: "Farewell Reception & Networking",
    location: "Garden Terrace",
    type: "social",
    description: "Informal farewell reception with drinks and canapes. Final networking opportunity with researchers, industry professionals, and speakers. Photo booth and memorabilia station available. Transportation to airport/hotels arranged from 18:00 onwards.",
  },
]

// ─── Submission Chart Data ───────────────────────────────────
export const submissionChartData = [
  { month: "Sep", submissions: 12, accepted: 3 },
  { month: "Oct", submissions: 28, accepted: 8 },
  { month: "Nov", submissions: 45, accepted: 14 },
  { month: "Dec", submissions: 62, accepted: 20 },
  { month: "Jan", submissions: 38, accepted: 12 },
  { month: "Feb", submissions: 15, accepted: 5 },
]

// ─── Recent Activities ───────────────────────────────────────
export const recentActivities: Activity[] = [
  {
    id: "a1",
    title: "Paper Accepted",
    description: "\"Deep Learning Approaches for Real-Time Object Detection\" has been accepted for ICCS 2026.",
    time: "2 hours ago",
    icon: "CheckCircle",
  },
  {
    id: "a2",
    title: "New Review Available",
    description: "Reviewer feedback is available for \"Federated Learning with Differential Privacy\".",
    time: "5 hours ago",
    icon: "MessageSquare",
  },
  {
    id: "a3",
    title: "Paper Submitted",
    description: "\"Energy-Efficient Edge AI: Neural Architecture Search\" submitted successfully.",
    time: "1 day ago",
    icon: "Upload",
  },
  {
    id: "a4",
    title: "Revision Required",
    description: "\"Federated Learning with Differential Privacy\" requires revisions before acceptance.",
    time: "2 days ago",
    icon: "AlertCircle",
  },
  {
    id: "a5",
    title: "Schedule Published",
    description: "ICCS 2026 full conference schedule with all 3 days is now available.",
    time: "3 days ago",
    icon: "Bell",
  },
  {
    id: "a6",
    title: "Registration Confirmed",
    description: "Your student registration for ICCS 2026 has been confirmed. Ticket ID: ICCS-STU-2026-042.",
    time: "5 days ago",
    icon: "Mail",
  },
]

// ─── Admin Users ─────────────────────────────────────────────
export const adminUsers: AdminUser[] = [
  { id: "USR-001", name: "Vengadesan K.", email: "vengadesan@gce.edu", role: "Speaker", payment: "$100", status: "Confirmed", registeredDate: "2025-12-10" },
  { id: "USR-002", name: "Dr. Priya Sharma", email: "priya.s@iitm.ac.in", role: "Workshop Lead", payment: "Complimentary", status: "Confirmed", registeredDate: "2025-11-15" },
  { id: "USR-003", name: "Ramesh T.", email: "ramesh.t@anna.edu", role: "Student", payment: "$50", status: "Confirmed", registeredDate: "2025-12-20" },
  { id: "USR-004", name: "Kumar R.", email: "kumar.r@vit.edu", role: "Speaker", payment: "$100", status: "Confirmed", registeredDate: "2025-12-05" },
  { id: "USR-005", name: "Dr. Sarah Johnson", email: "sarah.j@mit.edu", role: "Keynote Panelist", payment: "Complimentary", status: "Confirmed", registeredDate: "2025-10-20" },
  { id: "USR-006", name: "Nisha P.", email: "nisha.p@nit.edu", role: "Student", payment: "$50", status: "Pending", registeredDate: "2026-01-08" },
  { id: "USR-007", name: "Thomas J.", email: "thomas.j@srmist.edu", role: "Professional", payment: "$150", status: "Confirmed", registeredDate: "2025-12-28" },
  { id: "USR-008", name: "Dr. Anitha M.", email: "anitha.m@gce.edu", role: "Session Chair", payment: "Complimentary", status: "Confirmed", registeredDate: "2025-11-01" },
  { id: "USR-009", name: "Wei Zhang", email: "wei.z@tsinghua.edu", role: "Speaker", payment: "$100", status: "Pending", registeredDate: "2026-01-12" },
  { id: "USR-010", name: "Carlos Gomez", email: "carlos.g@unam.mx", role: "Student", payment: "$50", status: "Cancelled", registeredDate: "2025-12-15" },
  { id: "USR-011", name: "Dr. Emily Watson", email: "emily.w@oxford.ac.uk", role: "Reviewer", payment: "Complimentary", status: "Confirmed", registeredDate: "2025-10-25" },
  { id: "USR-012", name: "Arun Reddy", email: "arun.r@iisc.ac.in", role: "Professional", payment: "$150", status: "Confirmed", registeredDate: "2026-01-02" },
]
