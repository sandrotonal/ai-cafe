import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Kahve' | 'Çikolata' | 'Yaşam';
  readTime: string;
  date: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'ÜÇÜNCÜ NESİL KAHVE KÜLTÜRÜ: NİTELİKLİ ÇEKİRDEKLERİN SIRRI',
    excerpt: 'SCA 85+ puanlama standardı, mikro-lot çiftliklerin önemi ve bir fincan kahvenin arkasındaki zanaatkar süreçler.',
    content: `Üçüncü nesil kahve akımı, kahveyi yalnızca sabahları zinde kalmak için içilen kafeinli bir içecek olmaktan çıkarıp şarap gibi derinlemesine tadım notaları olan bir zanaat ürününe dönüştürdü.\n\nSeiste'de sunduğumuz tüm kahveler, kahve dünyasının en seçkin çekirdeklerini kapsayan SCA (Specialty Coffee Association) standartlarında 85 üzeri puan alan mikro-lot hasatlardan oluşmaktadır. Peki mikro-lot nedir? Mikro-lot, bir çiftliğin yalnızca belirli bir yamacında, özel hava koşullarında yetiştirilen ve diğer kahvelerle karıştırılmadan özel olarak işlenen sınırlı üretim kahvelerdir.\n\nEtiyopya Yirgacheffe çekirdeklerimizin sunduğu yasemin çiçeği, şeftali ve bergamot notaları, tamamen bu coğrafi yapının ve hafif-orta kavurma profilimizin bir sonucudur. Her yudumda doğanın ve emeğin hikayesini hissetmeniz için çekirdeklerin karakterini koruyoruz.`,
    category: 'Kahve',
    readTime: '4 dk okuma',
    date: '2026-06-15',
    image: '/images/specialty_coffee.png'
  },
  {
    id: '2',
    title: 'BELÇİKA ÇİKOLATASI ŞEKİLLENDİRME VE SAF KAKAO YAĞININ ÖNEMİ',
    excerpt: 'Geleneksel temperleme teknikleri, palm yağı içermeyen %100 kakao yağı kullanımı ve artizan trüflerin yapım hikayesi.',
    content: `Gerçek çikolata, kakao kitlesi ve saf kakao yağının kusursuz birleşimiyle doğar. Endüstriyel çikolataların aksine, artizan Belçika çikolatalarımızda palm yağı gibi yabancı bitkisel yağlar asla yer bulamaz. %100 kakao yağı kullanımı, çikolatanın vücut sıcaklığında (36.5°C) pürüzsüzce erimesini ve ağızda ipeksi bir his bırakmasını sağlar.\n\nAtölyemizde uyguladığımız mermer üstünde temperleme tekniği, çikolatanın kristal yapısını en kararlı hale getirme sanatıdır. Bu süreç, çikolataya o karakteristik parlak görünümünü ve kırıldığında çıkardığı tok sesi kazandırır. \n\nMadagaskar kökenli tek köken %74 kakao içeren imza trüflerimizi hazırlarken taze krema ve altın yapraklar kullanıyoruz. Her parça, Nişantaşı atölyemizde el işçiliği ile şekillendirilir.`,
    category: 'Çikolata',
    readTime: '5 dk okuma',
    date: '2026-06-28',
    image: '/images/chocolate_dessert.png'
  },
  {
    id: '3',
    title: 'NİŞANTAŞI\'NDA DUYUSAL BİR MOLA: RESTORAN VE ESTETİK İLİŞKİSİ',
    excerpt: 'Amber tonlarında loş ışıklar, dingin caz melodileri ve taze çikolata kokusunun bütünsel gastronomi deneyimine etkisi.',
    content: `Gastronomi sadece tat duyusuyla sınırlı değildir; gözün gördüğü, kulağın işittiği ve burnun hissettiği her şey tabağın lezzetini doğrudan etkiler. Bu felsefeden yola çıkarak Seiste Nişantaşı\'nda duyusal tasarımı ön planda tuttuk.\n\nİç mimarimizde kullandığımız koyu ahşap tonları, loş amber ışıklandırma ve pirinç detaylar, misafirlerimize şehrin karmaşasından uzak, dingin bir sığınak sunuyor. Arka planda süzülen 1950\'ler analog caz plakları, zihni yavaşlatmaya davet ederken, açık atölyemizden yayılan sıcak kakao kokusu iştahı ve duyuları uyandırıyor.\n\nSommelier konseptimiz sayesinde kahve ve çikolatanın birbirini ezmeden, asidite ve tatlılık dengesini koruyarak nasıl eşleştiğini keşfedebilir, Nişantaşı\'nın ortasında zamansız bir anı deneyimleyebilirsiniz.`,
    category: 'Yaşam',
    readTime: '3 dk okuma',
    date: '2026-07-02',
    image: '/images/cafe_interior.png'
  }
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<'Tümü' | 'Kahve' | 'Çikolata' | 'Yaşam'>('Tümü');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const filteredPosts = blogPosts.filter(
    (post) => selectedCategory === 'Tümü' || post.category === selectedCategory
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
            SEISTE NOTLARI
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-light tracking-[0.1em] leading-tight uppercase mt-2">
            HİKAYELER & BLOG.
          </h1>
          <p className="text-[11px] md:text-[12px] font-sans text-white/35 tracking-wider font-light mt-3 max-w-lg">
            Nitelikli kahve dünyası, kakao çekirdeklerinin işleme süreçleri ve gastronomiye dair derinlemesine yazılarımız.
          </p>
        </motion.div>

        {/* Filter Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex gap-2 mb-10 border-b border-white/5 pb-2"
        >
          {(['Tümü', 'Kahve', 'Çikolata', 'Yaşam'] as const).map((cat) => (
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

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-4 bg-white/[0.015] border border-white/[0.04] p-5 rounded-2xl group hover:border-white/10 transition-colors duration-500 cursor-pointer"
                onClick={() => setActivePost(post)}
              >
                <div className="h-44 w-full rounded-lg overflow-hidden relative">
                  <div
                    style={{ backgroundImage: `url(${post.image})` }}
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-sans tracking-widest uppercase text-white/80 border border-white/5">
                    {post.category}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[8px] font-sans tracking-wider text-white/20">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-xs md:text-sm font-sans tracking-[0.06em] leading-snug font-medium text-white/80 group-hover:text-white transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-[10px] md:text-[11px] text-white/35 font-light leading-relaxed tracking-wide">
                    {post.excerpt}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {activePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.96, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 15, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 28 }}
              className="w-full max-w-2xl bg-[#0d0807]/95 border border-white/10 p-6 md:p-8 rounded-3xl relative overflow-y-auto max-h-[85vh] shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors cursor-pointer"
                aria-label="Kapat"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L15 15M1 15L15 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              <span className="text-[8px] font-sans tracking-[0.25em] text-white/30 uppercase font-semibold">
                {activePost.category} · {activePost.date}
              </span>

              <h2 className="text-base md:text-xl font-serif tracking-[0.06em] text-white/90 uppercase mt-2 mb-4 leading-snug">
                {activePost.title}
              </h2>

              <div className="h-48 md:h-64 w-full rounded-xl overflow-hidden relative mb-6">
                <div
                  style={{ backgroundImage: `url(${activePost.image})` }}
                  className="absolute inset-0 bg-cover bg-center"
                />
              </div>

              <div className="text-[11px] md:text-xs text-white/50 leading-[1.8] font-light space-y-4 tracking-wide">
                {activePost.content.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
