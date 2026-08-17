
import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const NavigationContext = createContext(null);

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

export function NavigationProvider({ children }) {
  const [navigation, setNavigation] = useState(() => {
    const saved = localStorage.getItem('dorek_cms_navigation');
    return saved ? JSON.parse(saved) : defaultNav;
  });

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  useEffect(() => {
    if (!db) return;
    setIsFirebaseReady(true);
    const docRef = doc(db, 'dorek_cms', 'global_data');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.navigation) {
          setNavigation(prev => JSON.stringify(prev) !== JSON.stringify(data.navigation) ? data.navigation : prev);
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
    localStorage.setItem('dorek_cms_navigation', JSON.stringify(navigation));
    if (isFirebaseReady) saveToFirebase({ navigation });
  }, [navigation, isFirebaseReady]);

  return (
    <NavigationContext.Provider value={{ navigation, setNavigation }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigation must be used within a NavigationProvider');
  return context;
}
