import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookieBannerProps {
  onNavigate: (view: 'home' | 'ai' | 'about' | 'contact' | 'cookies' | 'privacy' | 'terms') => void;
}

export default function CookieBanner({ onNavigate }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isAccepted = localStorage.getItem('seiste_cookies_accepted');
    if (isAccepted !== 'true') {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500); // Elegant entrance after 1.5s
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('seiste_cookies_accepted', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, x: '-50%', scale: 0.98 }}
          animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
          exit={{ opacity: 0, y: 20, x: '-50%', scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-20 left-1/2 z-40 w-[92%] max-w-4xl"
        >
          <div className="w-full bg-[#050302]/95 backdrop-blur-3xl border border-white/10 rounded-2xl md:rounded-full p-4 md:py-3.5 md:px-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.03)]">
            
            {/* Description Text */}
            <p className="text-[10px] md:text-[11px] font-sans font-light tracking-wide leading-relaxed text-white/70 flex-1">
              <strong className="font-semibold text-white/90">Çerezler ve Gizlilik</strong> &middot; Web sitemizdeki deneyiminizi kişiselleştirmek ve yapay zeka sommelier hizmetimizi optimize etmek amacıyla çerezler kullanıyoruz. Detaylı bilgiye{' '}
              <button
                onClick={() => onNavigate('cookies')}
                className="text-white hover:text-white/80 underline underline-offset-4 decoration-white/20 hover:decoration-white/50 transition-all font-medium cursor-pointer"
              >
                Çerez Politikamız
              </button>{' '}
              üzerinden ulaşabilirsiniz.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 md:flex-shrink-0">
              <button
                onClick={handleDecline}
                className="flex-1 md:flex-none py-2 px-4 md:px-5 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/25 active:scale-[0.98] transition-all duration-300 text-[9px] md:text-[10px] font-sans tracking-[0.15em] uppercase font-medium cursor-pointer"
              >
                Reddet
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 md:flex-none py-2 px-5 md:px-6 rounded-full bg-white text-black hover:bg-white/90 active:scale-[0.98] transition-all duration-300 text-[9px] md:text-[10px] font-sans tracking-[0.15em] font-semibold uppercase cursor-pointer text-center shadow-[0_4px_12px_rgba(255,255,255,0.05)]"
              >
                Kabul Et
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
