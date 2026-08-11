import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import translations from '../i18n/translations';

const CMSContext = createContext(null);

const defaultNav = [
  { id: 'home', label: 'Home', path: '#hero' },
  { id: 'about', label: 'About', path: '#about' },
  { id: 'businesses', label: 'Businesses', path: '#businesses' },
  { id: 'opportunities', label: 'Opportunities', path: '#opportunities' },
  { id: 'software', label: 'Software', path: '#software' },
  { id: 'investors', label: 'Investors', path: '#investors' },
  { id: 'careers', label: 'Careers', path: '#careers' },
  { id: 'news', label: 'News', path: '#news' },
  { id: 'gallery', label: 'Gallery', path: '#gallery' },
  { id: 'downloads', label: 'Downloads', path: '#downloads' },
  { id: 'contact', label: 'Contact', path: '#contact' }
];

const defaultCodeSettings = {
  customHtml: '',
  customCss: '',
  customJs: '',
  headerScripts: '',
  footerScripts: '',
  history: []
};

const defaultThemeSettings = {
  colors: {
    primary: '#0A2E5D',
    secondary: '#D4AF37',
    bgMain: '#f8f9fa',
    bgSection: '#ffffff'
  },
  animations: {
    hero: 'zoom-in',
    about: 'fade-in',
    businesses: 'slide-up',
    whyChoose: 'slide-up',
    products: 'slide-up',
    opportunities: 'fade-in',
    software: 'slide-up',
    network: 'fade-in',
    investors: 'slide-up',
    careers: 'fade-in',
    news: 'slide-up',
    gallery: 'zoom-in',
    downloads: 'fade-in',
    testimonials: 'slide-up',
    csr: 'fade-in',
    contact: 'slide-up'
  },
  sectionBackgrounds: {} // format: { sectionId: '#color' }
};

const defaultSectionVisibility = {
  hero: true,
  about: true,
  businesses: true,
  whyChoose: true,
  products: true,
  opportunities: true,
  software: true,
  network: true,
  investors: true,
  careers: true,
  news: true,
  gallery: true,
  downloads: true,
  testimonials: true,
  csr: true,
  contact: true
};

