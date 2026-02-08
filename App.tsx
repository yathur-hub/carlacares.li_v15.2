
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import CareAndSupport from './pages/CareAndSupport';
import Billing from './pages/Billing';
import AboutMe from './pages/AboutMe';
import Referrers from './pages/Referrers';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'care' | 'billing' | 'about' | 'referrers'>('home');

  const scrollToSection = (id: string) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      
      if (hash === '#pflege-begleitung') {
        setView('care');
        window.scrollTo(0, 0);
      } else if (hash === '#abrechnung') {
        setView('billing');
        window.scrollTo(0, 0);
      } else if (hash === '#ueber-mich') {
        setView('about');
        window.scrollTo(0, 0);
      } else if (hash === '#fuer-zuweisende') {
        setView('referrers');
        window.scrollTo(0, 0);
      } else if (hash === '#kontakt') {
        setView('home');
        scrollToSection('kontakt');
      } else {
        setView('home');
        if (hash === '' || hash === '#') {
           window.scrollTo(0, 0);
        }
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();

    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (newView: 'home' | 'care' | 'billing' | 'about' | 'referrers') => {
    if (newView === 'care') {
      window.location.hash = 'pflege-begleitung';
    } else if (newView === 'billing') {
      window.location.hash = 'abrechnung';
    } else if (newView === 'about') {
      window.location.hash = 'ueber-mich';
    } else if (newView === 'referrers') {
      window.location.hash = 'fuer-zuweisende';
    } else {
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

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-accentBrown/20">
      <Header currentView={view === 'referrers' ? 'home' : view} onNavigate={navigateTo} />
      
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
      </main>

      <Footer />
    </div>
  );
};

export default App;
