export const translations = {
  te: {
    // Header & Gov branding
    govState: 'ప్రభుత్వ రెవెన్యూ మరియు పౌర సేవల శాఖ',
    departmentName: 'మీసేవ & గ్రామ/వార్డు సచివాలయ సేవల వేదిక',
    appTitle: 'అధికారి మిత్ర',
    appSubtitle: 'రెవెన్యూ అధికారుల AI సహాయక మరియు త్వరిత దరఖాస్తు పరిష్కార వ్యవస్థ',
    officerTitle: 'రెవెన్యూ ఇన్‌స్పెక్టర్ (RI / VRO)',
    officerName: 'శ్రీ పి. సురేష్ వర్మ',
    officeLocation: 'భీమునిపట్నం మండలం, విశాఖపట్నం జిల్లా',
    resetDemo: 'డెమో డేటాను రీసెట్ చేయండి',
    languageSwitch: 'English',

    // KPI Metrics
    metricTotalPending: 'మొత్తం పెండింగ్ దరఖాస్తులు',
    metricUrgentSla: 'తక్షణ పరిశీలన / గడువు ముగింపు',
    metricAiReady: 'AI ఆమోదానికి సిద్ధమైనవి',
    metricDiscrepancy: 'లోపాలు / పునఃసమీక్ష క్యూ',
    metricActionedToday: 'నేడు పరిష్కరించినవి',

    // Queue / Filters
    queueHeading: 'దరఖాస్తుల ప్రాధాన్యత జాబితా',
    searchPlaceholder: 'దరఖాస్తు సంఖ్య, పేరు, గ్రామం, ఆధార్ శోధించండి...',
    filterAll: 'అన్ని దరఖాస్తులు',
    filterUrgent: 'తక్షణ గడువు (SLA < 2 రోజులు)',
    filterHighRisk: 'అధిక వ్యత్యాసాలు / లోపాలు',
    filterAiApproved: 'AI ఆమోద సిఫార్సు',

    // Status tabs
    tabPending: 'పరిష్కారానికి పెండింగ్',
    tabApproved: 'ఆమోదించినవి',
    tabRejected: 'తిరస్కరించినవి',
    tabReturned: 'పునఃసమీక్షకు పంపినవి',

    // Services
    serviceAll: 'అన్ని సేవలు',
    serviceCasteIncome: 'కుల & ఆదాయ ధ్రువీకరణ',
    servicePension: 'వృద్ధాప్య పింఛను (ఆసరా/సంధ్య)',
    serviceCropLoss: 'పంట నష్ట పరిహారం (e-Crop)',
    serviceMutation: 'భూమి మ్యుటేషన్ & 1B పాస్‌బుక్',
    serviceDisability: 'దివ్యాంగుల పింఛను (SADAREM)',

    // Sort options
    sortLabel: 'క్రమబద్ధీకరణ:',
    sortSla: 'SLA గడువు (తక్కువ రోజులు)',
    sortPriority: 'ప్రాధాన్యత స్కోరు (ఎక్కువ నుండి)',
    sortDate: 'దరఖాస్తు తేదీ (నూతనమైనవి)',

    // Application Card details
    slaRemaining: 'రోజులు మిగిలి ఉన్నాయి',
    slaExpired: 'గడువు ముగిసింది!',
    slaToday: 'నేడే చివరి రోజు!',
    aiConfidence: 'విశ్వసనీయత',
    viewDetails: 'వివరాలు పరిశీలించండి',

    // Application Detail View
    applicantProfile: 'దరఖాస్తుదారుని ప్రొఫైల్',
    applicationNo: 'దరఖాస్తు సంఖ్య',
    applicationDate: 'దరఖాస్తు సమర్పించిన తేదీ',
    serviceLabel: 'కోరిన సేవ',
    fatherHusbandName: 'తండ్రి / భర్త పేరు',
    genderAge: 'లింగం / వయస్సు',
    aadhaarNo: 'ఆధార్ సంఖ్య (e-KYC)',
    mobileNo: 'మొబైల్ సంఖ్య',
    address: 'నివాస చిరునామా',
    villageHobli: 'గ్రామం & మండలం',

    // Tabs inside detail
    tabAiCoPilot: 'కృత్రిమ మేధస్సు (AI) సహాయకుడు',
    tabDossier: 'సమర్పించిన పత్రాల పరిశీలన',
    tabFieldReport: 'గ్రామ రెవెన్యూ అధికారి (VRO) క్షేత్ర నివేదిక',
    tabInteractiveAi: 'అధికారి AI సంభాషణ (Q&A)',

    // AI Co-Pilot Tab
    aiSummaryTitle: 'దరఖాస్తుపై AI సారాంశ నివేదిక',
    verificationMatrixTitle: 'పత్రాల స్వయంచాలక సరిపోలిక నివేదిక (Audit Matrix)',
    discrepanciesTitle: 'గుర్తించిన వ్యత్యాసాలు మరియు లోపాలు',
    aiRecommendationTitle: 'AI సిఫార్సు మరియు చట్టబద్ధమైన కారణాలు',
    legalReference: 'చట్టబద్ధమైన ఉత్తర్వు / జీవో (G.O. Reference)',
    confidenceBadge: 'విశ్వసనీయత స్కోరు',

    // Verification Matrix Columns
    colCheckItem: 'పరిశీలన అంశం',
    colDeclared: 'దరఖాస్తులో ప్రకటించిన వివరాలు',
    colVerifiedDB: 'ప్రభుత్వ డేటాబేస్ వివరాలు',
    colStatus: 'పరిశీలన ఫలితం',

    // Decision Console
    decisionConsoleTitle: 'అధికారి తుది నిర్ణయ వేదిక',
    decisionConsoleSubtitle:
      'గమనిక: కృత్రిమ మేధస్సు కేవలం సలహాదారు మాత్రమే; చట్టబద్ధమైన తుది నిర్ణయాధికారం పూర్తిగా సంబంధిత అధికారిదే.',
    officerRemarksLabel: 'అధికారి క్షేత్ర పరిశీలన మరియు ఆదేశాల నమోదు (Officer Remarks):',
    remarksPlaceholder: 'అధికారిక క్షేత్ర విచారణ గమనికలు లేదా ఉత్తర్వు వివరాలు నమోదు చేయండి...',
    quickRemarks: 'శీఘ్ర నివేదిక టెంప్లేట్లు:',
    btnApprove: 'మంజూరు చేయండి (Approve)',
    btnReject: 'తిరస్కరించండి (Reject)',
    btnReturn: 'పునఃసమీక్షకు పంపండి (Return)',
    btnRevert: 'నిర్ణయాన్ని పునఃపరిశీలించండి',

    // Official Endorsement Slip
    endorsementTitle: 'ప్రభుత్వ రెవెన్యూ శాఖ - అధికారిక పరిష్కార ఉత్తర్వు పత్రం',
    orderNo: 'ఎండార్స్‌మెంట్ ఉత్తర్వు సంఖ్య',
    decisionDate: 'పరిష్కార సమయం',
    officerSign: 'డిజిటల్ సంతకం',
    citizenSmsSent: 'పౌరునికి పంపిన SMS సందేశం:',
    btnPrint: 'ఉత్తర్వును ముద్రించండి (Print)',

    // Interactive AI Chat
    aiChatTitle: 'దరఖాస్తుపై AI సహాయకుడిని ప్రశ్నించండి',
    aiChatSubtitle:
      'ఈ దరఖాస్తు పత్రాలు, ఆదాయ పరిమితి, గడువు లేదా ప్రభుత్వ నిబంధనల గురించి ఏదైనా ప్రశ్న అడగండి.',
    askPlaceholder: "ఉదా: 'వార్షిక ఆదాయ పరిమితి సరిపోతుందా?' లేదా 'ఏ పత్రాలు లోపించాయి?'",
    btnAsk: 'అడగండి',
    presetQueriesTitle: 'సిఫార్సు చేసిన ప్రశ్నలు:',
    presetQueryIncome: 'ఆదాయ పరిమితి ప్రభుత్వ నిబంధనలకు అనుగుణంగా ఉందా?',
    presetQueryDocs: 'ఏ పత్రాలు లోపించాయి లేదా అస్పష్టంగా ఉన్నాయి?',
    presetQueryCaste: 'కుల రిజర్వేషన్ వర్గీకరణ సరిగ్గా ఉందా?',
    presetQuerySla: 'సేవా హక్కు గడువు (SLA) స్థితి ఏమిటి?',

    // Notification toast
    actionSuccess: 'చర్య విజయవంతంగా నమోదైంది',
    selectApplicationPrompt: 'పరిశీలించడానికి ఎడమవైపు జాబితా నుండి దరఖాస్తును ఎంచుకోండి.',
  },

  en: {
    // Header & Gov branding
    govState: 'Department of Revenue & Citizen Welfare Services',
    departmentName: 'MeeSeva & Ward Sachivalayam Portal',
    appTitle: 'Adhikari Mitra',
    appSubtitle: 'Revenue Officer AI Co-Pilot & Fast-Track Application Disposal',
    officerTitle: 'Revenue Inspector (RI / VRO)',
    officerName: 'Sri P. Suresh Varma',
    officeLocation: 'Bheemunipatnam Mandal, Visakhapatnam District',
    resetDemo: 'Reset Demo Data',
    languageSwitch: 'తెలుగు',

    // KPI Metrics
    metricTotalPending: 'Total Pending Applications',
    metricUrgentSla: 'Urgent Attention / SLA Risk',
    metricAiReady: 'AI Ready for Approval',
    metricDiscrepancy: 'Discrepancy / Return Queue',
    metricActionedToday: 'Actioned Today',

    // Queue / Filters
    queueHeading: 'Application Priority Queue',
    searchPlaceholder: 'Search by App No, Name, Village, Aadhaar...',
    filterAll: 'All Applications',
    filterUrgent: 'Urgent SLA (< 2 Days)',
    filterHighRisk: 'High Discrepancy',
    filterAiApproved: 'AI Pre-Cleared',

    // Status tabs
    tabPending: 'Pending Queue',
    tabApproved: 'Approved',
    tabRejected: 'Rejected',
    tabReturned: 'Returned to Citizen',

    // Services
    serviceAll: 'All Services',
    serviceCasteIncome: 'Caste & Income',
    servicePension: 'Old Age Pension (Aasara)',
    serviceCropLoss: 'Crop Loss Relief (e-Crop)',
    serviceMutation: 'Land Khata Mutation & 1B',
    serviceDisability: 'Disability Pension (SADAREM)',

    // Sort options
    sortLabel: 'Sort by:',
    sortSla: 'SLA Urgency (Days Left)',
    sortPriority: 'Priority Score (Highest)',
    sortDate: 'Application Date (Newest)',

    // Application Card details
    slaRemaining: 'days left',
    slaExpired: 'SLA Expired!',
    slaToday: 'Expires Today!',
    aiConfidence: 'Confidence',
    viewDetails: 'Review Dossier',

    // Application Detail View
    applicantProfile: 'Applicant Profile',
    applicationNo: 'Application Number',
    applicationDate: 'Application Date',
    serviceLabel: 'Service Requested',
    fatherHusbandName: 'Father / Husband Name',
    genderAge: 'Gender / Age',
    aadhaarNo: 'Aadhaar Number (e-KYC)',
    mobileNo: 'Mobile Number',
    address: 'Residential Address',
    villageHobli: 'Village & Mandal',

    // Tabs inside detail
    tabAiCoPilot: 'AI Co-Pilot Analysis',
    tabDossier: 'Document Dossier',
    tabFieldReport: 'Village Revenue Officer (VRO) Report',
    tabInteractiveAi: 'Officer AI Assistant (Q&A)',

    // AI Co-Pilot Tab
    aiSummaryTitle: 'AI Application Executive Brief',
    verificationMatrixTitle: 'Automated Cross-Verification Matrix',
    discrepanciesTitle: 'Detected Inconsistencies & Deficiencies',
    aiRecommendationTitle: 'AI Recommendation & Statutory Rationale',
    legalReference: 'Statute / Government Order Reference',
    confidenceBadge: 'Confidence Score',

    // Verification Matrix Columns
    colCheckItem: 'Audit Check',
    colDeclared: 'Claimed in Application',
    colVerifiedDB: 'Verified in Gov Databases',
    colStatus: 'Verification Result',

    // Decision Console
    decisionConsoleTitle: "Officer's Final Decision Workbench",
    decisionConsoleSubtitle:
      'Note: The AI acts solely as a decision-support co-pilot; the final statutory authority rests solely with the Officer.',
    officerRemarksLabel: 'Officer Field Inspection & Disposal Remarks:',
    remarksPlaceholder:
      "Enter officer's official notes, statutory citations, or inspection findings...",
    quickRemarks: 'Quick Remarks Templates:',
    btnApprove: 'Approve Application',
    btnReject: 'Reject Application',
    btnReturn: 'Return with Deficiency Memo',
    btnRevert: 'Revert / Re-evaluate Decision',

    // Official Endorsement Slip
    endorsementTitle: 'Department of Revenue - Official Disposal Order',
    orderNo: 'Endorsement Order No',
    decisionDate: 'Disposal Timestamp',
    officerSign: 'Digital Signature',
    citizenSmsSent: 'SMS Notification Dispatched to Citizen:',
    btnPrint: 'Print Official Order',

    // Interactive AI Chat
    aiChatTitle: 'Query AI Co-Pilot on this Case',
    aiChatSubtitle:
      'Ask anything about income thresholds, missing attachments, land holdings, or applicable Government Orders.',
    askPlaceholder: "e.g., 'Is the income within limit?' or 'What documents are missing?'",
    btnAsk: 'Ask Assistant',
    presetQueriesTitle: 'Suggested Questions:',
    presetQueryIncome: 'Is the income within statutory ceiling?',
    presetQueryDocs: 'Which documents are missing or defective?',
    presetQueryCaste: 'Is the caste classification substantiated?',
    presetQuerySla: 'What is the statutory SLA timeline and risk?',

    // Notification toast
    actionSuccess: 'Action successfully recorded',
    selectApplicationPrompt: 'Select an application from the queue to inspect details.',
  },
};