export function CMSProvider({ children }) {
  const [translationsData, setTranslationsData] = useState(() => {
    const saved = localStorage.getItem('dorek_cms_translations');
    return saved ? JSON.parse(saved) : translations;
  });

  const [navigation, setNavigation] = useState(() => {
    const saved = localStorage.getItem('dorek_cms_navigation');
    return saved ? JSON.parse(saved) : defaultNav;
  });

  const [mediaLibrary, setMediaLibrary] = useState(() => {
    const saved = localStorage.getItem('dorek_cms_media');
    return saved ? JSON.parse(saved) : [];
  });

  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('dorek_cms_submissions');
    return saved ? JSON.parse(saved) : [];
  });

  const [codeSettings, setCodeSettings] = useState(() => {
    const saved = localStorage.getItem('dorek_cms_code_settings');
    return saved ? JSON.parse(saved) : defaultCodeSettings;
  });

  const [themeSettings, setThemeSettings] = useState(() => {
    const saved = localStorage.getItem('dorek_cms_theme_settings');
    return saved ? JSON.parse(saved) : defaultThemeSettings;
  });

  const [sectionVisibility, setSectionVisibility] = useState(() => {
    const saved = localStorage.getItem('dorek_cms_section_visibility');
    return saved ? { ...defaultSectionVisibility, ...JSON.parse(saved) } : defaultSectionVisibility;
  });

  const [userRole, setUserRole] = useState(() => {
    const saved = localStorage.getItem('dorek_cms_user_role');
    return saved || 'Super Admin';
  });

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  // Sync to Firebase on load
  useEffect(() => {
    if (!db) return;
    setIsFirebaseReady(true);
    const docRef = doc(db, 'dorek_cms', 'global_data');
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.translationsData) setTranslationsData(data.translationsData);
        if (data.navigation) setNavigation(data.navigation);
        if (data.mediaLibrary) setMediaLibrary(data.mediaLibrary);
        if (data.codeSettings) setCodeSettings(data.codeSettings);
        if (data.themeSettings) setThemeSettings(data.themeSettings);
        if (data.sectionVisibility) setSectionVisibility(prev => ({ ...prev, ...data.sectionVisibility }));
      }
    }, (error) => {
      console.warn("Firestore sync error (might be permissions or missing config):", error);
    });

    return () => unsubscribe();
  }, []);

  // Save to Firebase helper
  const saveToFirebase = async (updates) => {
    if (!db) return;
    try {
      const docRef = doc(db, 'dorek_cms', 'global_data');
      await setDoc(docRef, updates, { merge: true });
    } catch (e) {
      console.warn("Failed to save to Firestore. Using localStorage only.", e);
    }
  };

  // Sync to localStorage and Firebase
  useEffect(() => {
    localStorage.setItem('dorek_cms_translations', JSON.stringify(translationsData));
    if (isFirebaseReady) saveToFirebase({ translationsData });
  }, [translationsData, isFirebaseReady]);

  useEffect(() => {
    localStorage.setItem('dorek_cms_navigation', JSON.stringify(navigation));
    if (isFirebaseReady) saveToFirebase({ navigation });
  }, [navigation, isFirebaseReady]);

  useEffect(() => {
    localStorage.setItem('dorek_cms_media', JSON.stringify(mediaLibrary));
    if (isFirebaseReady) saveToFirebase({ mediaLibrary });
  }, [mediaLibrary, isFirebaseReady]);

  useEffect(() => {
    localStorage.setItem('dorek_cms_submissions', JSON.stringify(submissions));
    // Usually submissions are a subcollection, but keeping simple for now
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('dorek_cms_code_settings', JSON.stringify(codeSettings));
    if (isFirebaseReady) saveToFirebase({ codeSettings });
  }, [codeSettings, isFirebaseReady]);

  useEffect(() => {
    localStorage.setItem('dorek_cms_section_visibility', JSON.stringify(sectionVisibility));
    if (isFirebaseReady) saveToFirebase({ sectionVisibility });
  }, [sectionVisibility, isFirebaseReady]);

  useEffect(() => {
    localStorage.setItem('dorek_cms_theme_settings', JSON.stringify(themeSettings));
    if (isFirebaseReady) saveToFirebase({ themeSettings });
  }, [themeSettings, isFirebaseReady]);

  useEffect(() => {
    localStorage.setItem('dorek_cms_user_role', userRole);
  }, [userRole]);

  // Inject Custom Themes & CSS/JS
  useEffect(() => {
    // Inject Theme Variables
    const root = document.documentElement;
    root.style.setProperty('--primary', themeSettings.colors.primary);
    root.style.setProperty('--secondary', themeSettings.colors.secondary);
    root.style.setProperty('--bg-main', themeSettings.colors.bgMain);
    root.style.setProperty('--bg-section', themeSettings.colors.bgSection);
    
    // Inject Custom Section Backgrounds
    Object.entries(themeSettings.sectionBackgrounds).forEach(([section, color]) => {
      root.style.setProperty(`--bg-${section}`, color);
    });

    // Code Settings Inject
    let styleTag = document.getElementById('cms-custom-styles');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'cms-custom-styles';
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = codeSettings.customCss || '';

    let htmlDiv = document.getElementById('cms-custom-html');
    if (!htmlDiv) {
      htmlDiv = document.createElement('div');
      htmlDiv.id = 'cms-custom-html';
      document.body.insertBefore(htmlDiv, document.body.firstChild);
    }
    htmlDiv.innerHTML = codeSettings.customHtml || '';

    // Advanced Scripts inject logic simplified for brevity
  }, [codeSettings, themeSettings]);

  const updateTranslations = (newTranslations) => setTranslationsData(newTranslations);
  const updateTheme = (newThemeSettings) => setThemeSettings(newThemeSettings);
  
  const addSubmission = (submission) => {
    setSubmissions(prev => [{ id: Date.now(), date: new Date().toLocaleString(), ...submission }, ...prev]);
  };
  const clearSubmissions = () => setSubmissions([]);
  const addMedia = (file) => setMediaLibrary(prev => [file, ...prev]);
  const deleteMedia = (fileName) => setMediaLibrary(prev => prev.filter(f => f.name !== fileName));
  const saveCodeSettings = (newSettings) => {
    setCodeSettings(prev => ({
      ...prev, ...newSettings,
      history: [{ timestamp: new Date().toLocaleString(), settings: { ...prev } }, ...(prev.history || [])].slice(0, 10)
    }));
  };
  const rollbackCodeSettings = (historicalSettings) => setCodeSettings(prev => ({ ...prev, ...historicalSettings }));

  const toggleSectionVisibility = (sectionKey) => {
    setSectionVisibility(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  const isSectionVisible = (sectionKey) => {
    return sectionVisibility[sectionKey] !== false;
  };

  const resetAll = () => {
    if (window.confirm("Are you sure you want to reset all CMS changes to code defaults?")) {
      setTranslationsData(translations);
      setNavigation(defaultNav);
      setMediaLibrary([]);
      setCodeSettings(defaultCodeSettings);
      setThemeSettings(defaultThemeSettings);
    }
  };

  const importCMSData = (jsonData) => {
    try {
      const data = JSON.parse(jsonData);
      if (data.translationsData) setTranslationsData(data.translationsData);
      if (data.navigation) setNavigation(data.navigation);
      if (data.mediaLibrary) setMediaLibrary(data.mediaLibrary);
      if (data.codeSettings) setCodeSettings(data.codeSettings);
      if (data.themeSettings) setThemeSettings(data.themeSettings);
      if (data.sectionVisibility) setSectionVisibility(prev => ({ ...prev, ...data.sectionVisibility }));
      return true;
    } catch (e) {
      alert("Invalid JSON format!");
      return false;
    }
  };

  const exportCMSData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ translationsData, navigation, mediaLibrary, codeSettings, themeSettings }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `dorek_cms_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Helper function to get animation class
  const getAnimationClass = (sectionKey) => {
    const anim = themeSettings.animations[sectionKey];
    if (!anim || anim === 'none') return '';
    return `cms-anim-${anim}`;
  };

  return (
    <CMSContext.Provider value={{
      translationsData,
      navigation,
      mediaLibrary,
      submissions,
      codeSettings,
      themeSettings,
      userRole,
      setNavigation,
      setUserRole,
      updateTranslations,
      updateTheme,
      addSubmission,
      clearSubmissions,
      addMedia,
      deleteMedia,
      saveCodeSettings,
      rollbackCodeSettings,
      resetAll,
      importCMSData,
      exportCMSData,
      sectionVisibility,
      toggleSectionVisibility,
      isSectionVisible,
      getAnimationClass
    }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) throw new Error('useCMS must be used within a CMSProvider');
  return context;
}
