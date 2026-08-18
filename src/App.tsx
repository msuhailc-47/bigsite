import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useCMS } from './context/CMSContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import ErrorBoundary from './components/admin/ErrorBoundary';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import './App.css';

// Simple session check - no hooks needed
const ProtectedRoute = ({ children }) => {
  const hasSession = localStorage.getItem('dorek_admin_session') === 'true';
  if (hasSession) return children;
  return <FirebaseAuthCheck>{children}</FirebaseAuthCheck>;
};

// Firebase auth check with hooks
const FirebaseAuthCheck = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        localStorage.setItem('dorek_admin_session', 'true');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#0A2E5D' }}>Loading CMS...</div>;
  }

  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

function App() {
  const [lang, setLang] = useState('en');
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const { translationsData, navigation, isSectionVisible } = useCMS();

  const t = translationsData[lang] || translationsData['en'];

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ml' : 'en');
  };

  return (
    <Routes>
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/*" element={
        <ProtectedRoute>
          <ErrorBoundary>
            <AdminDashboard />
          </ErrorBoundary>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
