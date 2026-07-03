import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  name: string;
  description: string;
  tag?: string;
}

interface MenuCategory {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    id: 'single-origin',
    num: '01',
    title: 'SINGLE ORIGIN & DEMLEME',
    subtitle: 'Tek Kökenli Mikro-Lot Çekirdekler',
    items: [
      {
        name: 'Ethiopia Yirgacheffe',
        description: 'Yasemin çiçeği, bergamot, şeftali. Yüksek asiditeli, narin gövde.',
        tag: 'V60 / Chemex',
      },
      {
        name: 'Colombia Supremo',
        description: 'Karamelize şeker, kakao, kırmızı orman meyveleri. Dengeli, orta gövde.',
        tag: 'V60 / Chemex',
      },
      {
        name: 'Panama Geisha',
        description: 'Yasemin, mandalina, bal, bergamot. Nadide ve seçkin çekirdek.',
        tag: 'Special Reserve',
      },
    ],
  },
  {
    id: 'espresso',
    num: '02',
    title: 'ESPRESSO & KADİFE DOKULAR',
    subtitle: 'İmza Espresso Harmanımız',
    items: [
      {
        name: 'Espresso / Ristretto / Macchiato',
        description: 'Seiste özel harmanı. Yoğun, gövdeli, fındık kreması bitişli.',
      },
      {
        name: 'Cortado',
        description: 'Çift shot ristretto, kadifemsi sıcak süt dengesi.',
      },
      {
        name: 'Velvet Flat White',
        description: 'İnce mikro köpük, çift shot ristretto. Kadifemsi doku.',
      },
      {
        name: 'Signature Affogato',
        description: 'Vanilyalı dondurma, sıcak espresso, %70 Madagaskar çikolatası.',
        tag: 'İmza',
      },
      {
        name: 'Velvet Mocha',
        description: 'El yapımı bitter çikolata, double espresso, kadifemsi süt.',
        tag: 'İmza',
      },
    ],
  },
  {
    id: 'truffles',
    num: '03',
    title: 'ZANAATKAR TRÜFLER & TABLETLER',
    subtitle: 'El Yapımı Belçika Çikolatası',
    items: [
      {
        name: 'Gold Leaf Truffle',
        description: '%74 Madagaskar kakao, taze krema, 24K altın yaprağı süsleme.',
        tag: '24K',
      },
      {
        name: 'Belgian Sea Salt Truffle',
        description: 'Tuzlu karamel dolgulu, deniz tuzu kristalleri ile taçlanmış.',
      },
      {
        name: 'Pistachio Praline',
        description: 'Kavrulmuş Antep fıstığı ezmesi, bitter çikolata kubbesi.',
      },
      {
        name: 'Madagascar Origin Tablet',
        description: '%70 saf çikolata, narenciye ve odunsu asidite notaları.',
        tag: 'Tek Köken',
      },
    ],
  },
  {
    id: 'desserts',
    num: '04',
    title: 'GURME TATLILAR',
    subtitle: 'Atölyemizden Günlük Taze Üretim',
    items: [
      {
        name: 'Artisan Dome Dessert',
        description: 'Fındıklı pralin, frambuaz jölesi, çikolata mus. Günlük taze üretim.',
        tag: 'Chef\'s Pick',
      },
      {
        name: 'Signature Hot Chocolate',
        description: 'Eritilmiş Belçika çikolatası, organik krema, Madagaskar vanilyası.',
        tag: 'İmza',
      },
      {
        name: 'Seiste Tarte',
        description: 'Kakao sablesi, çikolatalı krem karamel, tuzlu tereyağı karameli.',
      },
    ],
  },
];

