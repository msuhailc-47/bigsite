
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
    const docRef = doc(db, 'dorek_cms', 'mediaLibrary');
    const unsubscribeMedia = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().mediaLibrary) {
        setMediaLibrary(prev => JSON.stringify(prev) !== JSON.stringify(docSnap.data().mediaLibrary) ? docSnap.data().mediaLibrary : prev);
      }
    });

    const subRef = doc(db, 'dorek_cms', 'submissions');
    const unsubscribeSub = onSnapshot(subRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().submissions) {
        setSubmissions(docSnap.data().submissions);
      }
    });

    return () => {
      unsubscribeMedia();
      unsubscribeSub();
    };
  }, []);

  const saveToFirebase = async (updates) => {
    if (!db) return;
    try {
      if (updates.mediaLibrary) {
        await setDoc(doc(db, 'dorek_cms', 'mediaLibrary'), { mediaLibrary: updates.mediaLibrary }, { merge: true });
      }
      if (updates.submissions) {
        await setDoc(doc(db, 'dorek_cms', 'submissions'), { submissions: updates.submissions }, { merge: true });
      }
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    localStorage.setItem('dorek_cms_media', JSON.stringify(mediaLibrary));
    if (isFirebaseReady) saveToFirebase({ mediaLibrary });
  }, [mediaLibrary, isFirebaseReady]);

  useEffect(() => {
    localStorage.setItem('dorek_cms_submissions', JSON.stringify(submissions));
  }, [submissions]);

  const addSubmission = (submission) => {
    const newSubmissions = [{ id: Date.now(), date: new Date().toLocaleString(), ...submission }, ...submissions];
    setSubmissions(newSubmissions);
    saveToFirebase({ submissions: newSubmissions });
  };
  
  const clearSubmissions = () => {
    setSubmissions([]);
    saveToFirebase({ submissions: [] });
  };
  
  const deleteSubmission = (id) => {
    const newSubmissions = submissions.filter(sub => sub.id !== id);
    setSubmissions(newSubmissions);
    saveToFirebase({ submissions: newSubmissions });
  };

  const markSubmissionRead = (id) => {
    const newSubmissions = submissions.map(sub => 
      sub.id === id ? { ...sub, isRead: true } : sub
    );
    setSubmissions(newSubmissions);
    saveToFirebase({ submissions: newSubmissions });
  };

  const markAllSubmissionsRead = () => {
    const newSubmissions = submissions.map(sub => ({ ...sub, isRead: true }));
    setSubmissions(newSubmissions);
    saveToFirebase({ submissions: newSubmissions });
  };

  const addMedia = (file) => setMediaLibrary(prev => [file, ...prev]);
  const deleteMedia = (fileName) => setMediaLibrary(prev => prev.filter(f => f.name !== fileName));

  return (
    <DataContext.Provider value={{ mediaLibrary, submissions, addSubmission, clearSubmissions, deleteSubmission, markSubmissionRead, markAllSubmissionsRead, addMedia, deleteMedia }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
}
