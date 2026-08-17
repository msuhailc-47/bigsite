
import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const SettingsContext = createContext(null);

const defaultCodeSettings = {
  customHtml: '',
  customCss: '',
  customJs: '',
  headerScripts: '',
  footerScripts: '',
  history: []
};

export function SettingsProvider({ children }) {
  const [codeSettings, setCodeSettings] = useState(() => {
    const saved = localStorage.getItem('dorek_cms_code_settings');
    return saved ? JSON.parse(saved) : defaultCodeSettings;
  });

  const [userRole, setUserRole] = useState(() => {
    const saved = localStorage.getItem('dorek_cms_user_role');
    return saved || 'Super Admin';
  });

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  useEffect(() => {
    if (!db) return;
    setIsFirebaseReady(true);
    const docRef = doc(db, 'dorek_cms', 'global_data');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.codeSettings) {
          setCodeSettings(prev => JSON.stringify(prev) !== JSON.stringify(data.codeSettings) ? data.codeSettings : prev);
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
    localStorage.setItem('dorek_cms_code_settings', JSON.stringify(codeSettings));
    if (isFirebaseReady) saveToFirebase({ codeSettings });
  }, [codeSettings, isFirebaseReady]);

  useEffect(() => {
    localStorage.setItem('dorek_cms_user_role', userRole);
  }, [userRole]);

  // Code Settings Inject
  useEffect(() => {
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
  }, [codeSettings]);

  const saveCodeSettings = (newSettings) => {
    setCodeSettings(prev => ({
      ...prev, ...newSettings,
      history: [{ timestamp: new Date().toLocaleString(), settings: { ...prev } }, ...(prev.history || [])].slice(0, 10)
    }));
  };
  const rollbackCodeSettings = (historicalSettings) => setCodeSettings(prev => ({ ...prev, ...historicalSettings }));

  return (
    <SettingsContext.Provider value={{ codeSettings, userRole, setUserRole, saveCodeSettings, rollbackCodeSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within a SettingsProvider');
  return context;
}
