import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: '1',
    question: 'Vegan içecek ve çikolata seçenekleriniz var mı?',
    answer: 'Evet. Tüm kahve seçeneklerimizde yulaf ve badem sütü alternatifi sunuyoruz. Ayrıca Madagascar Origin çikolata tabletlerimiz tamamen vegan dostudur ve %100 kakao yağı ile hazırlanır.'
  },
  {
    id: '2',
    question: 'Glutensiz ürünleriniz mevcut mu?',
    answer: 'Tüm trüf ve tablet çikolatalarımız doğal olarak gluten içermez. Ancak, mutfağımızda unlu mamüller de hazırlandığı için çapraz bulaşma riskine karşı alerjisi olan misafirlerimizin sipariş öncesinde baristalarımıza bilgi vermesini rica ederiz.'
  },
  {
    id: '3',
    question: 'Masa rezervasyonu yapmak zorunlu mu?',
    answer: 'Zorunlu değildir ancak Nişantaşı şubemizin yoğunluğu nedeniyle özellikle hafta sonları web sitemizdeki AI Sommelier veya +90 (212) 555 45 45 numaralı telefon üzerinden rezervasyon yapmanızı tavsiye ederiz.'
  },
  {
    id: '4',
    question: 'Çikolata yapım atölyeleriniz (workshop) var mı?',
    answer: 'Evet, ayda iki kez düzenlediğimiz artisan çikolata yapım ve kahve cupping (tadım) atölyelerimiz mevcuttur. Detaylı bilgi ve katılım için contact@seiste.com adresine yazabilirsiniz.'
  },
  {
    id: '5',
    question: 'Evcil hayvanları kabul ediyor musunuz?',
    answer: 'Kesinlikle! Seiste evcil hayvan dostu (pet-friendly) bir mekandır. Dış oturma alanımızda sevimli dostlarınızla birlikte keyifle vakit geçirebilirsiniz.'
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  // Dynamic FAQ Page Schema Injection
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqItems.map((item) => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('faq-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-transparent text-white flex flex-col pt-24 pb-20 px-5 md:px-12 relative z-10 select-none overflow-y-auto">
      <div className="flex-1 max-w-3xl w-full mx-auto flex flex-col justify-start my-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-14"
        >
          <span className="text-[8px] font-sans tracking-[0.3em] text-white/30 uppercase font-semibold">
            SIKÇA SORULAN SORULAR
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-light tracking-[0.1em] leading-tight uppercase mt-2">
            SSS & YARDIM.
          </h1>
          <p className="text-[11px] md:text-[12px] font-sans text-white/35 tracking-wider font-light mt-3 max-w-lg">
            Seiste deneyimi, rezervasyon, ürün içerikleri ve atölyelerimiz hakkında en çok yöneltilen sorular.
          </p>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-4">
          {faqItems.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white/[0.01] border border-white/[0.04] rounded-2xl overflow-hidden hover:border-white/10 transition-colors duration-500"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full text-left py-5 px-6 flex justify-between items-center cursor-pointer focus:outline-none"
                >
                  <span className="text-xs md:text-sm font-sans tracking-[0.05em] text-white/80 font-medium">
                    {item.question}
                  </span>
                  <span className="text-white/30 transition-transform duration-300">
                    {isOpen ? (
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    >
                      <div className="px-6 pb-6 pt-1 text-[11px] md:text-xs font-sans text-white/40 font-light leading-relaxed tracking-wide">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
