export type Language = 'en' | 'ta';

export interface Translations {
  appName: string;
  tagline: string;
  home: string;
  schemes: string;
  chat: string;
  admin: string;
  languageSelect: string;
  searchPlaceholder: string;
  searchButton: string;
  allCategories: string;
  viewDetails: string;
  applyNow: string;
  officialWebsite: string;
  sourceDocument: string;
  checkEligibility: string;
  askSaarthi: string;
  clearChat: string;
  typeYourQuestion: string;
  suggestedQuestions: string;
  sourcesCited: string;
  pageNumber: string;
  verifiedOfficial: string;
  disclaimerText: string;
  disclaimerTitle: string;
  categories: {
    all: string;
    education: string;
    agriculture: string;
    womenChild: string;
    healthcare: string;
    employment: string;
    housing: string;
    financial: string;
    social: string;
  };
  schemeDetails: {
    overview: string;
    objectives: string;
    eligibility: string;
    benefits: string;
    requiredDocuments: string;
    checklistHint: string;
    applicationSteps: string;
    importantNotes: string;
    sourceReference: string;
  };
  adminSection: {
    title: string;
    subtitle: string;
    loginTitle: string;
    passwordPlaceholder: string;
    loginButton: string;
    logoutButton: string;
    uploadTitle: string;
    uploadDesc: string;
    docName: string;
    department: string;
    sourceUrl: string;
    uploadButton: string;
    documentsList: string;
    status: string;
    chunks: string;
    actions: string;
    delete: string;
    reprocess: string;
    noDocs: string;
    indexingSuccess: string;
    totalDocs: string;
    totalChunks: string;
    activeSchemes: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "SchemeSaarthi",
    tagline: "Government Schemes Made Simple – Understand in Your Own Language",
    home: "Home",
    schemes: "Explore Schemes",
    chat: "AI Saarthi Chat",
    admin: "Admin Portal",
    languageSelect: "Language",
    searchPlaceholder: "Search by scheme name, category, or benefit (e.g. Kisan, Scholarship, Housing)...",
    searchButton: "Search",
    allCategories: "All Categories",
    viewDetails: "View Scheme Details",
    applyNow: "Official Portal",
    officialWebsite: "Official Website",
    sourceDocument: "Source Document",
    checkEligibility: "Check Eligibility",
    askSaarthi: "Ask AI Assistant",
    clearChat: "Clear Chat",
    typeYourQuestion: "Ask a question about any government scheme in English or தமிழ்...",
    suggestedQuestions: "Popular Questions to Ask:",
    sourcesCited: "Official Citations & Sources",
    pageNumber: "Page",
    verifiedOfficial: "Verified Official Government Data",
    disclaimerTitle: "Official Information Notice",
    disclaimerText: "SchemeSaarthi provides information grounded strictly in official government gazettes, portals, and notifications. Always verify final application guidelines on the official department portal.",
    categories: {
      all: "All Schemes",
      education: "Education & Scholarships",
      agriculture: "Agriculture & Farmers",
      womenChild: "Women & Child Welfare",
      healthcare: "Healthcare & Insurance",
      employment: "Employment & Business",
      housing: "Housing & Urban Affairs",
      financial: "Financial Assistance",
      social: "Social Welfare & Pensions",
    },
    schemeDetails: {
      overview: "Scheme Overview",
      objectives: "Key Objectives",
      eligibility: "Eligibility Criteria",
      benefits: "Benefits & Financial Assistance",
      requiredDocuments: "Required Documents Checklist",
      checklistHint: "Tick off documents you have ready before applying online:",
      applicationSteps: "Step-by-Step Application Procedure",
      importantNotes: "Important Guidelines & Verification",
      sourceReference: "Official Verified Sources",
    },
    adminSection: {
      title: "SchemeSaarthi Document Admin",
      subtitle: "Ingest official government PDF gazettes and manage RAG knowledge vector store",
      loginTitle: "Administrator Access",
      passwordPlaceholder: "Enter admin secret key...",
      loginButton: "Authenticate",
      logoutButton: "Sign Out",
      uploadTitle: "Ingest New Government Scheme PDF",
      uploadDesc: "Upload official PDF document to extract text, compute Gemini vector embeddings, and store in pgvector.",
      docName: "Document Title",
      department: "Ministry / Department",
      sourceUrl: "Official Portal Source URL",
      uploadButton: "Process & Index PDF",
      documentsList: "Ingested Knowledge Documents",
      status: "Status",
      chunks: "Chunks",
      actions: "Actions",
      delete: "Delete",
      reprocess: "Re-index",
      noDocs: "No documents ingested yet. Upload an official PDF above.",
      indexingSuccess: "Document indexed successfully into vector store!",
      totalDocs: "Total Documents",
      totalChunks: "Knowledge Chunks",
      activeSchemes: "Active Schemes",
    },
  },
  ta: {
    appName: "திட்டம்சாரதி (SchemeSaarthi)",
    tagline: "அரசுத் திட்டங்கள் எளிதாக – உங்கள் தாய்மொழியில் அறிந்து கொள்ளுங்கள்",
    home: "முகப்பு",
    schemes: "திட்டங்கள்",
    chat: "AI சாரதி அரட்டை",
    admin: "நிர்வாகக் குழு",
    languageSelect: "மொழி",
    searchPlaceholder: "திட்டத்தின் பெயர் அல்லது துறையைத் தேடுங்கள் (எ.கா. கிசான், கல்வி உதவித்தொகை, வீடு)...",
    searchButton: "தேடு",
    allCategories: "அனைத்து பிரிவுகள்",
    viewDetails: "முழு விவரங்கள்",
    applyNow: "அதிகாரப்பூர்வ தளம்",
    officialWebsite: "அதிகாரப்பூர்வ இணையதளம்",
    sourceDocument: "ஆதார ஆவணம்",
    checkEligibility: "தகுதி அறிய",
    askSaarthi: "AI உதவியாளரிடம் கேட்க",
    clearChat: "அரட்டையை அழிக்க",
    typeYourQuestion: "அரசுத் திட்டங்கள் குறித்த உங்கள் கேள்வியை தமிழ் அல்லது ஆங்கிலத்தில் கேட்கவும்...",
    suggestedQuestions: "அடிக்கடி கேட்கப்படும் வினாக்கள்:",
    sourcesCited: "அதிகாரப்பூர்வ ஆதாரங்கள் & மேற்கோள்கள்",
    pageNumber: "பக்கம்",
    verifiedOfficial: "சரிபார்க்கப்பட்ட அதிகாரப்பூர்வ அரசுத் தகவல்",
    disclaimerTitle: "அதிகாரப்பூர்வ தகவல் அறிவிப்பு",
    disclaimerText: "திட்டம்சாரதி அதிகாரப்பூர்வ அரசாணை மற்றும் அரசு வலைதளங்களின் அடிப்படையில் மட்டுமே தகவல்களை வழங்குகிறது. விண்ணப்பிக்கும் முன் அதிகாரப்பூர்வ வலைதளத்தில் இறுதி விதிமுறைகளை சரிபார்க்கவும்.",
    categories: {
      all: "அனைத்து திட்டங்கள்",
      education: "கல்வி & உதவித்தொகை",
      agriculture: "வேளாண்மை & விவசாயிகள்",
      womenChild: "மகளிர் & குழந்தைகள் நலம்",
      healthcare: "சுகாதாரம் & மருத்துவக் காப்பீடு",
      employment: "வேலைவாய்ப்பு & தொழில்",
      housing: "வீட்டு வசதி",
      financial: "நிதியுதவி",
      social: "சமூக நலம் & ஓய்வூதியம்",
    },
    schemeDetails: {
      overview: "திட்டத்தின் மேலோட்டம்",
      objectives: "முக்கிய நோக்கங்கள்",
      eligibility: "தகுதி வரம்புகள்",
      benefits: "நன்மைகள் & நிதி உதவி",
      requiredDocuments: "தேவையான ஆவணங்களின் பட்டியல்",
      checklistHint: "விண்ணப்பிக்கும் முன் உங்களிடம் உள்ள ஆவணங்களை சரிபார்க்கவும்:",
      applicationSteps: "விண்ணப்பிக்கும் முறை (படிநிலைகள்)",
      importantNotes: "முக்கிய வழிகாட்டுதல்கள்",
      sourceReference: "அதிகாரப்பூர்வ ஆதாரங்கள்",
    },
    adminSection: {
      title: "திட்டம்சாரதி ஆவண நிர்வாகம்",
      subtitle: "அரசு PDF ஆவணங்களை பதிவேற்றி RAG அறிவுத் தளத்தை நிர்வகிக்கவும்",
      loginTitle: "நிர்வாகி உள்நுழைவு",
      passwordPlaceholder: "நிர்வாக கடவுச்சொல்லை உள்ளிடவும்...",
      loginButton: "உள்நுழைக",
      logoutButton: "வெளியேறு",
      uploadTitle: "புதிய அரசு திட்ட PDF ஆவணத்தைப் பதிவேற்றுக",
      uploadDesc: "உரையைப் பிரித்தெடுக்க, ஜெமினி வெக்டர் உருவாக்க, மற்றும் pgvector-ல் சேமிக்க PDF ஆவணத்தைப் பதிவேற்றவும்.",
      docName: "ஆவணத்தின் பெயர்",
      department: "அமைச்சகம் / துறை",
      sourceUrl: "அதிகாரப்பூர்வ இணைய முகவரி (URL)",
      uploadButton: "PDF-ஐ ஆய்வு செய்து சேமி",
      documentsList: "சேமிக்கப்பட்ட ஆவணங்கள்",
      status: "நிலை",
      chunks: "பிரிவுகள்",
      actions: "செயல்கள்",
      delete: "நீக்கு",
      reprocess: "மீண்டும் உருவாக்கு",
      noDocs: "இதுவரை ஆவணங்கள் பதிவேற்றப்படவில்லை. மேலே புதிய PDF-ஐ சேர்க்கவும்.",
      indexingSuccess: "ஆவணம் வெற்றிகரமாக அறிவுத் தளத்தில் சேர்க்கப்பட்டது!",
      totalDocs: "மொத்த ஆவணங்கள்",
      totalChunks: "அறிவுப் பிரிவுகள்",
      activeSchemes: "செயலில் உள்ள திட்டங்கள்",
    },
  },
};
