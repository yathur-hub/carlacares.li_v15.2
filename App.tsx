import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import CareAndSupport from './pages/CareAndSupport';
import Billing from './pages/Billing';
import AboutMe from './pages/AboutMe';
import Referrers from './pages/Referrers';
import Imprint from './pages/Imprint';
import Privacy from './pages/Privacy';
import Footer from './components/Footer';

type ViewType = 'home' | 'care' | 'billing' | 'about' | 'referrers' | 'imprint' | 'privacy';

const App: React.FC = () => {
  // Start immer auf Home
  const [view, setView] = useState<ViewType>('home');

  const scrollToSection = (id: string) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      
      switch (hash) {
        case '#pflege-begleitung':
          setView('care');
          window.scrollTo(0, 0);
          break;
        case '#abrechnung':
          setView('billing');
          window.scrollTo(0, 0);
          break;
        case '#ueber-mich':
          setView('about');
          window.scrollTo(0, 0);
          break;
        case '#fuer-zuweisende':
          setView('referrers');
          window.scrollTo(0, 0);
          break;
        case '#impressum':
          setView('imprint');
          window.scrollTo(0, 0);
          break;
        case '#datenschutz':
          setView('privacy');
          window.scrollTo(0, 0);
          break;
        case '#kontakt':
          setView('home');
          scrollToSection('kontakt');
          break;
        default:
          if (!hash || hash === '' || hash === '#') {
             setView('home');
             window.scrollTo(0, 0);
          }
          break;
      }
    };

    // Initialisierung: URL bereinigen und Home erzwingen
    const initialHash = window.location.hash;
    if (initialHash && initialHash !== '#kontakt') {
      // Wenn wir nicht auf den Kontakt-Anker wollen, säubern wir die URL für den nächsten Refresh
      window.history.replaceState(null, '', window.location.pathname);
      setView('home');
    } else if (initialHash === '#kontakt') {
      setView('home');
      scrollToSection('kontakt');
    } else {
      setView('home');
    }

    // Listener für Navigation während der Sitzung
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (newView: ViewType) => {
    switch (newView) {
      case 'care':
        window.location.hash = 'pflege-begleitung';
        break;
      case 'billing':
        window.location.hash = 'abrechnung';
        break;
      case 'about':
        window.location.hash = 'ueber-mich';
        break;
      case 'referrers':
        window.location.hash = 'fuer-zuweisende';
        break;
      case 'imprint':
        window.location.hash = 'impressum';
        break;
      case 'privacy':
        window.location.hash = 'datenschutz';
        break;
      default:
        window.location.hash = '';
        window.history.pushState("", document.title, window.location.pathname + window.location.search);
        setView('home');
        window.scrollTo(0, 0);
    }
  };

  const handleNavigateToKontakt = () => {
    if (view === 'home') {
      scrollToSection('kontakt');
    } else {
      window.location.hash = 'kontakt';
    }
  };

  const getActiveHeaderView = (): 'home' | 'care' | 'billing' | 'about' => {
    if (view === 'care') return 'care';
    if (view === 'billing') return 'billing';
    if (view === 'about') return 'about';
    return 'home';
  };

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-accentBrown/20">
      <Header 
        currentView={getActiveHeaderView()} 
        onNavigate={(v) => navigateTo(v as ViewType)} 
      />
      
      <main className="flex-grow overflow-hidden">
        {view === 'home' && (
          <Home onNavigateReferrers={() => navigateTo('referrers')} />
        )}
        {view === 'care' && (
          <CareAndSupport onNavigateToKontakt={handleNavigateToKontakt} />
        )}
        {view === 'billing' && (
          <Billing onNavigateToKontakt={handleNavigateToKontakt} />
        )}
        {view === 'about' && (
          <AboutMe onNavigateToKontakt={handleNavigateToKontakt} />
        )}
        {view === 'referrers' && (
          <Referrers onNavigateToKontakt={handleNavigateToKontakt} />
        )}
        {view === 'imprint' && (
          <Imprint />
        )}
        {view === 'privacy' && (
          <Privacy />
        )}
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;