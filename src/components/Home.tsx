import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ViewType = 'home' | 'menu' | 'ai' | 'about' | 'contact' | 'cookies' | 'privacy' | 'terms';

interface HomeProps {
  onNavigate: (view: ViewType) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/images/cafe_interior.png',
      title: 'KAHVE & ÇİKOLATA.',
      subtitle: 'NİTELİKLİ KAHVE & ARTİZAN ÇİKOLATA',
      desc: 'Nisantasi\'nin kalbinde, duyulara hitap eden bir gastronomi deneyimi.'
    },
    {
      image: '/images/specialty_coffee.png',
      title: 'SANATSAL DEMLEME.',
      subtitle: 'TEK KÖKENLİ MİKRO-LOT ÇEKİRDEKLER',
      desc: 'Ethiopia Yirgacheffe, Panama Geisha, Colombia Supremo.'
    },
    {
      image: '/images/chocolate_dessert.png',
      title: 'ZANAATKAR LEZZET.',
      subtitle: 'EL YAPIMI SAF BELÇİKA ÇİKOLATASI',
      desc: 'Madagaskar kökenli %74 kakao, günlük taze üretim.'
    },
    {
      image: '/images/chocolate_truffles.png',
      title: 'ÖZEL SEÇKİLER.',
      subtitle: 'NİŞANTAŞI ATÖLYEMİZDEN GÜNLÜK',
      desc: '24K altın yaprağı süslemeli imza trüflerimiz.'
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
      
      {/* Full-Screen Hero Slider */}
      <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.5, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            className="absolute inset-0 bg-cover bg-center animate-ken-burns w-full h-full"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/80 z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col min-h-screen text-center px-5 pb-16 md:pb-20">
        
        {/* Hero Title — Center */}
        <div className="flex-1 flex flex-col justify-center items-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-[8px] md:text-[10px] font-sans tracking-[0.35em] text-white/40 uppercase font-semibold">
              {slides[currentSlide].subtitle}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-[0.08em] leading-tight text-white uppercase">
              {slides[currentSlide].title}
            </h1>
            <p className="text-[10px] md:text-xs font-sans text-white/35 tracking-wider max-w-sm font-light mt-1">
              {slides[currentSlide].desc}
            </p>

            {/* CTA Buttons — Desktop Only */}
            <div className="hidden md:flex items-center gap-3 mt-6">
              <button
                onClick={() => onNavigate('menu')}
                className="px-7 py-2.5 rounded-full border border-white/30 text-[9px] font-sans tracking-[0.2em] uppercase text-white bg-white/[0.04] hover:bg-white hover:text-black hover:border-white transition-all duration-500 cursor-pointer backdrop-blur-sm"
              >
                Menüyü Keşfet
              </button>
              <button
                onClick={() => onNavigate('ai')}
                className="px-7 py-2.5 rounded-full border border-white/10 text-[9px] font-sans tracking-[0.2em] uppercase text-white/60 bg-transparent hover:text-white hover:border-white/30 transition-all duration-500 cursor-pointer"
              >
                Rezervasyon
              </button>
            </div>
          </motion.div>
        </div>

        {/* Slide Indicator Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-500 rounded-full cursor-pointer ${
                idx === currentSlide
                  ? 'w-6 h-[3px] bg-white/60'
                  : 'w-[3px] h-[3px] bg-white/15 hover:bg-white/30'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Info Strip — Features */}
        <div className="hidden md:flex justify-center gap-12">
          {[
            { label: 'Single Origin', value: 'V60 & Chemex' },
            { label: 'Çikolata Atölyesi', value: 'Günlük Taze Üretim' },
            { label: 'Nişantaşı', value: 'Valikonağı Cad. No: 42' },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-0.5">
              <span className="text-[7px] font-sans tracking-[0.2em] text-white/20 uppercase font-semibold">{item.label}</span>
              <span className="text-[9px] font-sans text-white/40 tracking-wider">{item.value}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
