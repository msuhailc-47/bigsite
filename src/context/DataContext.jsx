
import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot, collection, deleteDoc, updateDoc, writeBatch } from 'firebase/firestore';
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

    // 1. Media Library Live Sync
    const docRef = doc(db, 'dorek_cms', 'mediaLibrary');
    const unsubscribeMedia = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().mediaLibrary) {
        setMediaLibrary(prev => JSON.stringify(prev) !== JSON.stringify(docSnap.data().mediaLibrary) ? docSnap.data().mediaLibrary : prev);
      }
    });

    // 2. Permanent Subcollection Architecture + Legacy Dual-Sync
    let colSubs = [];
    let legacySubs = [];

    const syncCombinedSubmissions = () => {
      const seen = new Set();
      const combined = [];

      // Primary: Subcollection documents (unlimited scalability)
      colSubs.forEach(item => {
        const key = item.id || item.docId;
        if (key && !seen.has(key)) {
          seen.add(key);
          combined.push(item);
        }
      });

      // Secondary: Historical legacy submissions
      legacySubs.forEach(item => {
        const key = item.id || item.docId;
        if (key && !seen.has(key)) {
          seen.add(key);
          combined.push(item);
        }
      });

      combined.sort((a, b) => (b.id || 0) - (a.id || 0));
      setSubmissions(combined);
    };

    // Listen to Subcollection: dorek_submissions
    const subColRef = collection(db, 'dorek_submissions');
    const unsubscribeSubCol = onSnapshot(subColRef, (snapshot) => {
      colSubs = [];
      snapshot.forEach(docSnap => {
        colSubs.push({ docId: docSnap.id, ...docSnap.data() });
      });
      syncCombinedSubmissions();
    }, (err) => {
      console.warn("Subcollection sync listener notice:", err);
    });

    // Listen to Legacy Array: dorek_cms/submissions
    const legacyDocRef = doc(db, 'dorek_cms', 'submissions');
    const unsubscribeLegacy = onSnapshot(legacyDocRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().submissions) {
        legacySubs = docSnap.data().submissions;
      } else {
        legacySubs = [];
      }
      syncCombinedSubmissions();
    }, (err) => {
      console.warn("Legacy submissions listener notice:", err);
    });

    return () => {
      unsubscribeMedia();
      unsubscribeSubCol();
      unsubscribeLegacy();
    };
  }, []);

  const saveToFirebase = async (updates) => {
    if (!db) return;
    try {
      if (updates.mediaLibrary) {
        await setDoc(doc(db, 'dorek_cms', 'mediaLibrary'), { mediaLibrary: updates.mediaLibrary }, { merge: true });
      }
    } catch (e) { console.error("Error saving to Firebase:", e); }
  };

  useEffect(() => {
    localStorage.setItem('dorek_cms_media', JSON.stringify(mediaLibrary));
  }, [mediaLibrary]);

  useEffect(() => {
    localStorage.setItem('dorek_cms_submissions', JSON.stringify(submissions));
  }, [submissions]);

  const addSubmission = async (submission) => {
    const id = Date.now();
    const docId = `sub_${id}_${Math.random().toString(36).substring(2, 7)}`;
    const newSub = {
      id,
      docId,
      date: new Date().toLocaleString(),
      createdAt: new Date().toISOString(),
      isRead: false,
      ...submission
    };

    if (db) {
      try {
        await setDoc(doc(db, 'dorek_submissions', docId), newSub);
      } catch (err) {
        console.error("Error adding to subcollection:", err);
      }
    }
  };
  
  const clearSubmissions = async () => {
    if (db) {
      try {
        const batch = writeBatch(db);
        submissions.forEach(s => {
          if (s.docId) {
            batch.delete(doc(db, 'dorek_submissions', s.docId));
          }
        });
        await batch.commit();
        // Also clear legacy doc
        await setDoc(doc(db, 'dorek_cms', 'submissions'), { submissions: [] }, { merge: true });
      } catch (err) {
        console.error("Error clearing submissions in Firebase:", err);
      }
    }
    setSubmissions([]);
  };
  
  const deleteSubmission = async (id) => {
    const subToDelete = submissions.find(sub => sub.id === id);
    const docId = subToDelete?.docId || `sub_${id}`;

    if (db) {
      try {
        await deleteDoc(doc(db, 'dorek_submissions', docId));
      } catch (err) {
        console.warn("Subcollection delete notice:", err);
      }

      // Also remove from legacy doc if present
      try {
        const remainingLegacy = submissions.filter(sub => sub.id !== id);
        await setDoc(doc(db, 'dorek_cms', 'submissions'), { submissions: remainingLegacy }, { merge: true });
      } catch (legacyErr) {
        // Ignore
      }
    }

    setSubmissions(prev => prev.filter(sub => sub.id !== id));
  };

  const markSubmissionRead = async (id) => {
    const sub = submissions.find(s => s.id === id);
    const docId = sub?.docId || `sub_${id}`;

    if (db) {
      try {
        await updateDoc(doc(db, 'dorek_submissions', docId), { isRead: true });
      } catch (err) {
        console.warn("Subcollection markRead notice:", err);
      }

      // Also mirror to legacy doc if present
      try {
        const updatedSubs = submissions.map(s => s.id === id ? { ...s, isRead: true } : s);
        await setDoc(doc(db, 'dorek_cms', 'submissions'), { submissions: updatedSubs }, { merge: true });
      } catch (legacyErr) {
        // Ignore
      }
    }

    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, isRead: true } : s));
  };

  const markAllSubmissionsRead = async () => {
    if (db) {
      try {
        const batch = writeBatch(db);
        submissions.forEach(s => {
          if (!s.isRead && s.docId) {
            batch.update(doc(db, 'dorek_submissions', s.docId), { isRead: true });
          }
        });
        await batch.commit();

        const allReadSubs = submissions.map(s => ({ ...s, isRead: true }));
        await setDoc(doc(db, 'dorek_cms', 'submissions'), { submissions: allReadSubs }, { merge: true });
      } catch (err) {
        console.error("Error marking all read:", err);
      }
    }

    setSubmissions(prev => prev.map(s => ({ ...s, isRead: true })));
  };

  const addMedia = (file) => {
    const updated = [file, ...mediaLibrary];
    setMediaLibrary(updated);
    saveToFirebase({ mediaLibrary: updated });
  };

  const deleteMedia = (fileName) => {
    const updated = mediaLibrary.filter(f => f.name !== fileName);
    setMediaLibrary(updated);
    saveToFirebase({ mediaLibrary: updated });
  };

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
