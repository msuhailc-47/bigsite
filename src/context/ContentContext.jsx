
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
    const transDocRef = doc(db, 'dorek_cms', 'translationsData');
    const customDocRef = doc(db, 'dorek_cms', 'customSections');

    const unsubscribeTrans = onSnapshot(transDocRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().translationsData) {
        setTranslationsData(docSnap.data().translationsData);
      }
    });

    const unsubscribeCustom = onSnapshot(customDocRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().customSections) {
        setCustomSections(docSnap.data().customSections);
      }
    });

    return () => {
      unsubscribeTrans();
      unsubscribeCustom();
    };
  }, []);

  const saveToFirebase = async (updates) => {
    if (!db) return;
    setIsSyncing(true);
    try {
      if (updates.translationsData) {
        await setDoc(doc(db, 'dorek_cms', 'translationsData'), { translationsData: updates.translationsData }, { merge: true });
      }
      if (updates.customSections) {
        await setDoc(doc(db, 'dorek_cms', 'customSections'), { customSections: updates.customSections }, { merge: true });
      }
    } catch (e) {
      console.error(e);
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
