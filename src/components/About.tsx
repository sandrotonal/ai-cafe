import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function About() {
  const [activePillar, setActivePillar] = useState<'coffee' | 'chocolate' | 'atelier'>('coffee');

  const pillars = {
    coffee: {
      num: '01',
      title: 'KAHVE SANATI',
      tagline: 'Asidite ve aroma dengesini en berrak haliyle fincanınıza taşıyoruz.',
      text: 'Kahve demleme süreçlerimizde, çekirdeğin tüm aromatik potansiyelini en üst düzeye çıkaran hafif-orta kavurma profilini benimsiyoruz. Yalnızca sürdürülebilir tarım standartlarında üretilen, yüksek puanlı mikro-lot çekirdekleri tercih ediyoruz. V60 ve Chemex gibi nitelikli demleme yöntemleriyle; yasemin çiçeği, bergamot, mandalina ve karamel notalarını berrak bir gövdeyle sunuyoruz.',
      metrics: [
        { label: 'SCA Skoru', value: '85+', desc: 'Nitelikli Standart' },
        { label: 'Kavurma', value: 'Hafif-Orta', desc: 'Aroma Koruma' },
        { label: 'Demleme', value: 'V60 & Chemex', desc: 'Temiz Gövde' }
      ]
    },
    chocolate: {
      num: '02',
      title: 'ZANAATKAR ÇİKOLATA',
      tagline: 'El yapımı Belçika çikolatasını en saf kakao çekirdekleriyle işliyoruz.',
      text: 'Çikolatalarımızda yalnızca sürdürülebilir kakao tarımı yapan Madagaskar, Ekvador ve Kolombiya kökenli saf kuvertürler kullanıyoruz. Kakao yağının ve aromasının bozulmaması için geleneksel Belçika çikolatası işleme ve temperleme tekniklerini hassasiyetle uyguluyoruz. Taze krema dolguları ve kavrulmuş Antep fıstıklı pralinlerimizle gurme tatları buluşturuyoruz.',
      metrics: [
        { label: 'Kakao', value: '%70+ Madagaskar', desc: 'Mikro-Lot Köken' },
        { label: 'İçerik', value: '%100 Kakao Yağı', desc: 'Katkısız Saf' },
        { label: 'İmza', value: '24K Altın Yaprak', desc: 'El Yapımı Süsleme' }
      ]
    },
    atelier: {
      num: '03',
      title: 'ATÖLYE DENEYİMİ',
      tagline: 'Nişantaşı şubemizde gastronomi ve sanatı bir araya getiriyoruz.',
      text: 'Nişantaşı şubemizin bünyesinde yer alan cam bölmeli açık atölyemizde, tüm çikolata ve gurme tatlılarımız günlük olarak gözlerinizin önünde üretilir. Tasarım estetiğimiz, loş amber ışıklarımız, sakin caz melodilerimiz ve mekanda süzülen taze çikolata kokusuyla misafirlerimize yalnızca bir lezzet değil, duyulara hitap eden bütünsel bir gastronomi deneyimi yaşatıyoruz.',
      metrics: [
        { label: 'Atölye', value: 'Cam Bölmeli', desc: 'Canlı Üretim' },
        { label: 'Konum', value: 'Nişantaşı', desc: 'Valikonağı Cad.' },
        { label: 'Konsept', value: 'Bütünsel', desc: 'Duyusal Deneyim' }
      ]
    }
  };

  const pillarKeys = ['coffee', 'chocolate', 'atelier'] as const;
  const pillarLabels = ['Kahve', 'Çikolata', 'Atölye'];

  return (
    <div className="min-h-screen w-full bg-transparent text-white flex flex-col pt-24 pb-20 px-5 md:px-12 relative z-10 select-none">
      
      <div className="flex-1 max-w-5xl w-full mx-auto flex flex-col justify-center my-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-14"
        >
          <span className="text-[8px] font-sans tracking-[0.3em] text-white/30 uppercase font-semibold">
            EST. 2021 · NİŞANTAŞI
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-light tracking-[0.1em] leading-tight uppercase mt-2">
            BİZİM HİKAYEMİZ
          </h1>
        </motion.div>

        {/* Pillar Switcher — Inline elegant tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex gap-1 mb-10 border-b border-white/5 pb-0"
        >
          {pillarKeys.map((key, idx) => (
            <button
              key={key}
              onClick={() => setActivePillar(key)}
              className={`px-5 py-3 text-[9px] tracking-[0.2em] font-sans uppercase transition-all duration-300 border-b-2 cursor-pointer ${
                activePillar === key
                  ? 'text-white/90 border-white/40 font-medium'
                  : 'text-white/25 border-transparent hover:text-white/50'
              }`}
            >
              <span className="text-[7px] text-white/15 mr-2 font-mono">{String(idx + 1).padStart(2, '0')}</span>
              {pillarLabels[idx]}
            </button>
          ))}
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"
          >
            {/* Left: Title and Tagline */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <h2 className="text-xl md:text-3xl font-serif font-light tracking-[0.08em] text-white/90 uppercase leading-tight">
                {pillars[activePillar].title}
              </h2>
              <p className="text-[12px] md:text-[13px] font-serif italic text-white/50 font-light leading-relaxed max-w-md">
                "{pillars[activePillar].tagline}"
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/5">
                {pillars[activePillar].metrics.map((m, index) => (
                  <div key={index} className="flex flex-col gap-0.5">
                    <span className="text-[7px] font-sans tracking-[0.2em] text-white/20 uppercase font-semibold">
                      {m.label}
                    </span>
                    <span className="text-[11px] font-serif text-white/80 font-light tracking-wide">
                      {m.value}
                    </span>
                    <span className="text-[7px] text-white/25 font-sans tracking-wide">
                      {m.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Description */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <p className="text-[12px] md:text-[13px] leading-[1.9] text-white/45 font-light">
                {pillars[activePillar].text}
              </p>
              
              {/* Decorative Watermark */}
              <div className="flex items-end justify-end mt-auto">
                <span className="text-[80px] md:text-[120px] font-serif font-light text-white/[0.02] leading-none select-none">
                  {pillars[activePillar].num}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
