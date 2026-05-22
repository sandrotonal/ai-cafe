import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa6';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AIChat from './components/AIChat';
import About from './components/About';
import Contact from './components/Contact';
import Legal from './components/Legal';
import CookieBanner from './components/CookieBanner';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'ai' | 'about' | 'contact' | 'cookies' | 'privacy' | 'terms'>('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (view: 'home' | 'ai' | 'about' | 'contact' | 'cookies' | 'privacy' | 'terms') => {
    setCurrentView(view);
  };

  const backgrounds = {
    home: '/images/cafe_interior.png',
    ai: '/images/specialty_coffee.png',
    about: '/images/chocolate_dessert.png',
    contact: '/images/chocolate_truffles.png',
    cookies: '/images/chocolate_truffles.png',
    privacy: '/images/chocolate_truffles.png',
    terms: '/images/chocolate_truffles.png',
  };

  return (
    <div className="bg-[#050302] text-white min-h-screen selection:bg-white/10 selection:text-white overflow-hidden relative">
      
      {/* Immersive Background Images (Cross-fading with Ken Burns Effect) */}
      {currentView !== 'home' && (
        <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
          {Object.entries(backgrounds).map(([view, imgPath]) => (
            <div
              key={view}
              style={{ backgroundImage: `url(${imgPath})` }}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out animate-ken-burns ${
                currentView === view ? 'opacity-40' : 'opacity-0'
              }`}
            />
          ))}
          {/* Soft elegant gradient scrim — lighter for more image clarity */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/85" />
        </div>
      )}

      {/* Floating central/logo Navbar */}
      <Navbar 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
      />

      {/* View Routing — fast crossfade, no mode="wait" stutter */}
      <div className="w-full min-h-screen relative z-10">
        <AnimatePresence>
          {currentView === 'home' && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full min-h-screen absolute inset-0 overflow-y-auto"
            >
              <Home />
            </motion.div>
          )}

          {currentView === 'ai' && (
            <motion.div
              key="ai-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full min-h-screen absolute inset-0 overflow-y-auto"
            >
              <AIChat key="ai-active" initialHasStarted={true} />
            </motion.div>
          )}

          {currentView === 'about' && (
            <motion.div
              key="about-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full min-h-screen absolute inset-0 overflow-y-auto"
            >
              <About />
            </motion.div>
          )}

          {currentView === 'contact' && (
            <motion.div
              key="contact-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full min-h-screen absolute inset-0 overflow-y-auto"
            >
              <Contact />
            </motion.div>
          )}

          {['cookies', 'privacy', 'terms'].includes(currentView) && (
            <motion.div
              key="legal-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full min-h-screen absolute inset-0 overflow-y-auto"
            >
              <Legal
                activeTab={currentView as 'cookies' | 'privacy' | 'terms'}
                setActiveTab={(tab) => setCurrentView(tab)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cookie consent notification banner floating at the bottom */}
      <CookieBanner onNavigate={handleNavigate} />

      {/* Premium Footer — Clean on Mobile */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 pointer-events-none select-none">
        <div className="border-t border-white/5 bg-black/50 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-5 md:px-12 py-3 md:py-4 flex items-center justify-between">
            {/* Brand & Copyright & Developer — Always Visible */}
            <div className="flex flex-col sm:flex-row sm:items-center items-start gap-1 sm:gap-3 pointer-events-auto">
              <span className="text-[9px] font-sans tracking-[0.2em] text-white/45 uppercase font-semibold">SEISTE</span>
              <span className="text-[7px] sm:text-[8px] font-sans tracking-[0.10em] sm:tracking-[0.15em] text-white/30">
                © 2026 · Developed by <a href="https://gucluyumhe.dev/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-white/20 underline-offset-2">gucluyumhe.dev</a>
              </span>
            </div>
            
            {/* Center: Address — Hidden on Mobile (Removed Days and Hours) */}
            <span className="hidden md:block text-[8px] font-sans tracking-[0.15em] text-white/25">
              Valikonağı Cad. No: 42, Nişantaşı
            </span>
            
            {/* Right: Social with real Icons — Compact */}
            <div className="flex gap-4 items-center pointer-events-auto text-white/30">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Instagram">
                <FaInstagram size={15} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Twitter/X">
                <FaTwitter size={15} />
              </a>
              <a href="mailto:contact@seiste.com" className="hover:text-white transition-colors" title="Email Gönder">
                <FaEnvelope size={15} />
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
