"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Locale = 'en' | 'hi' | 'pa' | 'mr' | 'bn' | 'ta';

const translations = {
  en: {
    home: "Home",
    dashboard: "Dashboard",
    deepfake: "Deepfake",
    fir_report: "FIR Report",
    upgrade: "Upgrade",
    agent_access: "Agent Access",
    truth: "TRUTH",
    guard: "GUARD",
    explore: "Explore",
    get_started: "Get Started",
    hero_desc: "Explore highly interactive experiences with cursor-responsive animations.",
    real_time_data: "Real-time Data",
    adaptive_interface: "Adaptive Interface",
    secure_core: "Secure Core",
    bharat_edition: "Bharat Edition",
    // FIR Report
    consent: "Consent",
    profile: "Profile",
    location: "Location",
    results: "Results",
    guide: "Guide",
    privacy_consent: "Privacy & Consent",
    accept_continue: "Accept & Continue",
    next_step: "Next Step",
    go_back: "Go Back",
    locate_stations: "Locate Stations",
    download_report: "Download Report",
  },
  hi: {
    home: "मुख्य पृष्ठ",
    dashboard: "डैशबोर्ड",
    deepfake: "डीपफेक",
    fir_report: "एफआईआर रिपोर्ट",
    upgrade: "अपग्रेड",
    agent_access: "एजेंट एक्सेस",
    truth: "सत्य",
    guard: "रक्षक",
    explore: "एक्सप्लोर",
    get_started: "शुरू करें",
    hero_desc: "कर्सर-उत्तरदायी एनिमेशन के साथ अत्यधिक इंटरैक्टिव अनुभवों का अन्वेषण करें।",
    real_time_data: "रीयल-टाइम डेटा",
    adaptive_interface: "एडेप्टिव इंटरफेस",
    secure_core: "सुरक्षित कोर",
    bharat_edition: "भारत संस्करण",
    // FIR Report
    consent: "सहमति",
    profile: "प्रोफ़ाइल",
    location: "स्थान",
    results: "परिणाम",
    guide: "गाइड",
    privacy_consent: "गोपनीयता और सहमति",
    accept_continue: "स्वीकार करें और जारी रखें",
    next_step: "अगला कदम",
    go_back: "पीछे जाएं",
    locate_stations: "स्टेशन खोजें",
    download_report: "रिपोर्ट डाउनलोड करें",
  },
  pa: {
    home: "ਮੁੱਖ ਪੰਨਾ",
    dashboard: "ਡੈਸ਼ਬੋਰਡ",
    deepfake: "ਡੀਪਫੇਕ",
    fir_report: "ਐਫਆਈਆਰ ਰਿਪੋਰਟ",
    upgrade: "ਅਪਗ੍ਰੇਡ",
    agent_access: "ਏਜੰਟ ਪਹੁੰਚ",
    truth: "ਸੱਚ",
    guard: "ਗਾਰਡ",
    explore: "ਪੜਚੋਲ ਕਰੋ",
    get_started: "ਸ਼ੁਰੂ ਕਰੋ",
    hero_desc: "ਕਰਸਰ-ਜਵਾਬਦੇਹ ਐਨੀਮੇਸ਼ਨਾਂ ਦੇ ਨਾਲ ਬਹੁਤ ਜ਼ਿਆਦਾ ਇੰਟਰਐਕਟਿਵ ਅਨੁਭਵਾਂ ਦੀ ਪੜਚੋਲ ਕਰੋ।",
    real_time_data: "ਰੀਅਲ-ਟਾਈਮ ਡਾਟਾ",
    adaptive_interface: "ਅਨੁਕੂਲ ਇੰਟਰਫੇਸ",
    secure_core: "ਸੁਰੱਖਿਅਤ ਕੋਰ",
    bharat_edition: "ਭਾਰਤ ਐਡੀਸ਼ਨ",
    // FIR Report
    consent: "ਸਹਿਮਤੀ",
    profile: "ਪ੍ਰੋਫਾਈਲ",
    location: "ਸਥਾਨ",
    results: "ਨਤੀਜੇ",
    guide: "ਗਾਈਡ",
    privacy_consent: "ਪਰਦੇਦਾਰੀ ਅਤੇ ਸਹਿਮਤੀ",
    accept_continue: "ਸਵੀਕਾਰ ਕਰੋ ਅਤੇ ਜਾਰੀ ਰੱਖੋ",
    next_step: "ਅਗਲਾ ਕਦਮ",
    go_back: "ਪਿੱਛੇ ਜਾਓ",
    locate_stations: "ਸਟੇਸ਼ਨ ਲੱਭੋ",
    download_report: "ਰਿਪੋਰਟ ਡਾਉਨਲੋਡ ਕਰੋ",
  },
  mr: {
    home: "मुख्य पान",
    dashboard: "डॅशबोर्ड",
    deepfake: "डीपफेक",
    fir_report: "एफआयआर रिपोर्ट",
    upgrade: "अपग्रेड",
    agent_access: "एजंट प्रवेश",
    truth: "सत्य",
    guard: "रक्षक",
    explore: "एक्सप्लोर करा",
    get_started: "सुरू करा",
    hero_desc: "कर्सर-प्रतिसादात्मक ॲनिमेशनसह अत्यंत परस्परसंवादी अनुभवांचा शोध घ्या.",
    real_time_data: "रिअल-टाइम डेटा",
    adaptive_interface: "ॲडॉप्टिव्ह इंटरफेस",
    secure_core: "सुरक्षित कोअर",
    bharat_edition: "भारत आवृत्ती",
    // FIR Report
    consent: "संमती",
    profile: "प्रोफाइल",
    location: "स्थान",
    results: "निकाल",
    guide: "मार्गदर्शक",
    privacy_consent: "गोपनीयता आणि संमती",
    accept_continue: "स्वीकारा आणि पुढे चला",
    next_step: "पुढची पायरी",
    go_back: "मागे जा",
    locate_stations: "स्थानके शोधा",
    download_report: "रिपोर्ट डाउनलोड करा",
  },
  bn: {
    home: "মূল পাতা",
    dashboard: "ড্যাশবোর্ড",
    deepfake: "ডিপফেক",
    fir_report: "এফআইআর রিপোর্ট",
    upgrade: "আপগ্রেড",
    agent_access: "এজেন্ট অ্যাক্সেস",
    truth: "সত্য",
    guard: "রক্ষক",
    explore: "অন্বেষণ করুন",
    get_started: "শুরু করুন",
    hero_desc: "কার্সার-প্রতিক্রিয়াশীল অ্যানিমেশন সহ অত্যন্ত ইন্টারেক্টিভ অভিজ্ঞতা অন্বেষণ করুন।",
    real_time_data: "রিয়েল-টাইম ডেটা",
    adaptive_interface: "অ্যাডাপ্টিভ ইন্টারফেস",
    secure_core: "সুরক্ষিত কোর",
    bharat_edition: "ভারত সংস্করণ",
    // FIR Report
    consent: "সম্মতি",
    profile: "প্রোফাইল",
    location: "স্থান",
    results: "ফলাফল",
    guide: "গাইড",
    privacy_consent: "গোপনীয়তা এবং সম্মতি",
    accept_continue: "স্বীকার করুন এবং এগিয়ে যান",
    next_step: "পরবর্তী পদক্ষেপ",
    go_back: "পিছনে যান",
    locate_stations: "স্টেশন খুঁজুন",
    download_report: "রিপোর্ট ডাউনলোড করুন",
  },
  ta: {
    home: "முகப்பு",
    dashboard: "டாஷ்போர்டு",
    deepfake: "டீப்ஃபேக்",
    fir_report: "எஃப்ஐஆர் அறிக்கை",
    upgrade: "மேம்படுத்து",
    agent_access: "ஏஜென்ட் அணுகல்",
    truth: "உண்மை",
    guard: "காவலர்",
    explore: "ஆராயுங்கள்",
    get_started: "தொடங்குங்கள்",
    hero_desc: "கர்சர்-பதிலளிக்கக்கூடிய அனிமேஷன்களுடன் கூடிய ஊடாடும் அனுபவங்களை ஆராயுங்கள்.",
    real_time_data: "நிகழ்நேர தரவு",
    adaptive_interface: "தகவமைப்பு இடைமுகம்",
    secure_core: "பாதுகாப்பான கோர்",
    bharat_edition: "பாரத் பதிப்பு",
    // FIR Report
    consent: "சம்மதம்",
    profile: "சுயவிவரம்",
    location: "இடம்",
    results: "முடிவுகள்",
    guide: "வழிகாட்டி",
    privacy_consent: "தனியுரிமை மற்றும் சம்மதம்",
    accept_continue: "ஏற்றுக்கொண்டு தொடரவும்",
    next_step: "அடுத்த படி",
    go_back: "பின்னால் போ",
    locate_stations: "நிலையங்களைக் கண்டறியவும்",
    download_report: "அறிக்கையைப் பதிவிறக்கவும்",
  }
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof typeof translations['en']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  // Load locale from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tg-locale') as Locale;
    if (saved && translations[saved]) {
      setLocale(saved);
    }
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('tg-locale', newLocale);
  };

  const t = (key: keyof typeof translations['en']): string => {
    return translations[locale][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
