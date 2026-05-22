import { motion } from 'framer-motion';

type LegalTab = 'cookies' | 'privacy' | 'terms';

interface LegalProps {
  activeTab: LegalTab;
  setActiveTab: (tab: LegalTab) => void;
}

export default function Legal({ activeTab, setActiveTab }: LegalProps) {
  const tabs = [
    { id: 'cookies' as LegalTab, label: 'ÇEREZ POLİTİKASI' },
    { id: 'privacy' as LegalTab, label: 'GİZLİLİK POLİTİKASI' },
    { id: 'terms' as LegalTab, label: 'KULLANIM KOŞULLARI' },
  ];

  return (
    <div className="min-h-screen w-full bg-transparent text-white flex flex-col pt-24 pb-20 px-5 md:px-12 relative z-10 select-none overflow-y-auto">
      <div className="flex-1 max-w-4xl w-full mx-auto flex flex-col justify-center my-auto py-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-10"
        >
          <span className="text-[8px] font-sans tracking-[0.3em] text-white/70 uppercase font-semibold">
            BİLGİ & YASAL METİNLER
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-light tracking-[0.1em] leading-tight uppercase mt-2">
            POLİTİKALARIMIZ.
          </h1>
        </motion.div>

        {/* Tab Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 w-full items-start">
          
          {/* Tab Selection Navigation (Left Sidebar on Desktop, Top Row on Mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-none md:border-r md:border-white/10 md:pr-6 md:min-h-[250px]"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2.5 px-4 md:px-0 text-[10px] md:text-[11px] font-sans tracking-[0.2em] uppercase text-left transition-all duration-300 whitespace-nowrap cursor-pointer relative ${
                  activeTab === tab.id
                    ? 'text-white font-semibold'
                    : 'text-white/40 hover:text-white/80'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="legalActiveLine"
                    className="absolute bottom-0 left-4 right-4 md:left-0 md:right-auto md:top-0 md:bottom-0 md:w-[2px] bg-white"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* Policy Content Viewer */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.4 }}
            className="md:col-span-3 flex flex-col gap-6 text-[12px] md:text-[13px] leading-relaxed text-white/85 font-light max-w-2xl"
          >
            {activeTab === 'cookies' && (
              <div className="flex flex-col gap-5">
                <h2 className="text-sm font-serif tracking-[0.1em] text-white uppercase font-normal border-b border-white/20 pb-2">
                  ÇEREZ POLİTİKASI (COOKIE POLICY)
                </h2>
                <p>
                  Seiste Cafe & Restaurant olarak, web sitemizdeki kullanıcı deneyiminizi geliştirmek, 
                  Yapay Zeka Sommelier entegrasyonumuzla yaptığınız etkileşimleri optimize etmek ve tercihlerinizi 
                  hatırlamak amacıyla çerezlerden (cookies) yararlanmaktayız.
                </p>

                <div className="flex flex-col gap-2.5">
                  <h3 className="text-[11px] font-sans tracking-widest text-white/95 uppercase font-semibold">
                    1. Çerez Nedir?
                  </h3>
                  <p>
                    Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız vasıtasıyla cihazınıza (bilgisayar, 
                    akıllı telefon, tablet) kaydedilen ve site içerisindeki ayarlarınızı, rezervasyon aşamalarınızı 
                    ve dijital sommelier sohbet geçmişinizi yerel olarak depolayan küçük metin dosyalarıdır.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5">
                  <h3 className="text-[11px] font-sans tracking-widest text-white/95 uppercase font-semibold">
                    2. Kullandığımız Çerez Türleri
                  </h3>
                  <ul className="list-disc pl-5 flex flex-col gap-2">
                    <li>
                      <strong className="text-white/95">Zorunlu Çerezler:</strong> Web sitemizin güvenli bir şekilde 
                      çalışması ve rezervasyon işlemleri gibi temel işlevleri yerine getirmesi için zorunludur.
                    </li>
                    <li>
                      <strong className="text-white/95">Performans ve Analiz Çerezleri:</strong> Sitemizi nasıl 
                      kullandığınızı anonim olarak analiz ederek, sayfa açılış hızlarını ve etkileşimleri 
                      iyileştirmemizi sağlar.
                    </li>
                    <li>
                      <strong className="text-white/95">Fonksiyonel Çerezler:</strong> Yapay Zeka Sommelier ile yaptığınız 
                      tercihleri (örn. kahve veya çikolata zevkleri) cihazınızda geçici olarak saklayarak 
                      kişiselleştirilmiş önerileri kolaylaştırır.
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-2.5">
                  <h3 className="text-[11px] font-sans tracking-widest text-white/95 uppercase font-semibold">
                    3. Çerezleri Nasıl Yönetebilirsiniz?
                  </h3>
                  <p>
                    Tarayıcınızın ayarlarından çerez kullanımını tamamen devre dışı bırakabilir veya tercihlerinizi 
                    güncelleyebilirsiniz. Ancak zorunlu çerezlerin engellenmesi durumunda, Seiste web sitesi üzerindeki 
                    sommelier sohbeti ve anlık rezervasyon modülü gibi bazı özellikler işlevselliğini yitirebilir.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="flex flex-col gap-5">
                <h2 className="text-sm font-serif tracking-[0.1em] text-white uppercase font-normal border-b border-white/20 pb-2">
                  GİZLİLİK POLİTİKASI (PRIVACY POLICY)
                </h2>
                <p>
                  Seiste ekibi olarak, siz değerli misafirlerimizin gizliliğine son derece önem veriyoruz. 
                  Bu politika, web sitemiz üzerinden elde edilen kişisel verilerinizin toplanması, korunması ve 
                  KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında işlenmesi esaslarını açıklamaktadır.
                </p>

                <div className="flex flex-col gap-2.5">
                  <h3 className="text-[11px] font-sans tracking-widest text-white/95 uppercase font-semibold">
                    1. Toplanan Kişisel Veriler
                  </h3>
                  <ul className="list-disc pl-5 flex flex-col gap-1.5">
                    <li><strong className="text-white/95">İletişim Bilgileri:</strong> İsim, e-posta adresi ve telefon numarası.</li>
                    <li><strong className="text-white/95">Rezervasyon Detayları:</strong> Rezervasyon tarihi, saati, kişi sayısı ve özel notlar.</li>
                    <li><strong className="text-white/95">İletişim Formu Verileri:</strong> Bize gönderdiğiniz mesajların içeriği.</li>
                    <li><strong className="text-white/95">Yapay Zeka Kayıtları:</strong> Sommelier ile yapılan sohbetlerin anonim veri analizleri.</li>
                  </ul>
                </div>

                <div className="flex flex-col gap-2.5">
                  <h3 className="text-[11px] font-sans tracking-widest text-white/95 uppercase font-semibold">
                    2. Verilerin Kullanım Amaçları
                  </h3>
                  <p>
                    Toplanan kişisel bilgileriniz yalnızca rezervasyon doğrulaması yapmak, iletişim formları üzerinden 
                    taleplerinize cevap vermek, şikayet veya önerilerinizi incelemek ve dijital sommelier servisimizin 
                    kalitesini artırmak amaçlarıyla sınırlandırılmıştır.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5">
                  <h3 className="text-[11px] font-sans tracking-widest text-white/95 uppercase font-semibold">
                    3. Üçüncü Taraflarla Paylaşım ve Veri Güvenliği
                  </h3>
                  <p>
                    Verileriniz, Seiste güvencesi altında şifreli veri tabanlarında korunur. KVKK ve yasal yükümlülükler 
                    haricinde kişisel verileriniz hiçbir reklam verenle, üçüncü parti kurumla veya şahısla ticari 
                    amaçla paylaşılmaz veya satılmaz.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="flex flex-col gap-5">
                <h2 className="text-sm font-serif tracking-[0.1em] text-white uppercase font-normal border-b border-white/20 pb-2">
                  KULLANIM KOŞULLARI (TERMS OF USE)
                </h2>
                <p>
                  Seiste Cafe & Restaurant web sitesine hoş geldiniz. Sitemizi ziyaret ederek, tarayarak ve 
                  hizmetlerimizi (Yapay Zeka Sommelier, İletişim Formları vb.) kullanarak aşağıda belirtilen 
                  kullanım koşullarını kayıtsız şartsız kabul etmiş sayılırsınız.
                </p>

                <div className="flex flex-col gap-2.5">
                  <h3 className="text-[11px] font-sans tracking-widest text-white/95 uppercase font-semibold">
                    1. Fikri ve Sınai Mülkiyet Hakları
                  </h3>
                  <p>
                    Bu web sitesinde yer alan grafikler, kahve ve çikolata sunumları, animasyonlar, logolar, 
                    kod mimarisi ve tüm özgün metinler Seiste'ye aittir. Yazılı izin alınmaksızın bunların 
                    kopyalanması, çoğaltılması veya ticari mecralarda kullanılması kesinlikle yasaktır.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5">
                  <h3 className="text-[11px] font-sans tracking-widest text-white/95 uppercase font-semibold">
                    2. Yapay Zeka Sommelier Sorumluluk Sınırı
                  </h3>
                  <p>
                    Yapay Zeka Sommelier dijital concierge asistanımız, nitelikli kahve ve zanaatkar çikolata 
                    konularında size bilgilendirici tavsiyeler sunar. Sohbet esnasında verilen öneriler tamamen 
                    tavsiye niteliğinde olup, tıbbi bir teşhis, diyetisyen onayı veya alerjen garantisi teşkil etmez. 
                    Alerjiniz olan bileşenler hakkında lütfen doğrudan fiziksel restoranımızdaki uzman barista ve 
                    garsonlarımızdan bilgi talep ediniz.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5">
                  <h3 className="text-[11px] font-sans tracking-widest text-white/95 uppercase font-semibold">
                    3. Rezervasyon ve İletişim Kuralları
                  </h3>
                  <p>
                    Web sitemiz üzerinden yapılan rezervasyonlarda girilen tüm bilgilerin (telefon, isim, e-posta) 
                    doğru olduğu kabul edilir. Yanıltıcı bilgi girilmesinden veya iptal durumlarının en az 2 saat öncesinden 
                    bildirilmemesinden kaynaklanan aksaklıklardan Seiste sorumlu tutulamaz.
                  </p>
                </div>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
