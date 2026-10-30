export interface Scheme {
  id: string;
  slug: string;
  category: 'education' | 'agriculture' | 'womenChild' | 'healthcare' | 'employment' | 'housing' | 'financial' | 'social';
  title_en: string;
  title_ta: string;
  short_description_en: string;
  short_description_ta: string;
  department_en: string;
  department_ta: string;
  objectives_en: string[];
  objectives_ta: string[];
  eligibility_en: string[];
  eligibility_ta: string[];
  benefits_en: string[];
  benefits_ta: string[];
  documents_required_en: string[];
  documents_required_ta: string[];
  application_steps_en: string[];
  application_steps_ta: string[];
  important_notes_en: string[];
  important_notes_ta: string[];
  official_url: string;
  source_doc_name: string;
  is_verified: boolean;
}

export const SCHEMES: Scheme[] = [
  {
    id: "pm-kisan",
    slug: "pm-kisan-samman-nidhi",
    category: "agriculture",
    title_en: "PM Kisan Samman Nidhi",
    title_ta: "பிரதமர் கிசான் சம்மான் நிதி",
    short_description_en: "Direct financial support of ₹6,000 per year in 3 equal installments to small and marginal farmer families.",
    short_description_ta: "விவசாய குடும்பங்களுக்கு ஆண்டுக்கு ₹6,000 மூன்று சம தவணைகளாக (தலா ₹2,000) நேரடி வங்கி பரிமாற்றம்.",
    department_en: "Ministry of Agriculture and Farmers Welfare, Govt of India",
    department_ta: "வேளாண்மை மற்றும் விவசாயிகள் நல அமைச்சகம், இந்திய அரசு",
    objectives_en: [
      "Supplement the financial needs of landholding farmers in procuring inputs related to agriculture and allied activities.",
      "Protect farmers from falling into the hands of moneylenders for managing farming expenses.",
      "Ensure timely cash flow directly transferred to Aadhaar-seeded bank accounts."
    ],
    objectives_ta: [
      "விவசாயிகளுக்கு தேவையான உரம், விதை வாங்குவதற்கான நிதி தேவையை பூர்த்தி செய்தல்.",
      "கடன் கொடுப்போரிடம் சிக்காமல் விவசாயிகளைப் பாதுகாத்தல்.",
      "நேரடியாக வங்கிக் கணக்கில் சரியான நேரத்தில் நிதி கிடைப்பதை உறுதி செய்தல்."
    ],
    eligibility_en: [
      "All landholding farmer families having cultivable landholding in their names.",
      "Aadhaar card mandatory and seeded with active bank account.",
      "Exclusions: Institutional landholders, constitutional post holders, current/former MPs/MLAs, serving or retired government employees (except Group D/Multi Tasking Staff), income tax payers in the previous assessment year, professionals like doctors, engineers, lawyers, CA."
    ],
    eligibility_ta: [
      "தங்கள் பெயரில் சாகுபடி செய்யக்கூடிய நிலம் வைத்துள்ள அனைத்து விவசாய குடும்பங்கள்.",
      "ஆதார் அட்டை கட்டாயம் மற்றும் அது வங்கிக் கணக்குடன் இணைக்கப்பட்டிருக்க வேண்டும்.",
      "விலக்குகள்: அரசு ஊழியர்கள், வருமான வரி செலுத்துபவர்கள், முன்னாள்/தற்போதைய மக்கள் பிரதிநிதிகள் மற்றும் தொழில்முறை மருத்துவர்கள்/வழக்கறிஞர்கள் தகுதியற்றவர்கள்."
    ],
    benefits_en: [
      "Financial assistance of ₹6,000 per year directly transferred to bank account.",
      "Paid in 3 equal installments of ₹2,000 every 4 months (April-July, August-November, December-March).",
      "100% centrally sponsored scheme with zero intermediary involvement."
    ],
    benefits_ta: [
      "ஆண்டுக்கு ₹6,000 நிதி உதவி நேரடியாக வங்கிக் கணக்கில் செலுத்தப்படும்.",
      "ஒவ்வொரு 4 மாதங்களுக்கும் ஒருமுறை ₹2,000 வீதம் 3 தவணைகளில் வரவு வைக்கப்படும்.",
      "இடைத்தரகர்கள் இன்றி 100% மத்திய அரசால் நேரடியாக நிர்வகிக்கப்படுகிறது."
    ],
    documents_required_en: [
      "Aadhaar Card of the applicant",
      "Land Ownership Documents (Pattadhar Passbook / RoR / Khasra)",
      "Bank Account details seeded with Aadhaar and active NPCI mapping",
      "Valid Mobile number linked with Aadhaar for e-KYC"
    ],
    documents_required_ta: [
      "விண்ணப்பதாரரின் ஆதார் அட்டை",
      "நில உரிமை ஆவணங்கள் (பட்டா / சிட்டா / நில உரிமை பதிவேடு)",
      "ஆதாருடன் இணைக்கப்பட்ட மற்றும் NPCI-ல் பதிவு செய்யப்பட்ட வங்கிக் கணக்கு",
      "e-KYC செய்வதற்கு ஆதாருடன் இணைக்கப்பட்ட தொலைபேசி எண்"
    ],
    application_steps_en: [
      "Visit the official portal at https://pmkisan.gov.in/",
      "Under 'Farmers Corner', click on 'New Farmer Registration'.",
      "Select Rural or Urban Farmer Registration, enter Aadhaar Number and Mobile Number, select State, and verify OTP.",
      "Fill in personal details, land records information (Survey number, Khasra/Khata number, area in hectares).",
      "Upload land document copy and submit. Complete mandatory biometric or OTP based e-KYC."
    ],
    application_steps_ta: [
      "https://pmkisan.gov.in/ என்ற அதிகாரப்பூர்வ வலைதளத்திற்குச் செல்லவும்.",
      "'Farmers Corner' பிரிவில் 'New Farmer Registration' என்பதைக் கிளிக் செய்யவும்.",
      "கிராமப்புறம் அல்லது நகர்ப்புறத்தை தேர்வு செய்து, ஆதார் மற்றும் தொலைபேசி எண்ணை பதிவிட்டு OTP பெறவும்.",
      "தனிநபர் விவரங்கள் மற்றும் நில ஆவண விவரங்களை (பட்டா எண், பரப்பளவு) உள்ளிடவும்.",
      "நில ஆவண நகலை பதிவேற்றி சமர்ப்பிக்கவும். தொடர்ந்து e-KYC-யை நிறைவு செய்யவும்."
    ],
    important_notes_en: [
      "e-KYC is mandatory for all registered PM-KISAN farmers to receive installments.",
      "Land records must be updated with the respective State Revenue portal.",
      "Beneficiary status can be tracked anytime on the official portal using mobile number or registration number."
    ],
    important_notes_ta: [
      "தவணைகளைப் பெற அனைத்து விவசாயிகளுக்கும் e-KYC கட்டாயமாக்கப்பட்டுள்ளது.",
      "நில ஆவணங்கள் மாநில வருவாய்த் துறையின் பதிவுகளில் பதிவு செய்யப்பட்டிருக்க வேண்டும்.",
      "பயனாளி நிலவரத்தை இணையதளத்தில் மொபைல் எண்ணை வைத்து அறிந்து கொள்ளலாம்."
    ],
    official_url: "https://pmkisan.gov.in/",
    source_doc_name: "PM-KISAN Operational Guidelines, Ministry of Agriculture & Farmers Welfare",
    is_verified: true
  },
  {
    id: "pm-scholarship",
    slug: "pm-scholarship-scheme",
    category: "education",
    title_en: "Prime Minister's Scholarship Scheme (PMSS)",
    title_ta: "பிரதமரின் கல்வி உதவித்தொகை திட்டம் (PMSS)",
    short_description_en: "Higher technical and professional education scholarship for dependent wards & widows of ex-servicemen, ex-coast guard, and CAPF personnel.",
    short_description_ta: "முன்னாள் ராணுவத்தினர், துணை ராணுவப் படை மற்றும் கடலோரக் காவல் படை வீரர்களின் வாரிசுகளுக்கு உயர் கல்வி உதவித்தொகை.",
    department_en: "Kendriya Sainik Board / Welfare and Rehabilitation Board, Ministry of Defence / MHA",
    department_ta: "மத்திய சைனிக் வாரியம் / உள்துறை அமைச்சகம், இந்திய அரசு",
    objectives_en: [
      "Promote higher technical and professional degree education among dependents of military, paramilitary, and police martyrs/ex-personnel.",
      "Encourage girl child education by providing higher financial assistance.",
      "Assist in technical courses recognized by regulatory bodies like AICTE, UGC, MCI."
    ],
    objectives_ta: [
      "ராணுவ வீரர்கள் மற்றும் தியாகிகளின் வாரிசுகளுக்கு தொழில்முறை மற்றும் உயர்கல்வியை ஊக்குவித்தல்.",
      "பெண் குழந்தைகளுக்கு கூடுதல் நிதியுதவி வழங்கி அவர்களின் கல்வியை மேம்படுத்துதல்.",
      "அரசு அங்கீகாரம் பெற்ற AICTE, UGC, மருத்துவப் படிப்புகளுக்கு நிதியுதவி வழங்குதல்."
    ],
    eligibility_en: [
      "Wards and widows of deceased/disabled Ex-Servicemen (ESM) / Ex-Coast Guard / CAPF / Assam Rifles personnel.",
      "Minimum 60% marks in Minimum Entry Qualification (MEQ) like 10+2 / Diploma / Graduation.",
      "Applicable for first professional degree courses only (e.g. BE, B.Tech, MBBS, BDS, MBA, MCA, B.Pharm) recognized by statutory councils.",
      "Master Degree Courses are not eligible except MBA/MCA."
    ],
    eligibility_ta: [
      "மறைந்த அல்லது ஊனமுற்ற முன்னாள் ராணுவ/துணை ராணுவ வீரர்களின் குழந்தைகள் மற்றும் விதவைகள்.",
      "12-ஆம் வகுப்பு அல்லது பட்டயப் படிப்பில் குறைந்தபட்சம் 60% மதிப்பெண்கள் பெற்றிருக்க வேண்டும்.",
      "அங்கீகரிக்கப்பட்ட முதல் தொழில்முறை பட்டப்படிப்புகளுக்கு (BE, B.Tech, MBBS, B.Pharm) மட்டுமே பொருந்தும்.",
      "இரண்டாவது பட்டப்படிப்பு அல்லது தொலைதூரக் கல்விக்கு இது பொருந்தாது."
    ],
    benefits_en: [
      "₹3,000 per month for Girls (₹36,000 per annum).",
      "₹2,500 per month for Boys (₹30,000 per annum).",
      "Paid annually directly to the student's individual bank account via DBT for the entire course duration (1 to 5 years)."
    ],
    benefits_ta: [
      "மாணவிகளுக்கு மாதம் ₹3,000 (ஆண்டுக்கு ₹36,000).",
      "மாணவர்களுக்கு மாதம் ₹2,500 (ஆண்டுக்கு ₹30,000).",
      "படிப்பு முடியும் காலம் வரை (1 முதல் 5 ஆண்டுகள்) ஆண்டுதோறும் நேரடியாக வங்கிக் கணக்கில் செலுத்தப்படும்."
    ],
    documents_required_en: [
      "Ex-Servicemen / Ex-CAPF discharge certificate / PPO / ESM Identity Card",
      "Mark sheet of MEQ (10+2 / Diploma / Graduation)",
      "Bonafide certificate issued by the college/institute registrar or principal",
      "Bank passbook copy with Aadhaar seeded account number and IFSC",
      "Annexure-1 certificate signed by Zila Sainik Board / competent authority"
    ],
    documents_required_ta: [
      "முன்னாள் படைவீரர் சான்றிதழ் / PPO / அடையாள அட்டை",
      "12-ஆம் வகுப்பு அல்லது முந்தைய தேர்வு மதிப்பெண் சான்றிதழ்",
      "கல்லூரியில் பயில்வதற்கான Bonafide சான்றிதழ்",
      "ஆதாருடன் இணைக்கப்பட்ட வங்கிக் கணக்கு புத்தக நகல்",
      "மாவட்ட சைனிக் நல அலுவலர் கையொப்பமிட்ட சான்றிதழ்"
    ],
    application_steps_en: [
      "Visit National Scholarship Portal (NSP) at https://scholarships.gov.in/ or KSB portal at https://ksb.gov.in/",
      "Register with One-Time Registration (OTR) using Aadhaar.",
      "Select Prime Minister's Scholarship Scheme under Ministry of Defence / MHA.",
      "Fill personal, academic, ESM parent service details, and bank account information.",
      "Upload required certificates and submit. Institute verification and District Sainik Board verification will follow."
    ],
    application_steps_ta: [
      "https://scholarships.gov.in/ அல்லது https://ksb.gov.in/ என்ற தளத்திற்குச் செல்லவும்.",
      "ஆதார் மூலம் OTR (One Time Registration) பதிவை நிறைவு செய்யவும்.",
      "PMSS உதவித்தொகை திட்டத்தை தேர்வு செய்யவும்.",
      "மாணவர் விவரங்கள், மதிப்பெண்கள், பெற்றோரின் ராணுவப் பணி விவரங்களை உள்ளிடவும்.",
      "சான்றிதழ்களை பதிவேற்றி விண்ணப்பத்தை சமர்ப்பிக்கவும். கல்லூரி மற்றும் மாவட்ட சைனிக் வாரியம் அதை சரிபார்க்கும்."
    ],
    important_notes_en: [
      "Applications must be renewed annually with minimum 50% marks in each subsequent year.",
      "Distance education courses are not covered under PMSS.",
      "Only two children per ex-serviceman family can receive this scholarship."
    ],
    important_notes_ta: [
      "ஒவ்வொரு ஆண்டும் புதுப்பிக்க முந்தைய தேர்வில் குறைந்தது 50% மதிப்பெண் பெற வேண்டும்.",
      "ஒரு குடும்பத்தில் அதிகபட்சம் இரண்டு குழந்தைகளுக்கு மட்டுமே இந்த உதவித்தொகை கிடைக்கும்.",
      "அஞ்சல் வழி கல்விக்கு இத்திட்டம் பொருந்தாது."
    ],
    official_url: "https://ksb.gov.in/pm-scholarship-scheme.htm",
    source_doc_name: "PMSS Revised Guidelines, Kendriya Sainik Board, Ministry of Defence",
    is_verified: true
  },
  {
    id: "ayushman-bharat",
    slug: "ayushman-bharat-pm-jay",
    category: "healthcare",
    title_en: "Ayushman Bharat PM-JAY",
    title_ta: "ஆயுஷ்மான் பாரத் - பிரதம மந்திரி மக்கள் ஆரோக்கிய திட்டம்",
    short_description_en: "World's largest government-funded health assurance scheme providing ₹5 lakh health cover per family per year for secondary and tertiary care.",
    short_description_ta: "குடும்பத்திற்கு ஆண்டுக்கு ₹5 லட்சம் வரை கட்டணமில்லா மருத்துவ சிகிச்சை வழங்கும் உலகின் மிகப்பெரிய மருத்துவக் காப்பீட்டுத் திட்டம்.",
    department_en: "National Health Authority (NHA), Ministry of Health and Family Welfare",
    department_ta: "தேசிய சுகாதார ஆணையம், சுகாதார மற்றும் குடும்ப நல அமைச்சகம்",
    objectives_en: [
      "Provide financial protection against catastrophic health expenses.",
      "Ensure cashless and paperless access to quality healthcare in public and private empaneled hospitals across India.",
      "Cover over 12 crore poor and vulnerable families based on deprivation criteria."
    ],
    objectives_ta: [
      "திடீர் மருத்துவ செலவுகளினால் குடும்பங்கள் வறுமையில் தள்ளப்படுவதைத் தடுத்தல்.",
      "அங்கீகரிக்கப்பட்ட அரசு மற்றும் தனியார் மருத்துவமனைகளில் பணமில்லா சிகிச்சை வழங்குதல்.",
      "நாடு முழுவதும் 12 கோடிக்கும் மேற்பட்ட எளிய குடும்பங்களுக்கு மருத்துவப் பாதுகாப்பு உறுதி செய்தல்."
    ],
    eligibility_en: [
      "Families listed under the Socio-Economic Caste Census (SECC 2011) database for rural (D1-D7 criteria) and urban occupational categories.",
      "Active Rashtriya Swasthya Bima Yojana (RSBY) beneficiary families.",
      "All senior citizens aged 70 and above, regardless of income (expanded under Ayushman Vaya Vandana Card).",
      "No restriction on family size, age, or gender."
    ],
    eligibility_ta: [
      "SECC 2011 கணக்கெடுப்பில் பட்டியலிடப்பட்ட ஏழை கிராமப்புற மற்றும் நகர்ப்புற குடும்பங்கள்.",
      "70 வயது மற்றும் அதற்கு மேற்பட்ட அனைத்து மூத்த குடிமக்கள் (வருமான வரம்பு ஏதுமின்றி).",
      "குடும்ப உறுப்பினர் எண்ணிக்கை அல்லது வயது வரம்பு குறித்த எந்த தடையும் இல்லை."
    ],
    benefits_en: [
      "Health cover of ₹5,00,000 per family per year on a family floater basis.",
      "Cashless access to treatment for over 1,949 medical and surgical procedures.",
      "Pre-existing conditions covered from day one of enrollment.",
      "Covers 3 days of pre-hospitalization and 15 days of post-hospitalization expenses including medicines and diagnostics."
    ],
    benefits_ta: [
      "ஆண்டுக்கு ஒரு குடும்பத்திற்கு ₹5,00,000 வரை மருத்துவ சிகிச்சை காப்பீடு.",
      "1,949-க்கும் மேற்பட்ட மருத்துவ மற்றும் அறுவை சிகிச்சை முறைகளுக்கு பணமில்லா சிகிச்சை.",
      "சேர்ந்த முதல் நாளிலிருந்தே ஏற்கனவே உள்ள நோய்களுக்கும் சிகிச்சை கிடைக்கும்.",
      "மருத்துவமனையில் சேருவதற்கு முந்தைய 3 நாட்கள் மற்றும் டிஸ்சார்ஜ் ஆன பின் 15 நாட்களுக்கான மருந்து செலவுகளும் அடங்கும்."
    ],
    documents_required_en: [
      "Aadhaar Card or Ration Card for identity and family linkage",
      "Ration Card / SECC Household ID / PM-JAY Letter",
      "Active Mobile number for OTP generation at hospital Ayushman Mitra desk"
    ],
    documents_required_ta: [
      "ஆதார் அட்டை அல்லது குடும்ப அட்டை (ரேஷன் கார்டு)",
      "PM-JAY கடிதம் அல்லது குடும்ப அடையாள எண்",
      "OTP சரிபார்ப்புக்கு செல்லுபடியாகும் கைபேசி எண்"
    ],
    application_steps_en: [
      "Check eligibility at https://beneficiary.nha.gov.in/ or download the Ayushman App.",
      "Search by Aadhaar number, Ration Card number, or PMJAY ID.",
      "Authenticate with Aadhaar OTP or visit nearest Common Service Centre (CSC) or empaneled hospital.",
      "The 'Ayushman Mitra' at the hospital helps verify details and issue the golden Ayushman Card instantly.",
      "Show the card at any empaneled hospital nationwide for cashless treatment."
    ],
    application_steps_ta: [
      "https://beneficiary.nha.gov.in/ என்ற தளத்தில் அல்லது Ayushman செயலியில் தகுதியை சரிபார்க்கவும்.",
      "ஆதார் எண் அல்லது ரேஷன் கார்டு எண்ணை உள்ளிட்டு தேடவும்.",
      "ஆதார் OTP அல்லது அருகில் உள்ள இ-சேவை மையம் (CSC) அல்லது மருத்துவமனையில் கைரேகை மூலம் சரிபார்க்கவும்.",
      "மருத்துவமனையில் உள்ள 'ஆயுஷ்மான் மித்ரா' உங்களுக்கு Ayushman கார்டை வழங்குவார்.",
      "நாடு முழுவதும் அங்கீகரிக்கப்பட்ட எந்த மருத்துவமனையிலும் இக்கார்டைக் காட்டி சிகிச்சை பெறலாம்."
    ],
    important_notes_en: [
      "PM-JAY is completely free of cost; no fee is charged for issuing the card or treatment.",
      "Card is portable and valid across all empaneled hospitals throughout India.",
      "Beware of fraudulent websites charging money for card creation."
    ],
    important_notes_ta: [
      "இத்திட்டம் முற்றிலும் இலவசம்; கார்டு பெறுவதற்கோ அல்லது சிகிச்சைக்கோ கட்டணம் செலுத்த தேவையில்லை.",
      "இந்த அட்டை நாடு முழுவதும் உள்ள அனைத்து அங்கீகரிக்கப்பட்ட மருத்துவமனைகளிலும் செல்லுபடியாகும்."
    ],
    official_url: "https://pmjay.gov.in/",
    source_doc_name: "PM-JAY Guidelines, National Health Authority (NHA)",
    is_verified: true
  },
  {
    id: "pudhumai-penn",
    slug: "moovalur-ramamirtham-pudhumai-penn",
    category: "education",
    title_en: "Moovalur Ramamirtham Ammaiyar Pudhumai Penn Scheme",
    title_ta: "மூவலூர் ராமாமிர்தம் அம்மையார் புதுமைப் பெண் திட்டம்",
    short_description_en: "Tamil Nadu Government scheme providing ₹1,000 monthly financial assistance to girl students pursuing undergraduate higher education.",
    short_description_ta: "அரசுப் பள்ளிகளில் பயின்று உயர்கல்வி பயிலும் மாணவிகளுக்கு மாதம் ₹1,000 வழங்கும் தமிழ்நாடு அரசின் முன்னோடித் திட்டம்.",
    department_en: "Social Welfare and Women Empowerment Department, Government of Tamil Nadu",
    department_ta: "சமூக நலம் மற்றும் மகளிர் உரிமைத் துறை, தமிழ்நாடு அரசு",
    objectives_en: [
      "Prevent girl student dropouts after 12th standard and boost female enrollment in higher education.",
      "Eliminate child marriages by encouraging financial independence and degrees for young women.",
      "Empower women to attain economic and social parity through professional and collegiate degrees."
    ],
    objectives_ta: [
      "12-ஆம் வகுப்பிற்குப் பிறகு மாணவிகள் படிப்பை கைவிடுவதைத் தடுத்து உயர்கல்வி சேர்க்கையை அதிகரித்தல்.",
      "இளம் பெண்கள் பட்டம் பெற்று சொந்த காலில் நிற்க உதவி குழந்தை திருமணங்களைத் தடுத்தல்.",
      "பெண்கள் பொருளாதார மற்றும் சமூக அதிகாரமடைவதை உறுதி செய்தல்."
    ],
    eligibility_en: [
      "Girl students who studied from 6th to 12th standard in Tamil Nadu Government schools.",
      "Students who studied from 6th to 8th in private schools under RTE and 9th to 12th in Government schools are also eligible.",
      "Enrolled in any recognized Undergraduate (UG) Degree, Diploma, ITI, Engineering, Medical, Agriculture, or Law course.",
      "No family income ceiling applies."
    ],
    eligibility_ta: [
      "தமிழ்நாடு அரசுப் பள்ளிகளில் 6 முதல் 12-ஆம் வகுப்பு வரை தொடர்ந்து பயின்ற மாணவிகள்.",
      "RTE சட்டத்தின் கீழ் 6 முதல் 8 வரை தனியார் பள்ளியிலும், 9 முதல் 12 வரை அரசுப் பள்ளியிலும் படித்தவர்களும் தகுதியுடையவர்கள்.",
      "அங்கீகரிக்கப்பட்ட கலை, அறிவியல், பொறியியல், பாலிடெக்னிக், மருத்துவம், தொழிற்பயிற்சி (ITI) படிப்புகளில் பயில வேண்டும்.",
      "குடும்ப வருமான வரம்பு எதுவும் கிடையாது."
    ],
    benefits_en: [
      "Financial assistance of ₹1,000 per month (₹12,000 per year) credited directly via DBT to the student's personal bank account.",
      "Assistance continues throughout the regular duration of the undergraduate/diploma course until completion.",
      "Eligible to receive this alongside other government merit scholarships and free bus pass."
    ],
    benefits_ta: [
      "மாணவியின் சொந்த வங்கிக் கணக்கில் மாதம் ₹1,000 (ஆண்டுக்கு ₹12,000) நேரடியாக செலுத்தப்படும்.",
      "படிப்பு முடியும் வரை (3 அல்லது 4 அல்லது 5 ஆண்டுகள்) தொடர்ந்து வழங்கப்படும்.",
      "இத்திட்டத்துடன் சேர்த்து மற்ற அரசு கல்வி உதவித்தொகைகளையும் பெற முடியும்."
    ],
    documents_required_en: [
      "School Transfer Certificate (TC) or Study Certificate proving 6th to 12th study in TN Govt schools with EMIS number",
      "Aadhaar Card of the girl student",
      "Bank Account Passbook in student's own name (Aadhaar linked)",
      "College Admission receipt and Identity Card"
    ],
    documents_required_ta: [
      "அரசுப் பள்ளியில் 6 முதல் 12 வரை படித்ததற்கான EMIS எண் கொண்ட பள்ளி மாற்றுச் சான்றிதழ் (TC) அல்லது படிப்புச் சான்று",
      "மாணவியின் ஆதார் அட்டை",
      "மாணவியின் பெயரிலான ஆதாருடன் இணைக்கப்பட்ட வங்கிக் கணக்கு புத்தகம்",
      "கல்லூரி சேர்க்கை ரசீது மற்றும் அடையாள அட்டை"
    ],
    application_steps_en: [
      "Applications are processed online through the designated college nodal officer portal at https://penkalvi.tn.gov.in/",
      "Students submit their EMIS number, Aadhaar number, and college registration details to the college nodal officer.",
      "Verification is conducted digitally against the school education EMIS database.",
      "Once approved, monthly disbursement is directly credited to student's bank account."
    ],
    application_steps_ta: [
      "மாணவிகள் பயிலும் கல்லூரியில் உள்ள திட்ட ஒருங்கிணைப்பு அலுவலர் (Nodal Officer) மூலமாக https://penkalvi.tn.gov.in/ தளத்தில் பதிவு செய்யப்படும்.",
      "மாணவிகள் தங்கள் EMIS எண், ஆதார், வங்கிக் கணக்கு விவரங்களை கல்லூரியில் சமர்ப்பிக்க வேண்டும்.",
      "பள்ளி கல்வித்துறையின் EMIS தரவுகளுடன் ஒப்பிட்டு கல்லூரி நிர்வாகம் சரிபார்க்கும்.",
      "ஒப்புதல் கிடைத்தவுடன் தொகை நேரடியாக வங்கிக்கு அனுப்பப்படும்."
    ],
    important_notes_en: [
      "Bank account must be in the student's own name and active with DBT/NPCI seeding.",
      "Discontinued students are not eligible for subsequent monthly payouts."
    ],
    important_notes_ta: [
      "வங்கிக் கணக்கு மாணவியின் பெயரில் மட்டுமே இருக்க வேண்டும் மற்றும் ஆதார் இணைப்பு அவசியம்.",
      "படிப்பை பாதியில் நிறுத்தும் மாணவர்களுக்கு உதவித்தொகை நிறுத்தப்படும்."
    ],
    official_url: "https://penkalvi.tn.gov.in/",
    source_doc_name: "G.O. (Ms) No. 46, Social Welfare & Women Empowerment Dept, Govt of Tamil Nadu",
    is_verified: true
  },
  {
    id: "magalir-urimai",
    slug: "kalaignar-magalir-urimai-thittam",
    category: "financial",
    title_en: "Kalaignar Magalir Urimai Thittam",
    title_ta: "கலைஞர் மகளிர் உரிமைத் திட்டம்",
    short_description_en: "Tamil Nadu basic income entitlement scheme providing ₹1,000 every month directly to female heads of eligible families.",
    short_description_ta: "குடும்பத் தலைவிகளின் உழைப்பை அங்கீகரித்து மாதம் ₹1,000 உரிமைத் தொகை வழங்கும் தமிழ்நாடு அரசின் வரலாற்றுச் சிறப்புமிக்க திட்டம்.",
    department_en: "Special Programme Implementation & Revenue Department, Government of Tamil Nadu",
    department_ta: "சிறப்புத் திட்ட செயலாக்கத் துறை மற்றும் வருவாய்த் துறை, தமிழ்நாடு அரசு",
    objectives_en: [
      "Recognize the unpaid lifetime labor and economic contribution of women heading households.",
      "Provide recurring social security and financial independence to low-income women.",
      "Improve nutrition, health, and dignity of mothers and female household heads."
    ],
    objectives_ta: [
      "குடும்ப தலைவிகளின் ஓய்வில்லா உழைப்பிற்கு மதிப்பளித்து அங்கீகரித்தல்.",
      "பெண்களுக்கு மாதாந்திர பொருளாதார பாதுகாப்பை வழங்கி அவர்களின் சுயமரியாதையை உயர்த்துதல்.",
      "குடும்பத்தில் பெண்களின் வாழ்க்கைத் தரத்தை மேம்படுத்துதல்."
    ],
    eligibility_en: [
      "Female head of household aged 21 years and above (born on or before cut-off date).",
      "Family annual income should not exceed ₹2.5 lakh per annum.",
      "Family wet land ownership must be less than 5 acres, or dry land less than 10 acres.",
      "Annual domestic electricity consumption should be below 3,600 units (300 units per month).",
      "Exclusions: Income tax filers, GST registered business owners, permanent government/PSU employees, institutional pension recipients."
    ],
    eligibility_ta: [
      "குடும்பத் தலைவிக்கு குறைந்தபட்சம் 21 வயது பூர்த்தியாகியிருக்க வேண்டும்.",
      "குடும்பத்தின் ஆண்டு வருமானம் ₹2.5 லட்சத்திற்குள் இருக்க வேண்டும்.",
      "குடும்பத்திற்கு 5 ஏக்கருக்கு குறைவான நன்செய் நிலம் அல்லது 10 ஏக்கருக்கு குறைவான புன்செய் நிலம் மட்டுமே இருக்க வேண்டும்.",
      "ஆண்டுக்கு 3,600 யூனிட்டுகளுக்கு குறைவாக மின்சாரம் பயன்படுத்துபவராக இருக்க வேண்டும்.",
      "வருமான வரி செலுத்துவோர், அரசு ஊழியர்கள், ஓய்வூதியம் பெறுபவர்கள் இதில் சேர முடியாது."
    ],
    benefits_en: [
      "₹1,000 financial entitlement transferred every month directly into the woman's bank account via DBT.",
      "Credited on the 15th of every month.",
      "Completely unconditional spending freedom for the woman to support household and personal needs."
    ],
    benefits_ta: [
      "மாதந்தோறும் ₹1,000 உரிமைத் தொகை நேரடியாக குடும்பத் தலைவியின் வங்கிக் கணக்கில் வரவு வைக்கப்படும்.",
      "ஒவ்வொரு மாதமும் 15-ஆம் தேதிக்குள் தொகை வங்கியில் செலுத்தப்படும்.",
      "குடும்பத்தின் அத்தியாவசிய தேவைகளுக்கு இந்த நிதியை பெண்கள் சுதந்திரமாக பயன்படுத்தலாம்."
    ],
    documents_required_en: [
      "Smart Family Card (Ration Card) of Tamil Nadu",
      "Aadhaar Card of the female applicant",
      "Bank Account details seeded with Aadhaar",
      "Electricity consumer connection number (EB bill)"
    ],
    documents_required_ta: [
      "தமிழ்நாடு மின்னணு குடும்ப அட்டை (ஸ்மார்ட் ரேஷன் கார்டு)",
      "குடும்பத் தலைவியின் ஆதார் அட்டை",
      "ஆதாருடன் இணைக்கப்பட்ட வங்கிக் கணக்கு புத்தகம்",
      "வீட்டு மின் இணைப்பு நுகர்வோர் எண் (EB அட்டை)"
    ],
    application_steps_en: [
      "Application forms and tokens are distributed at fair price shops (ration shops) / special camps.",
      "Fill out the biometric registration form with family card, Aadhaar, and bank details.",
      "Visit designated special camp at the ration shop location with documents.",
      "Camp officer records biometric verification and uploads application to the portal.",
      "Field verification is done if required and status can be tracked via https://kmut.tn.gov.in/."
    ],
    application_steps_ta: [
      "நியாயவிலைக் கடைகள் மூலம் விண்ணப்பப் படிவம் மற்றும் டோக்கன் விநியோகிக்கப்படும்.",
      "குடும்ப அட்டை, ஆதார், வங்கிக் கணக்கு மற்றும் மின் இணைப்பு விவரங்களை பூர்த்தி செய்யவும்.",
      "குறிப்பிட்ட நாளில் நியாயவிலைக் கடைகளில் நடைபெறும் சிறப்பு முகாமிற்கு நேரில் செல்லவும்.",
      "அங்குள்ள அலுவலர் கைரேகை பதிவு செய்து இணையத்தில் விண்ணப்பத்தை பதிவேற்றுவார்.",
      "தகுதியை https://kmut.tn.gov.in/ தளத்தில் அல்லது இ-சேவை மையத்தில் அறிந்து கொள்ளலாம்."
    ],
    important_notes_en: [
      "Only one female head per family card is eligible.",
      "In case of single men heading cards, they may be considered under special cases if verified.",
      "Appeals for rejected applications can be submitted at the Revenue Divisional Officer (RDO) office or via e-Seva."
    ],
    important_notes_ta: [
      "ஒரு குடும்ப அட்டைக்கு ஒரு பெண் மட்டுமே விண்ணப்பிக்க முடியும்.",
      "நிராகரிக்கப்பட்டவர்கள் வருவாய் கோட்டாட்சியரிடம் (RDO) அல்லது இ-சேவை மையம் மூலம் மேல்முறையீடு செய்யலாம்."
    ],
    official_url: "https://kmut.tn.gov.in/",
    source_doc_name: "Kalaignar Magalir Urimai Thittam Guidelines, Special Programme Implementation Dept",
    is_verified: true
  },
  {
    id: "sukanya-samriddhi",
    slug: "sukanya-samriddhi-yojana",
    category: "womenChild",
    title_en: "Sukanya Samriddhi Yojana (SSY)",
    title_ta: "சுகன்யா சம்ரிதி யோஜனா (செல்வமகள் சேமிப்புத் திட்டம்)",
    short_description_en: "High-interest government-backed small savings scheme for girl children with triple tax exemption (EEE) under Beti Bachao Beti Padhao.",
    short_description_ta: "பெண் குழந்தைகளின் எதிர்கால படிப்பு மற்றும் திருமண செலவுகளுக்காக அதிக வட்டி வழங்கும் அஞ்சலக சேமிப்புத் திட்டம்.",
    department_en: "Department of Posts / Department of Economic Affairs, Ministry of Finance",
    department_ta: "அஞ்சல் துறை / நிதி அமைச்சகம், இந்திய அரசு",
    objectives_en: [
      "Promote welfare of the girl child by fostering a disciplined long-term financial security fund.",
      "Address expenses related to higher education, marriage, and financial independence.",
      "Encourage parents to invest early for female children with sovereign guarantee and top tier interest rates."
    ],
    objectives_ta: [
      "பெண் குழந்தைகளின் எதிர்கால நலன் மற்றும் கல்விக்கு வலுவான நிதி ஆதாரத்தை உருவாக்குதல்.",
      "உயர்கல்வி மற்றும் திருமணத்திற்கான நிதிச் சுமையைக் குறைத்தல்.",
      "அரசு உத்திரவாதத்துடன் கூடிய அதிக வட்டி மற்றும் வரிச் சலுகையை வழங்குதல்."
    ],
    eligibility_en: [
      "Account can be opened by the natural or legal guardian in the name of a girl child.",
      "Girl child must be below the age of 10 years at the time of account opening.",
      "Only one account is permitted per girl child, and maximum of two accounts per family (with exception for twins/triplets)."
    ],
    eligibility_ta: [
      "பெற்றோர் அல்லது சட்டப்பூர்வ பாதுகாவலர் பெண் குழந்தையின் பெயரில் கணக்கு தொடங்கலாம்.",
      "கணக்கு தொடங்கும் போது பெண் குழந்தையின் வயது 10-க்குள் இருக்க வேண்டும்.",
      "ஒரு பெண் குழந்தைக்கு ஒரு கணக்கு மட்டுமே அனுமதிக்கப்படும்; ஒரு குடும்பத்தில் அதிகபட்சம் இரண்டு கணக்குகள் (இரட்டைக் குழந்தைகள் விதிவிலக்கு)."
    ],
    benefits_en: [
      "Attractive high interest rate (currently 8.2% per annum, compounded annually).",
      "Exempt-Exempt-Exempt (EEE) tax status: Tax deduction up to ₹1.5 lakh under 80C, tax-free interest, and tax-free maturity amount.",
      "Flexible deposit from minimum ₹250 to maximum ₹1,50,000 per financial year.",
      "Partial withdrawal of up to 50% allowed for higher education after girl child reaches 18 years of age or passes 10th standard."
    ],
    benefits_ta: [
      "அரசு சேமிப்பு திட்டங்களிலேயே மிக அதிக வட்டி (தற்போது 8.2% ஆண்டு வட்டி).",
      "பிரிவு 80C கீழ் ₹1.5 லட்சம் வரை வரி விலக்கு, மற்றும் முதிர்வுத் தொகைக்கும் வரி கிடையாது.",
      "ஆண்டுக்கு குறைந்தபட்சம் ₹250 முதல் அதிகபட்சம் ₹1,50,000 வரை சேமிக்கலாம்.",
      "குழந்தைக்கு 18 வயது பூர்த்தியானவுடன் உயர்கல்விக்காக 50% தொகையை எடுத்துக் கொள்ளலாம்."
    ],
    documents_required_en: [
      "Birth Certificate of the girl child",
      "Identity Proof (Aadhaar / PAN / Passport) of the parent/guardian",
      "Address Proof of the parent/guardian",
      "Passport-size photographs of guardian and child"
    ],
    documents_required_ta: [
      "பெண் குழந்தையின் பிறப்புச் சான்றிதழ்",
      "பெற்றோர் அல்லது பாதுகாவலரின் ஆதார் / பான் கார்டு",
      "முகவரி சான்று",
      "பாஸ்போர்ட் அளவு புகைப்படங்கள்"
    ],
    application_steps_en: [
      "Visit any post office or authorized commercial bank branch.",
      "Fill out the Sukanya Samriddhi Account Opening Form (Form-1).",
      "Attach girl child birth certificate, guardian's KYC documents, and initial deposit amount (minimum ₹250).",
      "Upon verification, the post office or bank issues a passbook containing account number, child name, and deposit schedule."
    ],
    application_steps_ta: [
      "அருகிலுள்ள தபால் நிலையம் அல்லது அங்கீகரிக்கப்பட்ட தேசியமயமாக்கப்பட்ட வங்கிக்குச் செல்லவும்.",
      "செல்வமகள் சேமிப்புத் திட்ட படிவத்தை (Form-1) பூர்த்தி செய்யவும்.",
      "குழந்தையின் பிறப்புச் சான்றிதழ், பெற்றோரின் ஆதார், முகவரி சான்று மற்றும் தொடக்கத் தொகை ₹250 செலுத்தவும்.",
      "விவரங்கள் சரிபார்க்கப்பட்டு பாஸ்புக் வழங்கப்படும்."
    ],
    important_notes_en: [
      "Deposits must be made for 15 years from the date of opening.",
      "Account matures after 21 years from the date of opening or upon marriage after reaching 18 years.",
      "Penalty of ₹50 per year applies if the minimum ₹250 deposit is not made in any financial year."
    ],
    important_notes_ta: [
      "கணக்கு தொடங்கியதிலிருந்து 15 ஆண்டுகள் வரை தொடர்ந்து பணம் செலுத்த வேண்டும்.",
      "கணக்கு தொடங்கி 21 ஆண்டுகள் கழித்து அல்லது 18 வயதுக்கு மேல் திருமணத்தின் போது முதிர்வடையும்.",
      "ஒரு நிதியாண்டில் குறைந்தபட்சம் ₹250 செலுத்தாவிட்டால் ₹50 அபராதம் விதிக்கப்படும்."
    ],
    official_url: "https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx",
    source_doc_name: "Sukanya Samriddhi Account Rules, Ministry of Finance Gazette Notification",
    is_verified: true
  },
  {
    id: "pm-awas",
    slug: "pradhan-mantri-awas-yojana",
    category: "housing",
    title_en: "Pradhan Mantri Awas Yojana (PMAY)",
    title_ta: "பிரதமர் ஆவாஸ் யோஜனா (அனைவருக்கும் வீடு திட்டம்)",
    short_description_en: "Flagship housing mission providing financial subsidy to build pucca houses with basic amenities for rural and urban poor.",
    short_description_ta: "ஏழை மற்றும் நடுத்தர குடும்பங்களுக்கு கான்கிரீட் வீடுகள் கட்டித்தர மத்திய அரசு வழங்கும் நிதியுதவி மற்றும் வட்டி மானியத் திட்டம்.",
    department_en: "Ministry of Housing and Urban Affairs / Ministry of Rural Development",
    department_ta: "வீட்டுவசதி மற்றும் நகர்ப்புற விவகாரங்கள் அமைச்சகம் / ஊரக வளர்ச்சி அமைச்சகம்",
    objectives_en: [
      "Provide pucca houses with water, sanitation, and electricity to all eligible homeless and families living in kutcha/dilapidated homes.",
      "Promote women empowerment by mandating female headship or co-ownership of the house.",
      "Offer interest subsidy through Credit Linked Subsidy Scheme (CLSS) for home loans."
    ],
    objectives_ta: [
      "வீடற்ற மற்றும் குடிசைகளில் வாழும் ஏழை குடும்பங்களுக்கு கான்கிரீட் வீடுகளை உறுதி செய்தல்.",
      "வீட்டுப் பட்டா அல்லது உரிமையில் பெண்களின் பெயரை கட்டாயமாக்குதல்.",
      "வீட்டுக் கடன்களுக்கு வட்டி மானியம் வழங்கி சுமையைக் குறைத்தல்."
    ],
    eligibility_en: [
      "Beneficiary family must not own a pucca house anywhere in India in the name of any family member.",
      "Economically Weaker Section (EWS) with annual income up to ₹3 lakh, or Low Income Group (LIG) with income between ₹3 to ₹6 lakh.",
      "Rural beneficiaries selected strictly based on SECC 2011 deprivation scores and Awaas+ survey list.",
      "Adult female membership in ownership is mandatory for EWS/LIG purchase/construction."
    ],
    eligibility_ta: [
      "இந்தியாவில் எங்கும் குடும்ப உறுப்பினர்கள் பெயரில் சொந்தமாக கான்கிரீட் வீடு இருக்கக் கூடாது.",
      "ஆண்டு வருமானம் ₹3 லட்சத்திற்குள் (EWS) அல்லது ₹3 முதல் ₹6 லட்சத்திற்குள் (LIG) இருக்க வேண்டும்.",
      "கிராமப்புறங்களில் SECC மற்றும் ஆவாஸ்+ கணக்கெடுப்பின்படி தேர்வு செய்யப்படுவார்கள்.",
      "வீட்டுப் பத்திரத்தில் குடும்பப் பெண்ணின் பெயர் கட்டாயமாக இருக்க வேண்டும்."
    ],
    benefits_en: [
      "Direct financial grant of ₹1.20 lakh in plain areas and ₹1.30 lakh in hilly/difficult areas under PMAY-Gramin.",
      "Additional ₹12,000 assistance for toilet construction under Swachh Bharat Mission (SBM).",
      "90-95 days of unskilled labor wages under MGNREGA (~₹25,000+).",
      "Subsidy up to ₹2.67 lakh on home loan interest under PMAY-Urban Credit Linked Subsidy Scheme."
    ],
    benefits_ta: [
      "கிராமப்புறங்களில் புதிய வீடு கட்ட ₹1.20 லட்சம் முதல் ₹1.30 லட்சம் வரை நேரடி அரசு மானியம்.",
      "தூய்மை பாரத திட்டத்தின் கீழ் கழிப்பறை கட்ட கூடுதலாக ₹12,000 உதவி.",
      "மகாத்மா காந்தி 100 நாள் வேலை திட்டத்தின் கீழ் 90 நாள் கூலித்தொகை (~₹25,000+).",
      "நகர்ப்புறங்களில் வீட்டுக் கடனுக்கான வட்டியில் ₹2.67 லட்சம் வரை மானியம்."
    ],
    documents_required_en: [
      "Aadhaar Card of all family members",
      "Land title / Patta / Land allotment order / No-Objection Certificate",
      "Income Certificate issued by Revenue Authority",
      "Bank Account details seeded with Aadhaar",
      "Photograph of existing kutcha house and geotagged site"
    ],
    documents_required_ta: [
      "அனைத்து குடும்ப உறுப்பினர்களின் ஆதார் அட்டை",
      "நிலத்தின் பட்டா / உரிமை ஆவணம் / தடையில்லாச் சான்றிதழ்",
      "வருமானச் சான்றிதழ்",
      "ஆதாருடன் இணைக்கப்பட்ட வங்கிக் கணக்கு புத்தகம்",
      "தற்போதைய குடிசை வீட்டின் புகைப்படம் மற்றும் இடத்தின் வரைபடம்"
    ],
    application_steps_en: [
      "For PMAY-Urban: Apply online via https://pmaymis.gov.in/ or through nearest Common Service Centre (CSC).",
      "For PMAY-Gramin: Beneficiaries are identified by Gram Sabha from Awaas+ list; contact Village Administrative Officer (VAO) or Block Development Office (BDO).",
      "Submit land ownership proof, Aadhaar, and family details.",
      "Physical geotagged verification is conducted at 4 stages (foundation, lintel, roof, completion) and funds are released in installments via DBT."
    ],
    application_steps_ta: [
      "நகர்ப்புறம்: https://pmaymis.gov.in/ தளத்தில் அல்லது இ-சேவை மையம் மூலம் விண்ணப்பிக்கலாம்.",
      "கிராமப்புறம்: கிராம சபை மூலம் ஆவாஸ்+ பட்டியலில் இருந்து தேர்வு செய்யப்படுவார்கள்; ஊராட்சி மன்ற அலுவலகத்தை அணுகவும்.",
      "நில உரிமை ஆவணங்கள் மற்றும் ஆதாரை சமர்ப்பிக்கவும்.",
      "அடித்தளம், மேற்கூரை உள்ளிட்ட 4 நிலைகளில் அதிகாரிகள் ஆய்வு செய்து தவணை வாரியாக வங்கிக்கு நிதி அனுப்புவர்."
    ],
    important_notes_en: [
      "Money is disbursed strictly in milestones based on geo-tagged photo proofs taken by government inspectors.",
      "No fees are payable to any agents or intermediaries; registration is monitored transparently online."
    ],
    important_notes_ta: [
      "கட்டுமான நிலைகளுக்கு ஏற்ப புகைப்பட ஆய்வு செய்யப்பட்டு தவணை முறையில் பணம் வழங்கப்படும்.",
      "இடைத்தரகர்களிடம் பணம் கொடுத்து ஏமாற வேண்டாம்; அரசு நேரடி வங்கி பரிவர்த்தனை செய்கிறது."
    ],
    official_url: "https://pmaymis.gov.in/",
    source_doc_name: "Pradhan Mantri Awas Yojana Guidelines, MoHUA & MoRD",
    is_verified: true
  },
  {
    id: "pm-mudra",
    slug: "pradhan-mantri-mudra-yojana",
    category: "employment",
    title_en: "Pradhan Mantri Mudra Yojana (PMMY)",
    title_ta: "பிரதமர் முத்ரா யோஜனா (சிறு தொழில் கடன் திட்டம்)",
    short_description_en: "Collateral-free business loans up to ₹20 lakh for non-corporate, non-farm small and micro enterprises.",
    short_description_ta: "சிறு வணிகர்கள், கடைக்காரர்கள் மற்றும் தொழில் முனைவோருக்கு பிணையில்லா ₹20 லட்சம் வரை தொழில் கடன் வழங்கும் திட்டம்.",
    department_en: "Department of Financial Services, Ministry of Finance",
    department_ta: "நிதிச் சேவைகள் துறை, நிதி அமைச்சகம், இந்திய அரசு",
    objectives_en: [
      "Fund the unfunded small enterprises by bringing formal financial credit to micro entrepreneurs.",
      "Support self-employment in manufacturing, trading, services, and allied agricultural activities.",
      "Eliminate collateral requirements and simplify loan sanction for grassroots job creators."
    ],
    objectives_ta: [
      "சிறு மற்றும் குறு தொழில் முனைவோருக்கு முறையான வங்கிக் கடன் கிடைக்கச் செய்தல்.",
      "உற்பத்தி, வர்த்தகம், சேவைத் துறைகளில் சுயதொழில் வாய்ப்புகளை பெருக்குதல்.",
      "எந்தவித அடமானமும் இல்லாமல் எளிய முறையில் கடனுதவி வழங்குதல்."
    ],
    eligibility_en: [
      "Any Indian citizen having a feasible business proposal for income-generating micro enterprise.",
      "Engaged in non-farm sector like manufacturing, processing, trading, services, artisan work, transport, shops.",
      "Must not be a defaulter to any bank or financial institution.",
      "Applicant must possess basic KYC and business premises proof."
    ],
    eligibility_ta: [
      "வருமானம் ஈட்டும் சொந்த தொழில் தொடங்கும் அல்லது விரிவாக்கும் இந்தியக் குடிமக்கள்.",
      "விவசாயம் சாராத உற்பத்தி, விற்பனை, சேவை, சிறு கடைகள் போன்ற தொழில்களுக்கு பொருந்தும்.",
      "வங்கிகளில் வாராக் கடன் அல்லது கடன் பாக்கி இல்லாதவராக இருக்க வேண்டும்."
    ],
    benefits_en: [
      "100% collateral-free loan with no security or third-party guarantee required.",
      "Three flexible tiers: Shishu (loans up to ₹50,000), Kishore (loans ₹50,000 to ₹5 lakh), Tarun (loans ₹5 lakh to ₹10 lakh, extended up to ₹20 lakh under Tarun Plus).",
      "Reasonable interest rates as per RBI guidelines with repayment period of 3 to 7 years.",
      "Mudra Debit Card provided for easy cash withdrawals and working capital management."
    ],
    benefits_ta: [
      "எந்தவித சொத்து அடமானமும் இல்லாமல் 100% பிணையில்லா கடன்.",
      "மூன்று நிலைகள்: சிசு (₹50,000 வரை), கிஷோர் (₹50,000 முதல் ₹5 லட்சம் வரை), தருண் (₹5 லட்சம் முதல் ₹20 லட்சம் வரை).",
      "3 முதல் 7 ஆண்டுகள் வரை திரும்ப செலுத்தும் எளிய கால அவகாசம்.",
      "வணிக தேவைக்கு பயன்படுத்த முத்ரா டெபிட் கார்டு வழங்கப்படும்."
    ],
    documents_required_en: [
      "Identity Proof (Aadhaar / Voter ID / Driving License / Passport)",
      "Residence Proof (Electricity bill / Ration card / Aadhaar)",
      "Proof of Business Enterprise (Udyam Registration / GST / Trade License)",
      "Bank Statement for the last 6 months",
      "Quotation of machinery/items to be purchased and project estimate"
    ],
    documents_required_ta: [
      "அடையாளச் சான்று (ஆதார் / வாக்காளர் அட்டை / பான் கார்டு)",
      "முகவரி சான்று (மின் கட்டண ரசீது / ரேஷன் கார்டு)",
      "தொழில் பதிவு சான்று (உத்யம் பதிவு / GST / வணிக உரிமம்)",
      "கடந்த 6 மாத கால வங்கி கணக்கு அறிக்கை (Bank Statement)",
      "வாங்க இருக்கும் உபகரணங்களின் விலைப்பட்டியல் (Quotation) மற்றும் திட்ட மதிப்பீடு"
    ],
    application_steps_en: [
      "Apply online via UdyamiMitra portal at https://www.udyamimitra.in/ or visit any public/private commercial bank, RRB, or NBFC.",
      "Choose the loan category (Shishu / Kishore / Tarun).",
      "Fill in personal, enterprise, and proposed project details.",
      "Upload business registration, KYC, and quotations.",
      "Bank scrutinizes application and sanctions loan without requiring collateral."
    ],
    application_steps_ta: [
      "https://www.udyamimitra.in/ தளத்தில் அல்லது நேரடியாக வங்கி கிளைகளில் விண்ணப்பிக்கலாம்.",
      "தொழிலின் தேவைக்கு ஏற்ப சிசு / கிஷோர் / தருண் கடனை தேர்வு செய்யவும்.",
      "தனிநபர் மற்றும் தொழில் விவரங்கள் அடங்கிய படிவத்தை பூர்த்தி செய்யவும்.",
      "ஆவணங்கள் மற்றும் உபகரண விலைப்பட்டியலை சமர்ப்பிக்கவும்.",
      "வங்கி மேலாளர் ஆய்வு செய்து பிணையின்றி கடன் அனுமதி வழங்குவார்."
    ],
    important_notes_en: [
      "No processing fee is charged for Shishu loans.",
      "Borrowers are advised never to pay commission to brokers or unauthorized agents."
    ],
    important_notes_ta: [
      "சிசு கடன்களுக்கு எந்தவித பரிசீலனைக் கட்டணமும் (Processing fee) கிடையாது.",
      "இடைத்தரகர்கள் யாரிடமும் பணம் கொடுக்க வேண்டாம்."
    ],
    official_url: "https://www.mudra.org.in/",
    source_doc_name: "PMMY Operational Guidelines, Department of Financial Services",
    is_verified: true
  },
  {
    id: "nsp-scholarships",
    slug: "national-scholarship-portal",
    category: "education",
    title_en: "National Scholarship Portal (Central Sector Schemes)",
    title_ta: "தேசிய கல்வி உதவித்தொகை தளம் (மத்திய அரசு திட்டங்கள்)",
    short_description_en: "Unified gateway for central, state, and UGC/AICTE scholarships for pre-matric, post-matric, and higher professional education students.",
    short_description_ta: "பள்ளி மற்றும் கல்லூரி மாணவர்களுக்கான மத்திய அரசின் பல்வேறு கல்வி உதவித்தொகைகளை ஒரே தளத்தில் வழங்கும் திட்டம்.",
    department_en: "Ministry of Electronics & IT / Ministry of Education / Ministry of Social Justice",
    department_ta: "மின்னணு & தகவல் தொழில்நுட்ப அமைச்சகம் / கல்வி அமைச்சகம்",
    objectives_en: [
      "Ensure timely disbursement of scholarships directly into beneficiary bank accounts without leaks.",
      "Provide a single common electronic application platform for over 100 central and state scholarship schemes.",
      "Promote higher education among SC, ST, OBC, minority, and economically weaker section students."
    ],
    objectives_ta: [
      "மாணவர்களுக்கு உரிய நேரத்தில் கல்வி உதவித்தொகை நேரிடையாக வங்கிக்கு செல்வதை உறுதி செய்தல்.",
      "100-க்கும் மேற்பட்ட அரசு உதவித்தொகை திட்டங்களை ஒரே தளத்தில் ஒருங்கிணைத்தல்.",
      "பிற்படுத்தப்பட்ட, தாழ்த்தப்பட்ட மற்றும் ஏழை எளிய மாணவர்களின் உயர்கல்வியை மேம்படுத்துதல்."
    ],
    eligibility_en: [
      "Students enrolled in government or recognized private schools, colleges, and universities.",
      "Pre-Matric (classes 1-10) and Post-Matric (class 11, 12, ITI, Diploma, UG, PG, Ph.D.).",
      "Family annual income limits range between ₹1.5 lakh to ₹2.5 lakh depending on specific scheme (SC/ST/OBC/Minority/General Merit).",
      "Minimum 50% to 60% marks in the preceding academic examination."
    ],
    eligibility_ta: [
      "அரசு மற்றும் அங்கீகரிக்கப்பட்ட கல்வி நிறுவனங்களில் பயிலும் மாணவ, மாணவிகள்.",
      "பள்ளி (1-10) மற்றும் கல்லூரி, பாலிடெக்னிக், தொழிற்பயிற்சி, பட்டப் படிப்புகள் பயில்பவர்கள்.",
      "குடும்ப ஆண்டு வருமானம் திட்டத்திற்கு ஏற்ப ₹1.5 லட்சம் முதல் ₹2.5 லட்சத்திற்குள் இருக்க வேண்டும்.",
      "முந்தைய ஆண்டு பொதுத் தேர்வில் குறைந்தபட்சம் 50% முதல் 60% மதிப்பெண்கள் பெற்றிருக்க வேண்டும்."
    ],
    benefits_en: [
      "Tuition fee waiver / reimbursement as per institutional actuals or scheme norms.",
      "Maintenance allowance ranging from ₹1,000 to ₹12,000+ per annum credited directly via DBT.",
      "Book grant and hostel allowance for professional and technical degree students."
    ],
    benefits_ta: [
      "கல்விக் கட்டண விலக்கு மற்றும் கட்டணத் திருப்பி அளிப்பு.",
      "மாதாந்திர பராமரிப்பு உதவித்தொகையாக ஆண்டுக்கு ₹1,000 முதல் ₹12,000+ வரை நேரடியாக வங்கிக்கு.",
      "தொழில்முறை கல்லூரி மாணவர்களுக்கு புத்தக உதவித்தொகை மற்றும் விடுதிக் கட்டண சலுகை."
    ],
    documents_required_en: [
      "Aadhaar Card of the student (OTR registration mandatory)",
      "Community / Caste Certificate issued by competent revenue authority",
      "Income Certificate issued by Revenue Tahsildar",
      "Previous Year Marks Marksheet",
      "Bonafide Student Certificate issued by Head of Institution",
      "Bank Account details seeded with Aadhaar"
    ],
    documents_required_ta: [
      "மாணவரின் ஆதார் அட்டை (OTR பதிவு அவசியம்)",
      "வருவாய்த் துறையால் வழங்கப்பட்ட சாதிச் சான்றிதழ்",
      "வட்டாட்சியர் வழங்கிய வருமானச் சான்றிதழ்",
      "முந்தைய ஆண்டு மதிப்பெண் சான்றிதழ்",
      "பள்ளி / கல்லூரி முதல்வரிடம் பெற்ற பயிலும் சான்றிதழ் (Bonafide)",
      "ஆதாருடன் இணைக்கப்பட்ட வங்கிக் கணக்கு புத்தகம்"
    ],
    application_steps_en: [
      "Visit National Scholarship Portal at https://scholarships.gov.in/.",
      "Complete One-Time Registration (NSP OTR) using Aadhaar and mobile face-authentication or OTP.",
      "Login with OTR ID, select eligible scheme based on category and course.",
      "Fill academic details, upload required certificates, and submit.",
      "Application is verified digitally by School/College Nodal Officer (L1) and District/State Officer (L2)."
    ],
    application_steps_ta: [
      "https://scholarships.gov.in/ என்ற தேசிய கல்வி உதவித்தொகை தளத்திற்குச் செல்லவும்.",
      "ஆதார் மற்றும் கைபேசி மூலம் OTR (One Time Registration) பதிவை முடிக்கவும்.",
      "OTR எண்ணை உள்ளிட்டு உள்நுழைந்து, உங்களுக்குப் பொருந்தும் உதவித்தொகை திட்டத்தை தேர்வு செய்யவும்.",
      "மதிப்பெண், கல்வி விவரங்களை உள்ளிட்டு சான்றிதழ்களை பதிவேற்றி சமர்ப்பிக்கவும்.",
      "முதலில் உங்கள் பள்ளி/கல்லூரி சரிபார்த்து பின்னர் மாவட்ட கல்வி அலுவலர் ஒப்புதல் அளிப்பார்."
    ],
    important_notes_en: [
      "Students cannot hold multiple central scholarships for the same course year.",
      "Bank account must be seeded with Aadhaar and mapped with NPCI to receive payment."
    ],
    important_notes_ta: [
      "ஒரே ஆண்டில் ஒன்றுக்கும் மேற்பட்ட மத்திய அரசு உதவித்தொகைகளை பெற முடியாது.",
      "பணம் பெற வங்கிக் கணக்கில் NPCI இணைப்பு செய்யப்பட்டிருக்க வேண்டும்."
    ],
    official_url: "https://scholarships.gov.in/",
    source_doc_name: "National Scholarship Portal User Manual and Direct Benefit Transfer Guidelines",
    is_verified: true
  },
  {
    id: "nsap-pension",
    slug: "national-social-assistance-programme",
    category: "social",
    title_en: "National Social Assistance Programme (NSAP)",
    title_ta: "தேசிய சமூக உதவித் திட்டம் (முதியோர் மற்றும் ஆதரவற்றோர் ஓய்வூதியம்)",
    short_description_en: "Social security pensions for elderly persons, widows, and persons with severe disabilities living below the poverty line.",
    short_description_ta: "வறுமைக்கோட்டிற்கு கீழ் வாழும் முதியவர்கள், விதவைகள் மற்றும் மாற்றுத்திறனாளிகளுக்கு மாதாந்திர சமூகப் பாதுகாப்பு ஓய்வூதியம்.",
    department_en: "Ministry of Rural Development, Govt of India & State Social Welfare Departments",
    department_ta: "ஊரக வளர்ச்சி அமைச்சகம் & சமூக நலம் மற்றும் சத்துணவு திட்டத் துறை",
    objectives_en: [
      "Ensure minimum economic security and dignified livelihood for destitute elderly, single women, and persons with disabilities.",
      "Deliver 100% targeted cash transfer directly to the most vulnerable citizens.",
      "Cover elderly above 60, widows aged 40-79, and persons with 80%+ severe disability."
    ],
    objectives_ta: [
      "ஆதரவற்ற முதியவர்கள், விதவைகள் மற்றும் மாற்றுத்திறனாளிகளுக்கு குறைந்தபட்ச வாழ்வாதாரத்தை உறுதி செய்தல்.",
      "எந்தவொரு உதவியுமற்ற ஏழை மக்களுக்கு மாதாந்திர சமூக ஓய்வூதியம் வழங்குதல்.",
      "60 வயதுக்கு மேற்பட்ட முதியோர் மற்றும் கைவிடப்பட்ட பெண்களின் கண்ணியமான வாழ்வை பேணுதல்."
    ],
    eligibility_en: [
      "Applicant must belong to a household living Below the Poverty Line (BPL) as per government criteria.",
      "Indira Gandhi National Old Age Pension Scheme (IGNOAPS): Age 60 years or above.",
      "Indira Gandhi National Widow Pension Scheme (IGNWPS): Widows aged 40 to 79 years.",
      "Indira Gandhi National Disability Pension Scheme (IGNDPS): Age 18 years and above with severe disability of 80% or multiple disabilities."
    ],
    eligibility_ta: [
      "விண்ணப்பதாரர் வறுமைக் கோட்டிற்கு கீழ் (BPL) வாழும் குடும்பத்தைச் சேர்ந்தவராக இருக்க வேண்டும்.",
      "முதியோர் ஓய்வூதியம்: 60 வயது அல்லது அதற்கு மேற்பட்டவராக இருக்க வேண்டும்.",
      "விதவை ஓய்வூதியம்: 40 முதல் 79 வயதுடைய விதவை பெண்கள்.",
      "மாற்றுத்திறனாளி ஓய்வூதியம்: 18 வயதுக்கு மேற்பட்ட 80%-க்கும் அதிகமான குறைபாடுடையவர்கள்."
    ],
    benefits_en: [
      "Monthly pension credited directly via DBT into the beneficiary's bank or post office account.",
      "Pension amounts enhanced by state governments (e.g. In Tamil Nadu, ₹1,200 to ₹1,500 per month).",
      "Free medical care and subsidized ration grains under Antyodaya Anna Yojana (AAY)."
    ],
    benefits_ta: [
      "மாதந்தோறும் ₹1,000 முதல் ₹1,500 வரை வங்கி அல்லது அஞ்சலக கணக்கில் வரவு வைக்கப்படும் (தமிழ்நாட்டில் ₹1,200-₹1,500 வரை).",
      "அந்தியோதயா அன்ன யோஜனா (AAY) திட்டத்தின் கீழ் இலவச/மானிய அரிசி மற்றும் உணவுப் பொருட்கள்.",
      "அரசு மருத்துவமனைகளில் இலவச சிகிச்சை."
    ],
    documents_required_en: [
      "Age proof certificate / Aadhaar Card",
      "BPL Card or certificate issued by local Panchayat / Revenue Inspector",
      "Death Certificate of husband (for Widow Pension)",
      "Disability Certificate with disability percentage issued by District Medical Board (for Disability Pension)",
      "Bank or Post Office passbook copy"
    ],
    documents_required_ta: [
      "வயது சான்று / ஆதார் அட்டை",
      "வறுமைக்கோட்டிற்கு கீழ் இருப்பதற்கான BPL கார்டு அல்லது கிராம நிர்வாக அலுவலர் சான்று",
      "கணவரின் இறப்புச் சான்றிதழ் (விதவை ஓய்வூதியத்திற்கு)",
      "மருத்துவக் குழு வழங்கிய மாற்றுத்திறனாளி சான்றிதழ் (குறைந்தது 80% குறைபாடு)",
      "வங்கி அல்லது அஞ்சலக கணக்கு புத்தக நகல்"
    ],
    application_steps_en: [
      "Apply through the local Village Administrative Officer (VAO), Taluk Office, or online via State e-Seva portal / https://nsap.nic.in/.",
      "Submit application form along with age proof, BPL proof, and bank account details.",
      "Revenue Inspector and Tahsildar conduct inquiry and field verification.",
      "Sanction order is issued and monthly pension begins via direct bank transfer."
    ],
    application_steps_ta: [
      "கிராம நிர்வாக அலுவலர் (VAO), வட்டாட்சியர் அலுவலகம் அல்லது இ-சேவை மையம் மூலம் விண்ணப்பிக்கலாம்.",
      "விண்ணப்ப படிவத்துடன் ஆதார், வருமானச் சான்று மற்றும் வங்கி கணக்கு நகலை இணைக்கவும்.",
      "வருவாய் ஆய்வாளர் மற்றும் வட்டாட்சியர் கள ஆய்வு செய்து தகுதியை உறுதி செய்வர்.",
      "அனுமதி ஆணை வழங்கப்பட்டு மாதாந்திர ஓய்வூதியம் வங்கிக் கணக்கில் தொடங்கும்."
    ],
    important_notes_en: [
      "Annual digital life certificate (Jeevan Pramaan) or biometric verification must be completed to ensure continuous payout.",
      "Beneficiary must not have adult earning children in some specific state categories."
    ],
    important_notes_ta: [
      "ஓய்வூதியம் தடையின்றி கிடைக்க ஆண்டுக்கு ஒருமுறை வாழ்நாள் சான்று (Life Certificate) சமர்ப்பிக்க வேண்டும்."
    ],
    official_url: "https://nsap.nic.in/",
    source_doc_name: "National Social Assistance Programme Guidelines, Ministry of Rural Development",
    is_verified: true
  }
];
