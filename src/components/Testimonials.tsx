import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Aylin Yılmaz',
    role: 'Gurme & Yemek Yazarı',
    text: 'Belçika çikolatasını bu kadar hassas temperleyen ve bunu SCA 85+ Panama Geisha ile bu denli kusursuz eşleştiren İstanbul\'da başka bir yer yok. Atmosfer tek kelimeyle büyüleyici.',
    rating: 5
  },
  {
    id: '2',
    name: 'Can Demir',
    role: 'Kahve Sever',
    text: 'Etiyopya V60 demlemelerindeki floral asiditeyi bardağa tam yansıtabilmişler. Dijital sommelier asistanı ile rezervasyon yapıp gitmek de çok yenilikçi bir deneyimdi.',
    rating: 5
  },
  {
    id: '3',
    name: 'Derin Kaya',
    role: 'Müdavim',
    text: 'Nişantaşı\'nın kalbinde ama karmaşasından o kadar uzak ki. Amber ışıkları, fondaki caz melodileri ve cam bölmeden izleyebildiğiniz çikolata atölyesiyle kendinizi Paris\'te hissettiriyor.',
    rating: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-transparent text-white flex flex-col pt-24 pb-20 px-5 md:px-12 relative z-10 select-none overflow-y-auto">
      <div className="flex-1 max-w-3xl w-full mx-auto flex flex-col justify-center my-auto py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-14 text-center"
        >
          <span className="text-[8px] font-sans tracking-[0.3em] text-white/30 uppercase font-semibold">
            MİSAFİR YORUMLARI
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-light tracking-[0.1em] leading-tight uppercase mt-2">
            DENEYİMLER.
          </h1>
          <div className="w-12 h-[1px] bg-white/10 mx-auto mt-4" />
        </motion.div>

        {/* Carousel Slider */}
        <div className="relative min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="text-center flex flex-col items-center gap-5 px-6 max-w-xl"
            >
              {/* Stars */}
              <div className="flex gap-1 text-[10px] text-glow">
                {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                  <span key={i} className="text-[#d4af37]">★</span>
                ))}
              </div>

              {/* Text */}
              <p className="text-sm md:text-base font-serif italic text-white/60 font-light leading-relaxed">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-sans tracking-[0.15em] font-medium text-white/80 uppercase">
                  {testimonials[currentIndex].name}
                </span>
                <span className="text-[8px] font-sans tracking-widest text-white/20 uppercase">
                  {testimonials[currentIndex].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Indicators */}
        <div className="flex justify-center gap-2.5 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-500 rounded-full cursor-pointer h-[3px] ${
                idx === currentIndex
                  ? 'w-6 bg-white/60'
                  : 'w-[3px] bg-white/15 hover:bg-white/30'
              }`}
              aria-label={`Yorum ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
