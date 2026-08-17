
import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const ThemeContext = createContext(null);

const defaultThemeSettings = {
  colors: { primary: '#0A2E5D', secondary: '#D4AF37', bgMain: '#f8f9fa', bgSection: '#ffffff' },
  animations: {
    hero: 'zoom-in', about: 'fade-in', businesses: 'slide-up', whyChoose: 'slide-up',
    products: 'slide-up', opportunities: 'fade-in', software: 'slide-up', network: 'fade-in',
    investors: 'slide-up', careers: 'fade-in', news: 'slide-up', gallery: 'zoom-in',
    downloads: 'fade-in', testimonials: 'slide-up', csr: 'fade-in', contact: 'slide-up'
  },
  sectionBackgrounds: {}
};

const defaultSectionVisibility = {
  hero: true, about: true, businesses: true, whyChoose: true, products: true,
  opportunities: true, software: true, network: true, investors: true,
  careers: true, news: true, gallery: true, downloads: true, testimonials: true,
  csr: true, contact: true
};

export function ThemeProvider({ children }) {
  const [themeSettings, setThemeSettings] = useState(() => {
    const saved = localStorage.getItem('dorek_cms_theme_settings');
    return saved ? JSON.parse(saved) : defaultThemeSettings;
  });

  const [sectionVisibility, setSectionVisibility] = useState(() => {
    const saved = localStorage.getItem('dorek_cms_section_visibility');
    return saved ? { ...defaultSectionVisibility, ...JSON.parse(saved) } : defaultSectionVisibility;
  });

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  useEffect(() => {
    if (!db) return;
    setIsFirebaseReady(true);
    const docRef = doc(db, 'dorek_cms', 'global_data');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.themeSettings) {
          setThemeSettings(prev => JSON.stringify(prev) !== JSON.stringify(data.themeSettings) ? data.themeSettings : prev);
        }
        if (data.sectionVisibility) {
          setSectionVisibility(prev => JSON.stringify(prev) !== JSON.stringify({ ...prev, ...data.sectionVisibility }) ? { ...prev, ...data.sectionVisibility } : prev);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const saveToFirebase = async (updates) => {
    if (!db) return;
    try {
      const docRef = doc(db, 'dorek_cms', 'global_data');
      await setDoc(docRef, updates, { merge: true });
    } catch (e) { }
  };

  useEffect(() => {
    localStorage.setItem('dorek_cms_theme_settings', JSON.stringify(themeSettings));
    if (isFirebaseReady) saveToFirebase({ themeSettings });
  }, [themeSettings, isFirebaseReady]);

  useEffect(() => {
    localStorage.setItem('dorek_cms_section_visibility', JSON.stringify(sectionVisibility));
    if (isFirebaseReady) saveToFirebase({ sectionVisibility });
  }, [sectionVisibility, isFirebaseReady]);

  // Inject Theme Variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary', themeSettings.colors.primary);
    root.style.setProperty('--secondary', themeSettings.colors.secondary);
    root.style.setProperty('--bg-main', themeSettings.colors.bgMain);
    root.style.setProperty('--bg-section', themeSettings.colors.bgSection);
    
    Object.entries(themeSettings.sectionBackgrounds || {}).forEach(([section, color]) => {
      root.style.setProperty(`--bg-${section}`, color);
    });
  }, [themeSettings]);

  const updateTheme = (newThemeSettings) => setThemeSettings(newThemeSettings);
  const toggleSectionVisibility = (sectionKey) => {
    setSectionVisibility(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };
  const isSectionVisible = (sectionKey) => sectionVisibility[sectionKey] !== false;
  
  const getAnimationClass = (sectionKey) => {
    const anim = themeSettings.animations?.[sectionKey];
    if (!anim || anim === 'none') return '';
    return `cms-anim-${anim}`;
  };

  return (
    <ThemeContext.Provider value={{ themeSettings, updateTheme, sectionVisibility, toggleSectionVisibility, isSectionVisible, getAnimationClass }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
