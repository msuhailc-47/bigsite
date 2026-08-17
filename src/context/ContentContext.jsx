
import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import translations from '../i18n/translations';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [translationsData, setTranslationsData] = useState(() => {
    const saved = localStorage.getItem('dorek_cms_translations');
    return saved ? JSON.parse(saved) : translations;
  });

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (!db) return;
    setIsFirebaseReady(true);
    const docRef = doc(db, 'dorek_cms', 'global_data');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.translationsData) {
          setTranslationsData(prev => 
            JSON.stringify(prev) !== JSON.stringify(data.translationsData) ? data.translationsData : prev
          );
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const saveToFirebase = async (updates) => {
    if (!db) return;
    setIsSyncing(true);
    try {
      const docRef = doc(db, 'dorek_cms', 'global_data');
      await setDoc(docRef, updates, { merge: true });
    } catch (e) {
      console.warn("Failed to save to Firestore. Using localStorage only.", e);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    localStorage.setItem('dorek_cms_translations', JSON.stringify(translationsData));
    if (isFirebaseReady) saveToFirebase({ translationsData });
  }, [translationsData, isFirebaseReady]);

  const updateTranslations = (newTranslations) => setTranslationsData(newTranslations);

  return (
    <ContentContext.Provider value={{ translationsData, updateTranslations, isSyncing }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within a ContentProvider');
  return context;
}
