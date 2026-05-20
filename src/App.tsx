import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AIChat from './components/AIChat';
import About from './components/About';
import Contact from './components/Contact';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'ai' | 'about' | 'contact'>('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (view: 'home' | 'ai' | 'about' | 'contact') => {
    setCurrentView(view);
  };

  const backgrounds = {
    home: '/images/cafe_interior.png',
    ai: '/images/specialty_coffee.png',
    about: '/images/chocolate_dessert.png',
    contact: '/images/chocolate_truffles.png',
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

      {/* View Routing with Framer Motion slide/fade animations */}
      <div className="w-full min-h-screen relative z-10">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full min-h-screen"
            >
              <Home onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentView === 'ai' && (
            <motion.div
              key="ai-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full min-h-screen"
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
              transition={{ duration: 0.4 }}
              className="w-full min-h-screen"
            >
              <About onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentView === 'contact' && (
            <motion.div
              key="contact-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full min-h-screen"
            >
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Premium Footer — Clean on Mobile */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 pointer-events-none select-none">
        <div className="border-t border-white/5 bg-black/50 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-5 md:px-12 py-3 md:py-4 flex items-center justify-between">
            {/* Brand & Copyright — Always Visible */}
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-sans tracking-[0.2em] text-white/45 uppercase font-semibold">SEISTE</span>
              <span className="hidden sm:inline text-[8px] font-sans tracking-[0.15em] text-white/20">© 2026</span>
            </div>
            {/* Center: Address — Hidden on Mobile */}
            <span className="hidden md:block text-[8px] font-sans tracking-[0.15em] text-white/25">
              Valikonağı Cad. No: 42, Nişantaşı · PZT-CUM 09-23 · CMT-PZR 09-00
            </span>
            {/* Right: Social — Compact */}
            <div className="flex gap-4 pointer-events-auto">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[8px] font-sans tracking-[0.15em] text-white/30 hover:text-white transition-colors uppercase">IG</a>
              <a href="mailto:contact@seiste.com" className="text-[8px] font-sans tracking-[0.15em] text-white/30 hover:text-white transition-colors uppercase">Email</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
