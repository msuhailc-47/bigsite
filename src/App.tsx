import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useCMS } from './context/CMSContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Businesses from './components/Businesses';
import WhyChoose from './components/WhyChoose';
import Products from './components/Products';
import Opportunities from './components/Opportunities';
import Software from './components/Software';
import Network from './components/Network';
import Investors from './components/Investors';
import Careers from './components/Careers';
import News from './components/News';
import Gallery from './components/Gallery';
import Downloads from './components/Downloads';
import Testimonials from './components/Testimonials';
import CSR from './components/CSR';
import Contact from './components/Contact';
import CustomSections from './components/CustomSections';
import Footer from './components/Footer';
import PortalLogin from './components/PortalLogin';
import ChatAssistant from './components/ChatAssistant';
import WelcomeScreen from './components/WelcomeScreen';
import NotFound404 from './pages/NotFound404';
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
      <Route path="/admin" element={
        <ProtectedRoute>
          <ErrorBoundary>
            <AdminDashboard />
          </ErrorBoundary>
        </ProtectedRoute>
      } />
      
      {/* Main Public Website */}
      <Route path="/" element={
        <div className={`app-container ${showWelcome ? 'welcome-active' : ''}`}>
          {showWelcome && <WelcomeScreen onComplete={() => setShowWelcome(false)} />}
          <Navbar lang={lang} t={t} onLangChange={toggleLang} onPortalOpen={() => setIsPortalOpen(true)} />
          
          <main>
            {isSectionVisible('hero') && <Hero lang={lang} t={t} />}
            {isSectionVisible('about') && <About lang={lang} t={t} />}
            {isSectionVisible('businesses') && <Businesses lang={lang} t={t} />}
            {isSectionVisible('whyChoose') && <WhyChoose lang={lang} t={t} />}
            {isSectionVisible('products') && <Products lang={lang} t={t} />}
            {isSectionVisible('opportunities') && <Opportunities lang={lang} t={t} onApplyOpen={() => setIsPortalOpen(true)} />}
            {isSectionVisible('software') && <Software lang={lang} t={t} />}
            {isSectionVisible('network') && <Network lang={lang} t={t} />}
            {isSectionVisible('investors') && <Investors lang={lang} t={t} />}
            {isSectionVisible('careers') && <Careers lang={lang} t={t} />}
            {isSectionVisible('news') && <News lang={lang} t={t} />}
            {isSectionVisible('gallery') && <Gallery lang={lang} t={t} />}
            {isSectionVisible('downloads') && <Downloads lang={lang} t={t} />}
            {isSectionVisible('testimonials') && <Testimonials lang={lang} t={t} />}
            {isSectionVisible('csr') && <CSR lang={lang} t={t} />}
            {isSectionVisible('contact') && <Contact lang={lang} t={t} />}
            <CustomSections lang={lang} t={t} />
          </main>
          
          <Footer lang={lang} t={t} />
          
          <PortalLogin lang={lang} t={t} isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />
          <ChatAssistant lang={lang} t={t} />
        </div>
      } />

      {/* 404 Catch-All Route */}
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}

export default App;
