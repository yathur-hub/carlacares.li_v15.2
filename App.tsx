import React, { useState, useEffect, useCallback } from 'react';
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

// Erkennung restriktiver Umgebungen (Google AI Studio / Blob-URLs)
const isBlobEnvironment = typeof window !== 'undefined' && (window.location.protocol === 'blob:' || window.location.href.startsWith('blob:'));

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('home');

  // --- Safe History Helpers ---
  const safeSetHash = useCallback((hash: string) => {
    if (isBlobEnvironment) return;
    try {
      window.location.hash = hash;
    } catch (e) {
      console.warn("Navigation: window.location.hash restricted", e);
    }
  }, []);

  const safeReplaceState = useCallback((url: string) => {
    if (isBlobEnvironment) return;
    try {
      window.history.replaceState(null, '', url);
    } catch (e) {
      console.warn("Navigation: history.replaceState restricted", e);
    }
  }, []);

  const safePushState = useCallback((url: string) => {
    if (isBlobEnvironment) return;
    try {
      window.history.pushState(null, '', url);
    } catch (e) {
      console.warn("Navigation: history.pushState restricted", e);
    }
  }, []);

  const scrollToSection = useCallback((id: string) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  }, []);

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

    // Initialisierung: Wir erzwingen 'home' beim ersten Laden konsequent
    const initialHash = window.location.hash;
    
    // Unabhängig vom Hash: Zuerst Home setzen
    setView('home');

    if (!isBlobEnvironment) {
      // Wenn ein tiefer Link existierte (außer Kontakt), bereinigen wir die URL,
      // damit beim Neuladen nicht wieder die Unterseite "aufspringt"
      if (initialHash && initialHash !== '#kontakt') {
        safeReplaceState(window.location.pathname);
      } else if (initialHash === '#kontakt') {
        scrollToSection('kontakt');
      }
    } else {
      // Spezialfall Blob (AI Studio Vorschau)
      if (initialHash === '#kontakt') {
        scrollToSection('kontakt');
      }
    }

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [safeReplaceState, scrollToSection]);

  const navigateTo = (newView: ViewType) => {
    // 1. URL Side-Effect (nur wenn erlaubt)
    switch (newView) {
      case 'care': safeSetHash('pflege-begleitung'); break;
      case 'billing': safeSetHash('abrechnung'); break;
      case 'about': safeSetHash('ueber-mich'); break;
      case 'referrers': safeSetHash('fuer-zuweisende'); break;
      case 'imprint': safeSetHash('impressum'); break;
      case 'privacy': safeSetHash('datenschutz'); break;
      default:
        safeSetHash('');
        safePushState(window.location.pathname + window.location.search);
        window.scrollTo(0, 0);
    }
    
    // 2. State Update (immer ausführen)
    setView(newView);
    if (newView !== 'home') window.scrollTo(0, 0);
  };

  const handleNavigateToKontakt = () => {
    if (view === 'home') {
      scrollToSection('kontakt');
    } else {
      safeSetHash('kontakt');
      setView('home');
      scrollToSection('kontakt');
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