import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa6';

type ViewType = 'home' | 'ai' | 'about' | 'contact' | 'cookies' | 'privacy' | 'terms';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export default function Navbar({ currentView, onNavigate, menuOpen, setMenuOpen }: NavbarProps) {
  const handleItemClick = (view: ViewType) => {
    onNavigate(view);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Brand Logo - Top Left */}
      <div 
        onClick={() => handleItemClick('home')}
        className="fixed top-8 left-8 z-50 text-xl font-serif tracking-[0.2em] font-light text-white cursor-pointer select-none hover:opacity-80 transition-opacity"
      >
        Seiste
      </div>

      {/* Floating Central Capsule Navbar */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center w-full max-w-[90%] md:max-w-md">
        <div className="flex items-center justify-between w-full h-12 px-6 rounded-full bg-black/25 backdrop-blur-xl border border-white/5 shadow-2xl">
          {/* Left Wavy Logo (Clicking logo goes home) */}
          <div 
            onClick={() => handleItemClick('home')}
            className="flex items-center text-white/90 hover:text-white cursor-pointer transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 20C14 14 20 26 26 20C32 14 38 20 38 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M2 20C8 20 14 26 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.3"/>
            </svg>
          </div>

          {/* Center Links */}
          <div className="flex gap-6 md:gap-8 items-center">
            <button
              onClick={() => handleItemClick('ai')}
              className={`text-[10px] font-sans tracking-[0.25em] font-medium transition-all duration-300 relative py-1 cursor-pointer ${
                currentView === 'ai' ? 'text-white font-semibold' : 'text-white/40 hover:text-white/80'
              }`}
            >
              AI
              {currentView === 'ai' && (
                <motion.div 
                  layoutId="activeDot"
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>

            <button
              onClick={() => handleItemClick('about')}
              className={`text-[10px] font-sans tracking-[0.25em] font-medium transition-all duration-300 relative py-1 cursor-pointer ${
                currentView === 'about' ? 'text-white font-semibold' : 'text-white/40 hover:text-white/80'
              }`}
            >
              ABOUT
              {currentView === 'about' && (
                <motion.div 
                  layoutId="activeDot"
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>

            <button
              onClick={() => handleItemClick('contact')}
              className={`text-[10px] font-sans tracking-[0.25em] font-medium transition-all duration-300 relative py-1 cursor-pointer ${
                currentView === 'contact' ? 'text-white font-semibold' : 'text-white/40 hover:text-white/80'
              }`}
            >
              CONTACT
              {currentView === 'contact' && (
                <motion.div 
                  layoutId="activeDot"
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          </div>

          {/* Right Hamburger Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Menü"
          >
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 1H18M0 6H18M0 11H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Screen Overlay Menu (Central Hamburger Menu Open) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xl flex items-center justify-center"
          >
            {/* Elegant Central Card Modal */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              className="w-[90%] max-w-[400px] h-[520px] p-10 rounded-[32px] bg-black/30 border border-white/5 flex flex-col justify-between shadow-2xl relative"
            >
              {/* Close Button Inside Menu */}
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors cursor-pointer"
                aria-label="Kapat"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L15 15M1 15L15 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              <div className="flex flex-col justify-between h-full gap-8 mt-12">
                {/* Menu items */}
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => handleItemClick('home')}
                    className={`text-sm font-sans tracking-[0.25em] uppercase hover:text-white text-left transition-colors cursor-pointer ${
                      currentView === 'home' ? 'text-white font-semibold' : 'text-white/45'
                    }`}
                  >
                    HOME
                  </button>
                  <button
                    onClick={() => handleItemClick('ai')}
                    className={`text-sm font-sans tracking-[0.25em] uppercase hover:text-white text-left transition-colors cursor-pointer ${
                      currentView === 'ai' ? 'text-white font-semibold' : 'text-white/45'
                    }`}
                  >
                    AI SOMMELIER
                  </button>
                  <button
                    onClick={() => handleItemClick('about')}
                    className={`text-sm font-sans tracking-[0.25em] uppercase hover:text-white text-left transition-colors cursor-pointer ${
                      currentView === 'about' ? 'text-white font-semibold' : 'text-white/45'
                    }`}
                  >
                    ABOUT US
                  </button>
                  <button
                    onClick={() => handleItemClick('contact')}
                    className={`text-sm font-sans tracking-[0.25em] uppercase hover:text-white text-left transition-colors cursor-pointer ${
                      currentView === 'contact' ? 'text-white font-semibold' : 'text-white/45'
                    }`}
                  >
                    CONTACT
                  </button>

                  {/* Decorative divider line for legal texts */}
                  <div className="border-t border-white/10 my-2.5" />

                  <button
                    onClick={() => handleItemClick('privacy')}
                    className={`text-[10px] font-sans tracking-[0.2em] uppercase hover:text-white text-left transition-colors cursor-pointer ${
                      currentView === 'privacy' ? 'text-white font-medium' : 'text-white/40'
                    }`}
                  >
                    GİZLİLİK POLİTİKASI
                  </button>
                  <button
                    onClick={() => handleItemClick('cookies')}
                    className={`text-[10px] font-sans tracking-[0.2em] uppercase hover:text-white text-left transition-colors cursor-pointer ${
                      currentView === 'cookies' ? 'text-white font-medium' : 'text-white/40'
                    }`}
                  >
                    ÇEREZ POLİTİKASI
                  </button>
                  <button
                    onClick={() => handleItemClick('terms')}
                    className={`text-[10px] font-sans tracking-[0.2em] uppercase hover:text-white text-left transition-colors cursor-pointer ${
                      currentView === 'terms' ? 'text-white font-medium' : 'text-white/40'
                    }`}
                  >
                    KULLANIM KOŞULLARI
                  </button>
                </div>

                {/* Footer of the Drawer */}
                <div className="flex justify-between items-center border-t border-white/5 pt-6 mt-2">
                  <span className="text-[8px] font-sans tracking-[0.2em] text-white/35 uppercase">TAKİP EDİN</span>
                  <div className="flex gap-5 items-center text-white/45">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Instagram">
                      <FaInstagram size={14} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Twitter/X">
                      <FaTwitter size={14} />
                    </a>
                    <a href="mailto:contact@seiste.com" className="hover:text-white transition-colors" title="Email">
                      <FaEnvelope size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
