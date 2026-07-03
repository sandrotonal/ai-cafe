import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryItem {
  id: string;
  image: string;
  category: 'Mekan' | 'Kahve' | 'Çikolata';
  title: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: '1',
    image: '/images/cafe_interior.png',
    category: 'Mekan',
    title: 'Seiste Nişantaşı Amber Ambiyans'
  },
  {
    id: '2',
    image: '/images/specialty_coffee.png',
    category: 'Kahve',
    title: 'Nitelikli Kahve V60 Demleme Süreci'
  },
  {
    id: '3',
    image: '/images/chocolate_dessert.png',
    category: 'Çikolata',
    title: 'Artisan Çikolata Tabağımız'
  },
  {
    id: '4',
    image: '/images/chocolate_truffles.png',
    category: 'Çikolata',
    title: '24K Altın Yaprak Süslemeli İmza Trüfler'
  }
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<'Tümü' | 'Mekan' | 'Kahve' | 'Çikolata'>('Tümü');
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const filteredItems = galleryItems.filter(
    (item) => selectedCategory === 'Tümü' || item.category === selectedCategory
  );

  return (
    <div className="min-h-screen w-full bg-transparent text-white flex flex-col pt-24 pb-20 px-5 md:px-12 relative z-10 select-none overflow-y-auto">
      <div className="flex-1 max-w-5xl w-full mx-auto flex flex-col justify-start my-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-14"
        >
          <span className="text-[8px] font-sans tracking-[0.3em] text-white/30 uppercase font-semibold">
            ATÖLYEMİZDEN & MEKANIMIZDAN
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-light tracking-[0.1em] leading-tight uppercase mt-2">
            GALERİ.
          </h1>
          <p className="text-[11px] md:text-[12px] font-sans text-white/35 tracking-wider font-light mt-3 max-w-lg">
            Nişantaşı şubemizin loş tasarımı, zanaatkar üretim anları ve özel sunumlarımızdan kareler.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex gap-2 mb-10 border-b border-white/5 pb-2"
        >
          {(['Tümü', 'Mekan', 'Kahve', 'Çikolata'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-[9px] tracking-[0.2em] font-sans uppercase transition-all duration-300 border-b-2 cursor-pointer ${
                (selectedCategory === cat)
                  ? 'text-white/90 border-white/40 font-medium'
                  : 'text-white/25 border-transparent hover:text-white/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry-like Grid */}
        <div className="columns-1 sm:columns-2 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid relative rounded-2xl overflow-hidden border border-white/[0.04] bg-white/[0.01] cursor-pointer group hover:border-white/10 transition-all duration-500"
                onClick={() => setActiveImage(item.image)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* Overlay info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="text-[7px] font-sans tracking-widest uppercase text-white/50 mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-xs font-sans tracking-wide text-white/80">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl max-h-[85vh] relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeImage}
                alt="Seiste Detay Görseli"
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors bg-black/40 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                aria-label="Kapat"
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L15 15M1 15L15 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
