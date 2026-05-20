import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HomeProps {
  onNavigate: (view: 'home' | 'ai' | 'about' | 'contact') => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/images/cafe_interior.png',
      title: 'KAHVE & ÇİKOLATA?',
      subtitle: 'NİTELİKLİ KAHVE & ARTİZAN ÇİKOLATA'
    },
    {
      image: '/images/specialty_coffee.png',
      title: 'SANATSAL DEMLEME.',
      subtitle: 'TEK KÖKENLİ MİKRO-LOT ÇEKİRDEKLER'
    },
    {
      image: '/images/chocolate_dessert.png',
      title: 'ZANAATKAR LEZZET.',
      subtitle: 'EL YAPIMI SAF BELÇİKA ÇİKOLATASI'
    },
    {
      image: '/images/chocolate_truffles.png',
      title: 'ÖZEL SEÇKİLER.',
      subtitle: 'NİŞANTAŞI ATÖLYEMİZDEN GÜNLÜK'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-black select-none">
      
      {/* Full-Screen Hero Slider — High Clarity */}
      <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 0.55, scale: 1.01 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            className="absolute inset-0 bg-cover bg-center animate-ken-burns w-full h-full"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 z-10" />
      </div>

      {/* Core Content — Vertically Centered, Buttons Pinned Lower */}
      <div className="relative z-20 flex flex-col min-h-screen text-center px-5">
        
        {/* Upper Spacer — pushes title to upper-center */}
        <div className="flex-1 flex flex-col justify-center items-center pt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <span className="text-[9px] md:text-xs font-sans tracking-[0.3em] text-white/50 uppercase mb-4 font-semibold">
              {slides[currentSlide].subtitle}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-8xl font-serif font-light tracking-[0.1em] leading-tight text-white uppercase drop-shadow-2xl">
              {slides[currentSlide].title}
            </h1>
          </motion.div>
        </div>

        {/* Buttons — Fixed Row, Always Side-by-Side, Pinned to Bottom Area */}
        <div className="pb-20 md:pb-24 flex justify-center">
          <div className="flex flex-row gap-2.5 items-center justify-center">
            <button
              onClick={() => onNavigate('ai')}
              className="px-4 py-2 border border-white/15 rounded-full text-[8px] sm:text-[9px] tracking-[0.18em] font-sans font-medium uppercase text-white/90 bg-white/[0.02] hover:bg-white hover:text-black hover:border-white transition-all duration-500 cursor-pointer whitespace-nowrap"
            >
              YAPAY ZEKA
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="px-4 py-2 border border-white/15 rounded-full text-[8px] sm:text-[9px] tracking-[0.18em] font-sans font-medium uppercase text-white/90 bg-white/[0.02] hover:bg-white hover:text-black hover:border-white transition-all duration-500 cursor-pointer whitespace-nowrap"
            >
              HİKAYEMİZ
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-2 border border-white/15 rounded-full text-[8px] sm:text-[9px] tracking-[0.18em] font-sans font-medium uppercase text-white/90 bg-white/[0.02] hover:bg-white hover:text-black hover:border-white transition-all duration-500 cursor-pointer whitespace-nowrap"
            >
              İLETİŞİM
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