// Sommelier pairing data
const pairings: { coffee: string; chocolate: string; note: string }[] = [
  {
    coffee: 'Panama Geisha',
    chocolate: 'Gold Leaf Truffle',
    note: 'Yasemin aromasıyla altın truffle çikolatanın kakaolu yoğunluğu mükemmel denge.',
  },
  {
    coffee: 'Ethiopia Yirgacheffe',
    chocolate: 'Artisan Dome Dessert',
    note: 'Bergamotun çiçeksi notaları, frambuaz jölesinin meyvemsi asidite ile buluşması.',
  },
  {
    coffee: 'Velvet Mocha',
    chocolate: 'Pistachio Praline',
    note: 'Kakao gövdesi üzerinde kavrulmuş fıstığın yağlı dokusu ve tuzlu finale.',
  },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);

  const currentCategory = menuData.find((c) => c.id === activeCategory) ?? menuData[0];

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
            NİTELİKLİ KAHVE & ARTİZAN ÇİKOLATA
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-light tracking-[0.1em] leading-tight uppercase mt-2">
            MENÜMÜZ.
          </h1>
          <p className="text-[11px] md:text-[12px] font-sans text-white/35 tracking-wider font-light mt-3 max-w-lg">
            Tüm çekirdeklerimiz SCA 85+ puanlı, sürdürülebilir tarım sertifikalı mikro-lot üretimdir. 
            Çikolatalarımız günlük taze, %100 kakao yağı ile üretilir.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex gap-0 mb-10 border-b border-white/5 overflow-x-auto scrollbar-none"
        >
          {menuData.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 md:px-5 py-3 text-[8px] md:text-[9px] tracking-[0.18em] font-sans uppercase transition-all duration-300 border-b-2 cursor-pointer whitespace-nowrap ${
                activeCategory === category.id
                  ? 'text-white/90 border-white/40 font-medium'
                  : 'text-white/25 border-transparent hover:text-white/50'
              }`}
            >
              <span className="text-[7px] text-white/15 mr-1.5 font-mono">{category.num}</span>
              {category.title.split('&')[0].trim()}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
          >
            {/* Left: Category Info */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl md:text-2xl font-serif font-light tracking-[0.08em] text-white/90 uppercase leading-tight">
                  {currentCategory.title}
                </h2>
                <p className="text-[11px] md:text-[12px] font-serif italic text-white/40 font-light leading-relaxed">
                  "{currentCategory.subtitle}"
                </p>
              </div>

              {/* Decorative Watermark */}
              <div className="hidden md:flex items-end mt-auto">
                <span className="text-[80px] md:text-[120px] font-serif font-light text-white/[0.02] leading-none select-none">
                  {currentCategory.num}
                </span>
              </div>
            </div>

            {/* Right: Menu Items */}
            <div className="md:col-span-8 flex flex-col gap-0">
              {currentCategory.items.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.06 }}
                  className="flex flex-col gap-1.5 py-5 border-b border-white/[0.04] last:border-b-0 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[13px] md:text-sm font-sans font-medium tracking-[0.06em] text-white/85 group-hover:text-white transition-colors duration-300">
                      {item.name}
                    </h3>
                    {item.tag && (
                      <span className="text-[7px] font-sans tracking-[0.2em] uppercase text-white/30 border border-white/8 rounded-full px-2.5 py-0.5 whitespace-nowrap flex-shrink-0">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] md:text-[11px] font-sans text-white/35 font-light leading-relaxed tracking-wide max-w-md">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Sommelier Pairings Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 md:mt-20 pt-10 border-t border-white/5"
        >
          <div className="flex flex-col gap-2 mb-8">
            <span className="text-[8px] font-sans tracking-[0.3em] text-white/25 uppercase font-semibold">
              SOMMELIER ÖNERİSİ
            </span>
            <h2 className="text-lg md:text-2xl font-serif font-light tracking-[0.1em] text-white/80 uppercase">
              Eşleştirme Rehberi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pairings.map((pair, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                className="flex flex-col gap-3 p-5 rounded-2xl bg-white/[0.015] border border-white/[0.04] hover:border-white/[0.08] transition-colors duration-500"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[7px] font-sans tracking-[0.2em] text-white/20 uppercase font-semibold">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="w-4 h-[1px] bg-white/10" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-sans tracking-[0.1em] text-white/70 font-medium">
                    {pair.coffee}
                  </span>
                  <span className="text-[8px] font-sans tracking-[0.15em] text-white/25 uppercase">
                    × {pair.chocolate}
                  </span>
                </div>
                <p className="text-[9px] font-sans text-white/30 font-light leading-relaxed tracking-wide">
                  {pair.note}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Notice */}
        <div className="mt-12 pt-6 border-t border-white/[0.03] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[8px] font-sans text-white/20 tracking-wider leading-relaxed max-w-md">
            Tüm fiyatlar KDV dahildir. Mevsimsel ürün değişikliklerinde menü güncellenebilir.
            Alerjen bilgileri için lütfen baristayla görüşünüz.
          </p>
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[7px] font-sans tracking-[0.2em] text-white/15 uppercase font-semibold">SCA</span>
              <span className="text-[10px] font-serif text-white/40 font-light">85+</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[7px] font-sans tracking-[0.2em] text-white/15 uppercase font-semibold">Kakao</span>
              <span className="text-[10px] font-serif text-white/40 font-light">%70+</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[7px] font-sans tracking-[0.2em] text-white/15 uppercase font-semibold">Üretim</span>
              <span className="text-[10px] font-serif text-white/40 font-light">Günlük</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
