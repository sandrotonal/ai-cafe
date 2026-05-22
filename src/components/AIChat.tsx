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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Seiste dünyasına hoş geldiniz. Ben dijital sommelier asistanınızım.\n\nNitelikli kahve seçkilerimiz, el yapımı Belçika çikolatalarımız veya masa rezervasyonu hakkında yardımcı olabilirim.',
      timestamp: new Date()
    }
  ]);
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

  const menuDatabase = {
    coffees: `SEISTE NİTELİKLİ KAHVE SEÇKİSİ

**Demleme — Single Origin & Special Reserve**

- **Ethiopia Yirgacheffe** — V60 / Chemex
  Yasemin çiçeği, bergamot, şeftali. Yüksek asiditeli, narin gövde.

- **Colombia Supremo** — V60 / Chemex
  Karamelize şeker, kakao, kırmızı orman meyveleri. Dengeli, orta gövde.

- **Panama Geisha** — Special Reserve
  Yasemin, mandalina, bal, bergamot. Nadide ve seçkin.

**Espresso & Kadife Dokular**

- **Espresso / Ristretto / Macchiato**
  Seiste özel harmanı. Yoğun, gövdeli, fındık kreması bitişli.

- **Cortado** — Çift shot ristretto, kadifemsi sıcak süt dengesi.
- **Velvet Flat White** — İnce mikro köpük, çift shot ristretto.
- **Signature Affogato** — Vanilyalı dondurma, sıcak espresso, %70 Madagaskar çikolatası.
- **Velvet Mocha** — El yapımı bitter çikolata, double espresso, kadifemsi süt.`,

    chocolates: `SEISTE EL YAPIMI GURME ÇİKOLATA SEÇKİSİ

**Zanaatkar Trüfler & Tabletler**

- **Gold Leaf Truffle** — %74 Madagaskar kakao, taze krema, 24K altın yaprağı.
- **Belgian Sea Salt Truffle** — Tuzlu karamel dolgulu, deniz tuzu kristalleri.
- **Pistachio Praline** — Kavrulmuş Antep fıstığı ezmesi, bitter çikolata kubbesi.
- **Madagascar Origin Tablet** — %70 saf çikolata, narenciye ve odunsu asidite.

**Gurme Tatlılar**

- **Artisan Dome Dessert** — Fındıklı pralin, frambuaz jölesi, çikolata mus.
- **Signature Hot Chocolate** — Eritilmiş Belçika çikolatası, organik krema, vanilya.
- **Seiste Tarte** — Kakao sablesi, çikolatalı krem karamel, tuzlu tereyağı karameli.`,

    location: `**Seiste Nişantaşı**
Valikonağı Caddesi No: 42, Şişli / İstanbul
Harbiye Metro — 5 dk yürüme mesafesi

**İletişim**
T: +90 (212) 555 45 45
E: contact@seiste.com

**Çalışma Saatleri**
Pazartesi – Cuma: 09:00 – 23:00
Cumartesi – Pazar: 09:00 – 00:00`,

    story: `Seiste, nitelikli kahve kültürü ile el yapımı gurme çikolata sanatını bir araya getiren lüks bir gastronomi deneyimidir.

Belçika çikolatası işleme tekniklerini, dünya üzerindeki özel mikro-lot kahve çiftliklerinden getirdiğimiz çekirdeklerle harmanlıyoruz.

Nişantaşı şubemizde misafirlerimize sadece bir ürün değil; tasarım estetiği, müzik, koku ve tat duyularının birleştiği sanatsal bir deneyim sunuyoruz.`
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    if (!hasStarted) setHasStarted(true);

    const userMsg: Message = {
      id: Date.now().toString() + Math.random(),
      sender: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const query = text.toLowerCase();
    
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

    let detectedPref = userPreference;
    if (query.includes('asidik') || query.includes('ekşi') || query.includes('meyvemsi') || query.includes('çiçeksi')) {
      detectedPref = 'meyvemsi ve yüksek asiditeli';
      setUserPreference(detectedPref);
    } else if (query.includes('çikolata') || query.includes('yoğun') || query.includes('sert') || query.includes('koyu') || query.includes('acı')) {
      detectedPref = 'yoğun kakaolu';
      setUserPreference(detectedPref);
    } else if (query.includes('karamel') || query.includes('yumuşak') || query.includes('sütlü') || query.includes('hafif')) {
      detectedPref = 'yumuşak ve karamelize';
      setUserPreference(detectedPref);
    }

    setTimeout(() => {
      let responseText = '';
      const namePrefix = detectedName ? `${detectedName} Bey, ` : '';

      if (booking.step !== 'none') {
        handleBookingFlow(text, detectedName);
        return;
      }

      if (query.includes('rezervasyon') || query.includes('masa') || query.includes('yer ayır')) {
        setBooking({ step: 'day' });
        responseText = `${namePrefix}Sizin için özel bir masa ayıralım.\n\nRezervasyon tarihini belirtir misiniz?`;
      } else if (query.includes('kahve') || query.includes('latte') || query.includes('espresso') || query.includes('demleme') || query.includes('içecek')) {
        const prefInject = detectedPref ? `\n\nTercihiniz **${detectedPref}** profili doğrultusunda;` : '';
        responseText = `${menuDatabase.coffees}${prefInject}\n\n**Sommelier Önerisi:** Panama Geisha yanına Gold Leaf Truffle, Ethiopia Yirgacheffe yanına Artisan Dome Dessert.`;
      } else if (query.includes('çikolata') || query.includes('truffle') || query.includes('trüf') || query.includes('tatlı') || query.includes('pasta')) {
        const prefInject = detectedPref ? `\n\nTercihiniz **${detectedPref}** profili doğrultusunda;` : '';
        responseText = `${menuDatabase.chocolates}${prefInject}\n\n**Sommelier Önerisi:** Gold Leaf Truffle ile double Espresso, Artisan Dome ile Ethiopia Yirgacheffe V60.`;
      } else if (query.includes('adres') || query.includes('nerede') || query.includes('konum') || query.includes('saat') || query.includes('açık') || query.includes('iletişim')) {
        responseText = `${namePrefix}${menuDatabase.location}`;
      } else if (query.includes('hikaye') || query.includes('kimdir') || query.includes('hakkında') || query.includes('seiste nedir')) {
        responseText = `${namePrefix}${menuDatabase.story}`;
      } else if (query.includes('selam') || query.includes('merhaba') || query.includes('günaydın')) {
        responseText = `Merhaba ${namePrefix}Seiste'ye hoş geldiniz.\n\nNitelikli kahve seçkimiz, el yapımı Belçika çikolatalarımız veya masa rezervasyonu hakkında yardımcı olabilirim.`;
      } else {
        responseText = `${namePrefix}Bu konuda yardımcı olamadım, ancak nitelikli kahve demlemeleri, el yapımı çikolata seçkisi, konum bilgisi veya masa rezervasyonu hakkında detaylı bilgi sunabilirim.`;
      }

      const aiMsg: Message = {
        id: Date.now().toString() + Math.random(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleBookingFlow = (rawText: string, currentDetectedName: string | null) => {
    let nextResponse = '';
    let nextStep = booking.step;
    const nextData = { ...booking };
    const nameGreeting = currentDetectedName ? `${currentDetectedName} Bey, ` : '';

    if (booking.step === 'day') {
      nextData.day = rawText;
      nextStep = 'people';
      nextResponse = `${nameGreeting}Kaç kişilik bir masa hazırlayalım?`;
    } else if (booking.step === 'people') {
      nextData.people = rawText;
      nextStep = 'time';
      nextResponse = `Saat kaç için yer ayıralım?\nŞubemiz 09:00 – 23:00 arasında hizmet vermektedir.`;
    } else if (booking.step === 'time') {
      nextData.time = rawText;
      nextStep = 'name';
      nextResponse = `Son olarak, isminizi ve telefon numaranızı belirtir misiniz?`;
    } else if (booking.step === 'name') {
      nextData.name = rawText;
      nextStep = 'none';
      nextResponse = `Rezervasyonunuz kaydedilmiştir.\n\n**Tarih:** ${nextData.day}\n**Kişi:** ${nextData.people}\n**Saat:** ${nextData.time}\n**İletişim:** ${rawText}\n\nDeğişiklik için: +90 (212) 555 45 45`;
    }

    setBooking({ ...nextData, step: nextStep });

    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now().toString() + Math.random(),
        sender: 'ai',
        text: nextResponse,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend(inputValue);
  };

  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, lineIdx) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const content = parts.map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <span key={partIdx} className="font-medium text-white/95">
              {part.slice(2, -2)}
            </span>
          );
        }
        return part;
      });

      if (line.trim() === '') return <div key={lineIdx} className="h-3" />;

      const isTitle = line === line.toUpperCase() && line.length > 5 && !line.startsWith('-') && !line.startsWith('*');

      return (
        <div 
          key={lineIdx} 
          className={`${
            isTitle 
              ? 'text-white/70 font-sans text-[10px] tracking-[0.2em] uppercase mt-4 mb-2 font-semibold' 
              : line.startsWith('- ') || line.startsWith('  ')
              ? 'ml-2 mb-0.5'
              : 'mb-0.5'
          }`}
        >
          {content}
        </div>
      );
    });
  };

  const getContextChips = (): string[] => {
    if (booking.step === 'day') return ['Bugün', 'Yarın', 'Cumartesi'];
    if (booking.step === 'people') return ['2 Kişi', '4 Kişi', '6 Kişi'];
    if (booking.step === 'time') return ['14:00', '17:00', '20:00'];
    return ['Kahve Seçkisi', 'Çikolata', 'Rezervasyon', 'Konum'];
  };

  const chipToQuery: Record<string, string> = {
    'Kahve Seçkisi': 'Kahve menünüzü gösterir misiniz?',
    'Çikolata': 'Çikolata ve tatlı seçkileriniz nelerdir?',
    'Rezervasyon': 'Masa rezervasyonu yapmak istiyorum.',
    'Konum': 'Adresiniz ve çalışma saatleriniz nedir?',
  };

  const activeChips = getContextChips();

  // Reservation stepper for sidebar
  const bookingSteps = [
    { key: 'day', label: 'Tarih' },
    { key: 'people', label: 'Kişi' },
    { key: 'time', label: 'Saat' },
    { key: 'name', label: 'Bilgi' },
  ];
  const stepKeys = bookingSteps.map(s => s.key);
  const currentStepIdx = stepKeys.indexOf(booking.step);

  return (
    <div className="min-h-screen w-full bg-transparent text-white flex flex-col pt-20 pb-16 px-5 md:px-12 relative overflow-hidden">

      {/* Main Container */}
      <div className="flex-1 max-w-5xl w-full mx-auto flex flex-col md:grid md:grid-cols-12 md:gap-10 relative z-10">
        
        {/* Left Sidebar — Visible only on desktop */}
        <div className="hidden md:flex md:col-span-3 flex-col justify-between pt-4 pb-2">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[8px] font-sans tracking-[0.3em] text-white/30 uppercase font-semibold">
                SEISTE
              </span>
              <h2 className="text-lg font-serif font-light tracking-[0.15em] text-white/80 uppercase">
                Sommelier
              </h2>
            </div>
            <p className="text-[10px] leading-relaxed text-white/30 font-light">
              Nitelikli kahve, el yapımı Belçika çikolatası ve gurme eşleştirme danışmanlığı.
            </p>

            {/* Reservation Stepper */}
            <div className="flex flex-col gap-3 mt-4">
              <span className="text-[8px] font-sans tracking-[0.25em] text-white/20 uppercase font-semibold">
                Rezervasyon
              </span>
              <div className="flex flex-col gap-2.5 pl-0.5 relative">
                <div className="absolute left-[5px] top-1.5 bottom-1.5 w-[1px] bg-white/5" />
                {bookingSteps.map((s, idx) => {
                  const isCompleted = (currentStepIdx > idx) || (booking.step === 'none' && booking.day !== undefined);
                  const isActive = booking.step === s.key;
                  return (
                    <div key={s.key} className="flex items-center gap-3 relative z-10">
                      <div className={`w-[9px] h-[9px] rounded-full border transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-white/70 border-white/70' 
                          : isActive 
                          ? 'bg-transparent border-white/60' 
                          : 'bg-transparent border-white/10'
                      }`} />
                      <span className={`text-[9px] font-sans tracking-[0.15em] transition-colors duration-300 ${
                        isCompleted ? 'text-white/60' : isActive ? 'text-white/80 font-medium' : 'text-white/15'
                      }`}>
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col gap-1 border-t border-white/5 pt-4">
            <span className="text-[7px] font-sans tracking-[0.2em] text-white/15 uppercase">Nişantaşı</span>
            <span className="text-[8px] font-sans text-white/25 tracking-wider">Valikonağı Cad. No: 42</span>
          </div>
        </div>

        {/* Right Column: Chat */}
        <div className="md:col-span-9 flex flex-col justify-between min-h-[calc(100vh-9rem)]">
          
          {/* Chat Header */}
          <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-5">
            <span className="text-[9px] font-sans tracking-[0.2em] text-white/25 uppercase">Dijital Sommelier</span>
            <button
              onClick={() => {
                setMessages([{
                  id: 'welcome',
                  sender: 'ai',
                  text: 'Seiste dünyasına hoş geldiniz. Ben dijital sommelier asistanınızım.\n\nNitelikli kahve seçkilerimiz, el yapımı Belçika çikolatalarımız veya masa rezervasyonu hakkında yardımcı olabilirim.',
                  timestamp: new Date()
                }]);
                setBooking({ step: 'none' });
              }}
              className="text-[8px] font-sans tracking-[0.2em] text-white/20 hover:text-white/60 transition-colors uppercase cursor-pointer"
            >
              Sıfırla
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[7px] font-sans tracking-[0.12em] text-white/15 mb-1 uppercase">
                    {msg.sender === 'user' ? 'Siz' : 'Sommelier'}
                  </span>
                  <div className={`max-w-[80%] md:max-w-[75%] px-5 py-4 text-[11px] md:text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-white/[0.04] border border-white/8 text-white/90 font-light rounded-[16px] rounded-tr-sm'
                      : 'bg-white/[0.02] border border-white/5 text-white/70 font-light rounded-[16px] rounded-tl-sm'
                  }`}>
                    {msg.sender === 'ai' ? renderFormattedText(msg.text) : msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <div className="flex flex-col items-start">
                <span className="text-[7px] font-sans tracking-[0.12em] text-white/15 mb-1 uppercase">Sommelier</span>
                <div className="bg-white/[0.02] border border-white/5 px-5 py-4 rounded-[16px] rounded-tl-sm flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-white/30 animate-pulse" />
                  <span className="w-1 h-1 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: '200ms' }} />
                  <span className="w-1 h-1 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: '400ms' }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Chips */}
          <div className="flex flex-wrap gap-1.5 mt-4 mb-3">
            {activeChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chipToQuery[chip] || chip)}
                className="border border-white/8 text-white/35 hover:text-white/70 hover:border-white/15 text-[8px] tracking-[0.12em] uppercase px-3 py-1.5 rounded-full transition-all duration-300 bg-transparent cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="relative flex items-center h-12 rounded-full bg-white/[0.02] border border-white/5 focus-within:border-white/10 transition-colors">
            <input
              ref={inputRef}
              type="text"
              placeholder="Sorunuzu buraya yazın..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isTyping}
              className="w-full h-full bg-transparent border-none rounded-full px-6 text-xs text-white placeholder-white/15 focus:outline-none"
            />
            <button
              onClick={() => handleSend(inputValue)}
              disabled={isTyping || !inputValue.trim()}
              className="absolute right-5 text-[9px] font-sans tracking-[0.15em] text-white/30 hover:text-white/70 disabled:text-white/10 disabled:pointer-events-none transition-colors cursor-pointer uppercase"
            >
              Gönder
            </button>
          </div>

          <p className="text-[7px] text-center text-white/15 mt-2 tracking-widest">
            Seiste Dijital Concierge · Sommelier bilgileriyle hazırlanmıştır
          </p>

        </div>

      </div>
    </div>
  );
}
