import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

interface BookingState {
  step: 'none' | 'day' | 'people' | 'time' | 'name' | 'confirm';
  day?: string;
  people?: string;
  time?: string;
  name?: string;
}

interface AIChatProps {
  initialHasStarted: boolean;
}

export default function AIChat({ initialHasStarted }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasStarted, setHasStarted] = useState(initialHasStarted);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [booking, setBooking] = useState<BookingState>({ step: 'none' });
  const [userName, setUserName] = useState<string | null>(null);
  const [userPreference, setUserPreference] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (hasStarted) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, hasStarted]);

  // Comprehensive Menu and Information database
  const menuDatabase = {
    coffees: `
SEISTE NITELIKLI KAHVE KÜTÜPHANESI:

1. Demleme Seçenekleri (Single Origin & Special Reserve):
- **Ethiopia Yirgacheffe (V60 / Chemex)**: Yasemin çiçeği, bergamot ve şeftali notaları barındıran, yüksek asiditeli ve narin gövdeli bir Afrika klasiği.
- **Colombia Supremo (V60 / Chemex)**: Karamelize şeker, kakao ve kırmızı orman meyveleri tonları sunan, dengeli ve orta gövdeli bir Güney Amerika klasiği.
- **Panama Geisha (Special Reserve)**: Yasemin çiçeği, mandalina, bal ve bergamot aromaları içeren, kahve dünyasının en seçkin ve nadide çekirdeklerinden biri.

2. Espresso ve Kadife Dokular:
- **Espresso / Ristretto / Macchiato**: Kendi özel Seiste harmanımızdan üretilen yoğun, gövdeli ve fındık kreması bitişli klasik shotlar.
- **Cortado**: Çift shot ristretto espresso ile eşit miktarda taze, kadifemsi sıcak süt dengesi.
- **Velvet Flat White**: İnce bir mikro köpük tabakasıyla hazırlanan çift shot ristretto espresso ve süt uyumu.
- **Seiste Signature Affogato**: Organik vanilyalı dondurma yatağında taze çekilmiş sıcak espresso ve rendelenmiş %70 Madagaskar çikolatası.
- **Velvet Mocha**: Eritilmiş el yapımı bitter çikolata, double espresso ve kadifemsi sütün kusursuz uyumu.
    `,
    chocolates: `
SEISTE EL YAPIMI GURME ÇIKOLATA & TATLI SEÇKISI:

1. Zanaatkar Trüfler & Tabletler:
- **Seiste Gold Leaf Truffle**: %74 Madagaskar kakao çekirdeklerinden el yapımı üretilen, taze krema dolgulu ve yenilebilir 24 ayar altın yaprağı süslemeli imza Belçika trüfü.
- **Belgian Sea Salt Truffle**: Tuzlu karamel dolgulu, dışı ince deniz tuzu kristalleriyle kaplı sütlü gurme trüf.
- **Pistachio Praline**: Kavrulmuş Antep fıstığı ezmesi dolgulu, dışı kıtır parçacıklı el yapımı bitter çikolata kubbesi.
- **Madagascar Origin Tablet**: Madagaskar'ın özel mikro-lot bahçelerinden toplanan kakao çekirdekleriyle üretilen, narenciye ve odunsu asidite içeren %70 saf çikolata.

2. Gurme Tatlılar (Patisserie):
- **Artisan Dome Dessert**: Alt tabanında kıtır fındıklı pralin, orta katmanında taze frambuaz jölesi ve dış kaplamasında kadife dokulu çikolata mus bulunan gurme tatlımız.
- **Signature Hot Chocolate (Sıcak Çikolata Şelalesi)**: Akışkan, eritilmiş sıcak Belçika çikolatası, organik krema ve vanilya çubuğu infüzyonu ile hazırlanan yoğun kıvamlı sıcak içecek.
- **Seiste Tarte**: Kakao sablesi üzerinde fırınlanmış çikolatalı krem karamel ve tuzlu tereyağı karameli dolgulu tart.
    `,
    location: `
SEISTE CAFE KONUM & İLETIŞIM BILGILERI:

- **Şubemiz**: Nişantaşı, İstanbul.
- **Açık Adres**: Valikonağı Caddesi No: 42, Nişantaşı, Şişli / İstanbul (Harbiye Metro istasyonuna 5 dakika yürüme mesafesinde).
- **Telefon**: +90 (212) 555 45 45.
- **Çalışma Saatleri**: 
  - Hafta içi (Pazartesi - Cuma): 09:00 - 23:00
  - Hafta sonu (Cumartesi - Pazar): 09:00 - 00:00
- **Çikolata Üretim Atölyesi**: Tüm çikolata ve tatlılarımız Nişantaşı şubemizin bünyesindeki cam bölmeli açık atölyede günlük olarak taze üretilmektedir.
    `,
    story: `
SEISTE HIKAYESI:

Seiste, nitelikli kahve kültürü ile el yapımı gurme çikolata sanatını aynı çatı altında birleştiren lüks bir gastronomi projesidir. Belçika çikolatası işleme tekniklerini, dünya üzerindeki özel mikro-lot kahve çiftliklerinden getirdiğimiz çekirdeklerle harmanlıyoruz. Nişantaşı şubemizde misafirlerimize sadece bir ürün değil; tasarım estetiği, müzik, koku ve tat duyularının birleştiği sanatsal bir gastronomi deneyimi sunuyoruz.
    `
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Check if it is the first interaction to change layout view
    if (!hasStarted) {
      setHasStarted(true);
    }

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Context Parsing
    const query = text.toLowerCase();
    
    // Turkish name extraction regex patterns
    let detectedName = userName;
    const nameMatch = text.match(/(?:adım|ismim|adım\s+is|ismim\s+is)\s+([A-Za-zĞüşıöçĞÜŞİÖÇ]+)/i) || 
                      text.match(/(?:ben|ismim)\s+([A-Za-zĞüşıöçĞÜŞİÖÇ]+)(?:\s+yim|\s+yım|\s+yim|\s+yum|\s+yüm|\s+yim\b|\b)/i);
    if (nameMatch && nameMatch[1]) {
      const extractedName = nameMatch[1].trim();
      if (extractedName.length > 1 && !['bir', 've', 'iyi', 'cok', 'çok', 'kahve', 'cafe', 'masa'].includes(extractedName.toLowerCase())) {
        detectedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1).toLowerCase();
        setUserName(detectedName);
      }
    }

    // Preference extraction
    let detectedPref = userPreference;
    if (query.includes('asidik') || query.includes('ekşi') || query.includes('meyvemsi') || query.includes('çiçeksi')) {
      detectedPref = 'meyvemsi & yüksek asiditeli';
      setUserPreference(detectedPref);
    } else if (query.includes('çikolata') || query.includes('yoğun') || query.includes('sert') || query.includes('koyu') || query.includes('acı')) {
      detectedPref = 'yoğun & kakaolu';
      setUserPreference(detectedPref);
    } else if (query.includes('karamel') || query.includes('yumuşak') || query.includes('sütlü') || query.includes('hafif')) {
      detectedPref = 'yumuşak & karamelize';
      setUserPreference(detectedPref);
    }

    setTimeout(() => {
      let responseText = '';
      const namePrefix = detectedName ? `${detectedName} Bey, ` : '';

      // Check if we are in the reservation / booking flow
      if (booking.step !== 'none') {
        handleBookingFlow(text);
        return;
      }

      // General intelligent conversational routing
      if (query.includes('rezervasyon') || query.includes('masa') || query.includes('yer ayır')) {
        setBooking({ step: 'day' });
        responseText = `Tabii ki ${namePrefix}size seveceğiniz bir masa ayıralım. Rezervasyonunuzu hangi gün için planlamak istersiniz? (Örnek: Cuma, Yarın veya 24 Mayıs)`;
      } else if (query.includes('kahve') || query.includes('latte') || query.includes('espresso') || query.includes('demleme') || query.includes('içecek')) {
        let prefInject = '';
        if (detectedPref) {
          prefInject = `Tercih ettiğiniz **${detectedPref}** aroma profili göz önüne alındığında, `;
        }
        responseText = `${menuDatabase.coffees}\n\n${prefInject}Seiste şefleri olarak özel eşleştirme tavsiyemiz:\n- **Panama Geisha** yanına %74 kakao içeren **Seiste Gold Leaf Truffle** trüfümüzün floral asiditeyi tamamlayan lüks dokusunu öneririz.\n- **Ethiopia Yirgacheffe V60** yanına, içindeki frambuaz jölesiyle mükemmel bir uyum yakalayan **Artisan Dome Dessert** tatlımızı denemelisiniz.`;
      } else if (query.includes('çikolata') || query.includes('truffle') || query.includes('trüf') || query.includes('tatlı') || query.includes('pasta')) {
        let prefInject = '';
        if (detectedPref) {
          prefInject = `Sevdiğiniz **${detectedPref}** lezzetleri doğrultusunda, `;
        }
        responseText = `${menuDatabase.chocolates}\n\n${prefInject}Gurme çikolata ve tatlılarımız için kahve eşleştirme önerimiz:\n- İmza lezzetimiz **Seiste Gold Leaf Truffle** ile özel harmanımızdan çekilmiş double **Espresso** veya asil gövdeli **Panama Geisha**.\n- Ahududu jöleli **Artisan Dome Dessert** ile bergamot ve şeftali notaları içeren **Ethiopia Yirgacheffe V60** demlenmiş nitelikli kahvemiz.`;
      } else if (query.includes('adres') || query.includes('nerede') || query.includes('konum') || query.includes('saat') || query.includes('açık') || query.includes('iletişim')) {
        responseText = `${namePrefix}${menuDatabase.location}`;
      } else if (query.includes('hikaye') || query.includes('kimdir') || query.includes('hakkında') || query.includes('hakkında bilgi') || query.includes('seiste nedir')) {
        responseText = `${namePrefix}${menuDatabase.story}`;
      } else if (query.includes('selam') || query.includes('merhaba') || query.includes('günaydın')) {
        responseText = `Merhaba ${namePrefix}Seiste lezzet dünyasına hoş geldiniz. Ben dijital sommelier asistanınızım. Size nitelikli kahve seçkimiz, el yapımı Belçika çikolatalarımız veya masa rezervasyonu işlemleri hakkında detaylı bilgi verebilirim. Hangi konuda yardımcı olmamı istersiniz?`;
      } else {
        responseText = `Size bu konuda yardımcı olamadığım için üzgünüm ${namePrefix}ancak Seiste'nin el yapımı çikolata seçkisi, nitelikli kahve demlemeleri, Nişantaşı şubemizin konumu veya masa rezervasyonu süreçleri hakkında detaylı bilgi vermemi isterseniz memnuniyetle yardımcı olurum.`;
      }

      const aiMsg: Message = {
        id: Math.random().toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  // Booking Flow Logic
  const handleBookingFlow = (rawText: string) => {
    let nextResponse = '';
    let nextStep = booking.step;
    let nextData = { ...booking };
    const nameGreeting = userName ? `${userName} Bey ` : '';

    if (booking.step === 'day') {
      nextData.day = rawText;
      nextStep = 'people';
      nextResponse = `Anlaşıldı. ${nameGreeting}rezervasyonunuz kaç kişilik bir masa için olacak?`;
    } else if (booking.step === 'people') {
      nextData.people = rawText;
      nextStep = 'time';
      nextResponse = `Teşekkürler. Saat kaç için yer ayıralım? ${nameGreeting}(Şubemiz 09:00 - 23:00 saatleri arasında hizmet vermektedir)`;
    } else if (booking.step === 'time') {
      nextData.time = rawText;
      nextStep = 'name';
      nextResponse = "Son olarak, rezervasyonunuzu onaylamak adına isim, soyisim ve telefon numaranızı belirtebilir misiniz?";
    } else if (booking.step === 'name') {
      nextData.name = rawText;
      nextStep = 'none';
      nextResponse = `Rezervasyon talebiniz başarıyla kaydedilmiştir.

**Rezervasyon Detayları:**
- **Konum**: Seiste Nişantaşı Şubesi
- **Tarih**: ${nextData.day}
- **Kişi Sayısı**: ${nextData.people} Kişi
- **Saat**: ${nextData.time}
- **İsim**: ${rawText}

Sizi ağırlamayı sabırsızlıkla bekliyoruz ${nameGreeting}. Rezervasyon saatinde bir değişiklik olması durumunda +90 (212) 555 45 45 numaralı hattımızdan bizimle iletişime geçebilirsiniz.`;
    }

    setBooking({ ...nextData, step: nextStep });

    setTimeout(() => {
      const aiMsg: Message = {
        id: Math.random().toString(),
        sender: 'ai',
        text: nextResponse,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend(inputValue);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050302] text-white flex flex-col justify-between pt-24 pb-12 px-5 relative overflow-hidden">
      
      {/* Background Soft Chocolate Texture Glow — Brighter */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#2a150d]/40 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Main Layout Area */}
      <div className="flex-1 max-w-3xl w-full mx-auto flex flex-col justify-center relative z-10">
        
        <AnimatePresence mode="wait">
          {!hasStarted ? (
            /* Home / Initial Splash State */
            <motion.div
              key="splash"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center text-center gap-8 py-10"
            >
              {/* Wavy Abstract Logo */}
              <div className="w-28 h-28 md:w-40 md:h-40 opacity-25">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
                  <path d="M10 50C25 35 40 65 55 50C70 35 85 65 90 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M10 40C25 25 40 55 55 40C70 25 85 55 90 40" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round"/>
                  <path d="M10 60C25 45 40 75 55 60C70 45 85 75 90 60" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.2" strokeLinecap="round"/>
                </svg>
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-6xl font-serif font-light tracking-widest leading-tight">
                  SEISTE SOMMELIER
                </h1>
                <p className="text-[10px] md:text-xs font-sans tracking-[0.25em] text-white/40 uppercase mt-2">
                  Nitelikli kahve ve çikolata danışmanınız
                </p>
              </div>

              {/* Suggestion Buttons — Always Row, Always Side-by-Side */}
              <div className="flex flex-row gap-2.5 justify-center items-center mt-4">
                <button
                  onClick={() => handleSend("Seiste hakkında bilgi verir misiniz?")}
                  className="px-4 py-2 border border-white/15 rounded-full text-[8px] sm:text-[9px] tracking-[0.18em] font-sans font-medium uppercase text-white/90 bg-white/[0.02] hover:bg-white hover:text-black hover:border-white transition-all duration-500 cursor-pointer whitespace-nowrap"
                >
                  Hikayemiz
                </button>
                <button
                  onClick={() => handleSend("Kahve ve çikolata menünüzü gösterir misiniz?")}
                  className="px-4 py-2 border border-white/15 rounded-full text-[8px] sm:text-[9px] tracking-[0.18em] font-sans font-medium uppercase text-white/90 bg-white/[0.02] hover:bg-white hover:text-black hover:border-white transition-all duration-500 cursor-pointer whitespace-nowrap"
                >
                  Menü
                </button>
                <button
                  onClick={() => handleSend("Masa rezervasyonu yapmak istiyorum")}
                  className="px-4 py-2 border border-white/15 rounded-full text-[8px] sm:text-[9px] tracking-[0.18em] font-sans font-medium uppercase text-white/90 bg-white/[0.02] hover:bg-white hover:text-black hover:border-white transition-all duration-500 cursor-pointer whitespace-nowrap"
                >
                  Rezervasyon
                </button>
              </div>
            </motion.div>
          ) : (
            /* Active Chat State */
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col justify-end h-[68vh] md:h-[72vh] py-4"
            >
              {/* Shrunk Header at Top of Chat Feed */}
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                <span className="text-[10px] font-sans tracking-[0.2em] text-white/40 uppercase">Seiste Sommelier Danışmanı</span>
                <button
                  onClick={() => {
                    setMessages([]);
                    setHasStarted(false);
                    setBooking({ step: 'none' });
                  }}
                  className="text-[9px] font-sans tracking-[0.2em] text-white/30 hover:text-white transition-colors uppercase cursor-pointer"
                >
                  Sohbeti Sıfırla
                </button>
              </div>

              {/* Chat Message History */}
              <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <span className="text-[9px] font-sans tracking-[0.1em] text-white/20 mb-1">
                      {msg.sender === 'user' ? 'Siz' : 'Seiste Sommelier'}
                    </span>
                    <div
                      className={`max-w-[85%] px-5 py-4 rounded-[20px] text-xs md:text-[13px] leading-relaxed whitespace-pre-wrap ${
                        msg.sender === 'user'
                          ? 'bg-white/5 border border-white/10 text-white font-light rounded-tr-none'
                          : 'bg-white/[0.02] border border-white/5 text-white/90 font-light rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex flex-col items-start">
                    <span className="text-[9px] font-sans tracking-[0.1em] text-white/20 mb-1">Seiste Sommelier</span>
                    <div className="bg-white/[0.02] border border-white/5 px-5 py-4 rounded-[20px] rounded-tl-none flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Bar Section */}
        <div className="mt-6">
          <div className="relative flex items-center h-14 rounded-full bg-black/35 border border-white/5 focus-within:border-white/10 transition-colors shadow-xl">
            <input
              ref={inputRef}
              type="text"
              placeholder="Sorunuzu buraya yazın..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isTyping}
              className="w-full h-full bg-transparent border-none rounded-full px-6 text-xs md:text-[13px] text-white placeholder-white/20 focus:outline-none"
            />
            <button
              onClick={() => handleSend(inputValue)}
              disabled={isTyping || !inputValue.trim()}
              className="absolute right-4 text-[10px] font-sans tracking-[0.15em] text-white/40 hover:text-white disabled:text-white/10 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              GÖNDER
            </button>
          </div>
          <p className="text-[9px] text-center text-white/25 mt-3 tracking-wider leading-relaxed">
            Seiste Dijital Concierge hizmetidir. Yapay zeka tavsiyeleri gurme sommelier bilgileriyle hazırlanmıştır.
          </p>
        </div>

      </div>
    </div>
  );
}
