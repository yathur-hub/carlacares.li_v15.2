
import React from 'react';
import DBTTool from './DBTTool';

interface HeroProps {
  onNavigateReferrers?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateReferrers }) => {
  const scrollToKontakt = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('kontakt');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white pt-8 md:pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 md:mb-24">
          {/* Left Content */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-extrabold text-accentGreen leading-[1.1] tracking-tight">
                Unterstützung im Alltag bei psychischen Belastungen
              </h1>
              <h2 className="text-xl md:text-2xl font-bold text-accentBrown">
                Ambulante psychiatrische Pflege im Fürstentum Liechtenstein
              </h2>
            </div>
            
            <p className="text-lg md:text-xl font-semibold text-textDark border-l-4 border-accentBrown pl-6">
              Aufsuchend. Alltagsnah. Auf Augenhöhe.
            </p>

            <div className="space-y-6 text-textDark/70 leading-relaxed text-lg max-w-xl">
              <p>
                Psychische Erkrankungen können den Alltag schleichend, aber tiefgreifend verändern.
                Was früher selbstverständlich war, wird anstrengend oder kaum noch bewältigbar.
              </p>
              <p>
                Ambulante psychiatrische Pflege begleitet dich dort, wo dein Leben stattfindet: 
                in deinem Zuhause, in deinem gewohnten Umfeld, in deinem Tempo. 
                Ziel ist Stabilität im Alltag, Orientierung in belastenden Phasen und eine verlässliche fachliche Begleitung.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#kontakt" 
                onClick={scrollToKontakt}
                className="bg-accentGreen text-white px-8 py-4 rounded-xl font-bold hover:bg-accentBrown transition-all shadow-lg hover:shadow-accentBrown/20"
              >
                Erstgespräch vereinbaren
              </a>
              <button 
                onClick={onNavigateReferrers}
                className="border-2 border-accentGreen/10 text-accentGreen px-8 py-4 rounded-xl font-bold hover:bg-secondary transition-all"
              >
                für Zuweisende
              </button>
            </div>
          </div>

          {/* Right Visual: DBT Immediate Help Tool */}
          <div className="relative animate-in fade-in slide-in-from-right duration-1000">
            <div className="bg-secondary rounded-[40px] border border-gray-100 shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
              <DBTTool />
            </div>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="border-t border-gray-100 pt-10">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
             <div className="text-sm font-black uppercase tracking-[0.3em] text-accentGreen">Gesundheitsamt FL</div>
             <div className="text-sm font-black uppercase tracking-[0.3em] text-accentGreen">Krankenkassen-Anerkannt</div>
             <div className="text-sm font-black uppercase tracking-[0.3em] text-accentGreen">HF Psychiatrie</div>
             <div className="text-sm font-black uppercase tracking-[0.3em] text-accentGreen">LKV Mitglied</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;