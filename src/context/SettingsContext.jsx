
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
    
    const codeRef = doc(db, 'dorek_cms', 'codeSettings');
    const unsubCode = onSnapshot(codeRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().codeSettings) {
        setCodeSettings(prev => JSON.stringify(prev) !== JSON.stringify(docSnap.data().codeSettings) ? docSnap.data().codeSettings : prev);
      }
    });

    return () => {
      unsubCode();
    };
  }, []);

  const saveToFirebase = async (updates) => {
    if (!db) return;
    try {
      if (updates.codeSettings) {
        await setDoc(doc(db, 'dorek_cms', 'codeSettings'), { codeSettings: updates.codeSettings }, { merge: true });
      }
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    localStorage.setItem('dorek_cms_code_settings', JSON.stringify(codeSettings));
  }, [codeSettings]);

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

  const saveCodeSettings = async (newSettings) => {
    const updated = {
      ...codeSettings, ...newSettings,
      history: [{ timestamp: new Date().toLocaleString(), settings: { ...codeSettings } }, ...(codeSettings.history || [])].slice(0, 10)
    };
    setCodeSettings(updated);
    localStorage.setItem('dorek_cms_code_settings', JSON.stringify(updated));
    await saveToFirebase({ codeSettings: updated });
  };
  
  const rollbackCodeSettings = async (historicalSettings) => {
    const updated = { ...codeSettings, ...historicalSettings };
    setCodeSettings(updated);
    localStorage.setItem('dorek_cms_code_settings', JSON.stringify(updated));
    await saveToFirebase({ codeSettings: updated });
  };

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
