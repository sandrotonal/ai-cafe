import { motion } from 'framer-motion';

interface AboutProps {
  onNavigate: (view: 'home' | 'ai' | 'about' | 'contact') => void;
}

export default function About({ onNavigate }: AboutProps) {
  const chapters = [
    {
      num: '01',
      title: 'KÖKEN & SAFLIK',
      text: 'Çikolatalarımızda yalnızca sürdürülebilir tarım yapan mikro-lot üreticilerin kakao çekirdeklerini kullanıyoruz. Madagaskar, Ekvador ve Kolombiya kökenli saf kuvertürlerimizi Nişantaşı şubemizdeki cam bölmeli açık atölyede günlük olarak el işçiliğiyle işliyoruz.'
    },
    {
      num: '02',
      title: 'ZANAATKAR KAVURMA',
      text: 'Kahve demleme süreçlerimizde, çekirdeğin aroma potansiyelini en üst düzeye çıkaran hafif-orta kavurma profilini benimsiyoruz. V60 ve Chemex yöntemleriyle, narenciye, bergamot ve karamel notalarını en berrak haliyle fincanınıza aktarıyoruz.'
    },
    {
      num: '03',
      title: 'BÜTÜNSEL DENEYİM',
      text: 'Nişantaşı şubemizde sizleri sadece gurme lezzetleri tatmaya değil; mimari estetik, sakin caz tonları ve el yapımı çikolata kokusunun uyum sağladığı bütünsel bir gastronomi deneyimini yaşamaya davet ediyoruz.'
    }
  ];

  return (
    <div className="min-h-screen w-full bg-transparent text-white flex flex-col pt-24 pb-24 px-5 md:px-12 relative z-10 select-none">
      
      <div className="flex-1 max-w-5xl w-full mx-auto flex flex-col justify-center my-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-10 md:gap-0 md:grid md:grid-cols-12 items-start w-full"
        >
          {/* Left Column: Brand Header */}
          <div className="md:col-span-4 flex flex-col gap-6 md:border-r md:border-white/5 md:pr-10 w-full text-center md:text-left">
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-sans tracking-[0.3em] text-white/40 uppercase font-semibold">
                BİZİM HİKAYEMİZ
              </span>
              <h1 className="text-3xl md:text-5xl font-serif font-light tracking-[0.1em] leading-tight uppercase">
                SEISTE
                <br />
                SANATI.
              </h1>
            </div>
            
            <div className="flex flex-row md:flex-col gap-4 md:gap-1 border-t border-white/5 pt-4 mt-2 md:mt-auto justify-center md:justify-start">
              <span className="text-[9px] font-sans tracking-[0.2em] text-white/30 uppercase">EST. 2021</span>
              <span className="text-[9px] font-sans tracking-[0.2em] text-white/50 uppercase font-semibold">NİŞANTAŞI</span>
            </div>
          </div>

          {/* Right Column: Chapters */}
          <div className="md:col-span-8 md:pl-10 flex flex-col gap-0 w-full">
            {chapters.map((ch, i) => (
              <motion.div 
                key={ch.num}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * (i + 1), duration: 0.6 }}
                className={`flex flex-col gap-2.5 py-5 ${i > 0 ? 'border-t border-white/5' : ''}`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-sans tracking-[0.2em] text-white/25">{ch.num}</span>
                  <span className="text-[9px] font-sans tracking-[0.2em] text-white/45 uppercase font-medium">{ch.title}</span>
                </div>
                <p className="text-[11px] md:text-[13px] leading-relaxed text-white/65 font-light">
                  {ch.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Compact Buttons — Always Side-by-Side */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-row gap-2.5 items-center justify-center w-full mt-10 md:mt-16"
        >
          <button
            onClick={() => onNavigate('ai')}
            className="px-4 py-2 border border-white/15 rounded-full text-[8px] sm:text-[9px] tracking-[0.18em] font-sans font-medium uppercase text-white/90 bg-white/[0.02] hover:bg-white hover:text-black hover:border-white transition-all duration-500 cursor-pointer whitespace-nowrap"
          >
            YAPAY ZEKA
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-4 py-2 border border-white/15 rounded-full text-[8px] sm:text-[9px] tracking-[0.18em] font-sans font-medium uppercase text-white/90 bg-white/[0.02] hover:bg-white hover:text-black hover:border-white transition-all duration-500 cursor-pointer whitespace-nowrap"
          >
            İLETİŞİM
          </button>
        </motion.div>
      </div>

    </div>
  );
}
