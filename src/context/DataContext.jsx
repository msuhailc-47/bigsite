
import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [mediaLibrary, setMediaLibrary] = useState(() => {
    const saved = localStorage.getItem('dorek_cms_media');
    return saved ? JSON.parse(saved) : [];
  });

  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('dorek_cms_submissions');
    return saved ? JSON.parse(saved) : [];
  });

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  useEffect(() => {
    if (!db) return;
    setIsFirebaseReady(true);
    const docRef = doc(db, 'dorek_cms', 'global_data');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.mediaLibrary) {
          setMediaLibrary(prev => JSON.stringify(prev) !== JSON.stringify(data.mediaLibrary) ? data.mediaLibrary : prev);
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
    localStorage.setItem('dorek_cms_media', JSON.stringify(mediaLibrary));
    if (isFirebaseReady) saveToFirebase({ mediaLibrary });
  }, [mediaLibrary, isFirebaseReady]);

  useEffect(() => {
    localStorage.setItem('dorek_cms_submissions', JSON.stringify(submissions));
  }, [submissions]);

  const addSubmission = (submission) => setSubmissions(prev => [{ id: Date.now(), date: new Date().toLocaleString(), ...submission }, ...prev]);
  const clearSubmissions = () => setSubmissions([]);
  const addMedia = (file) => setMediaLibrary(prev => [file, ...prev]);
  const deleteMedia = (fileName) => setMediaLibrary(prev => prev.filter(f => f.name !== fileName));

  return (
    <DataContext.Provider value={{ mediaLibrary, submissions, addSubmission, clearSubmissions, addMedia, deleteMedia }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
}
