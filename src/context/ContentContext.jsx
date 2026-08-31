
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

  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (!db) return;
    const transDocRef = doc(db, 'dorek_cms', 'translationsData');

    const unsubscribeTrans = onSnapshot(transDocRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().translationsData) {
        const remoteData = docSnap.data().translationsData;
        setTranslationsData((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(remoteData)) {
            localStorage.setItem('dorek_cms_translations', JSON.stringify(remoteData));
            return remoteData;
          }
          return prev;
        });
      }
    }, (error) => {
      console.error("Firestore translations snapshot error:", error);
    });

    return () => {
      unsubscribeTrans();
    };
  }, []);

  const updateTranslations = async (newTranslations) => {
    setTranslationsData(newTranslations);
    localStorage.setItem('dorek_cms_translations', JSON.stringify(newTranslations));
    if (db) {
      setIsSyncing(true);
      try {
        await setDoc(doc(db, 'dorek_cms', 'translationsData'), { translationsData: newTranslations }, { merge: true });
      } catch (e) {
        console.error("Error saving translations to Firestore:", e);
      } finally {
        setIsSyncing(false);
      }
    }
  };

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
