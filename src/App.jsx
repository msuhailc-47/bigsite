import { useState } from 'react';
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
import Footer from './components/Footer';
import PortalLogin from './components/PortalLogin';
import ChatAssistant from './components/ChatAssistant';
import './App.css';

function App() {
  const [lang, setLang] = useState('en');
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ml' : 'en');
  };

  return (
    <div className="app-container">
      <Navbar lang={lang} onLangChange={toggleLang} onPortalOpen={() => setIsPortalOpen(true)} />
      
      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Businesses lang={lang} />
        <WhyChoose lang={lang} />
        <Products lang={lang} />
        <Opportunities lang={lang} onApplyOpen={() => setIsPortalOpen(true)} />
        <Software lang={lang} />
        <Network lang={lang} />
        <Investors lang={lang} />
        <Careers lang={lang} />
        <News lang={lang} />
        <Gallery lang={lang} />
        <Downloads lang={lang} />
        <Testimonials lang={lang} />
        <CSR lang={lang} />
        <Contact lang={lang} />
      </main>
      
      <Footer lang={lang} />
      
      <PortalLogin isOpen={isPortalOpen} onClose={() => setIsPortalOpen(false)} />
      <ChatAssistant />
    </div>
  );
}

export default App;
