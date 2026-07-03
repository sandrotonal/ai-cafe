import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  category?: 'menu' | 'pairing' | 'booking' | 'info' | 'greeting' | 'general';
}

interface BookingState {
  step: 'none' | 'day' | 'people' | 'time' | 'name' | 'confirm';
  day?: string;
  people?: string;
  time?: string;
  name?: string;
}

interface UserProfile {
  name: string | null;
  preference: string | null;
  visitCount: number;
  lastTopics: string[];
  mood: 'neutral' | 'curious' | 'decided' | 'exploring';
}

interface AIChatProps {
  initialHasStarted: boolean;
}

// ---------- KNOWLEDGE BASE ----------
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

Nişantaşı şubemizde misafirlerimize sadece bir ürün değil; tasarım estetiği, müzik, koku ve tat duyularının birleştiği sanatsal bir deneyim sunuyoruz.`,

  pairings: [
    { coffee: 'Panama Geisha', chocolate: 'Gold Leaf Truffle', reason: 'Jasmine aromatics complement the richness of 24K truffle — çiçeksi notalar ve kakao yoğunluğu mükemmel denge.' },
    { coffee: 'Ethiopia Yirgacheffe', chocolate: 'Artisan Dome Dessert', reason: 'Bergamot + frambuaz jölesi — meyvemsi asidite ve tazelik buluşması.' },
    { coffee: 'Velvet Mocha', chocolate: 'Pistachio Praline', reason: 'Kakao gövdesi üzerinde kavrulmuş fıstığın yağlı dokusu ve tuzlu finale.' },
    { coffee: 'Colombia Supremo', chocolate: 'Belgian Sea Salt Truffle', reason: 'Karamelize şeker notaları ile tuzlu karamel dolgunun kontrast uyumu.' },
    { coffee: 'Espresso', chocolate: 'Madagascar Origin Tablet', reason: 'İki yoğun profil — espressonun fındıksı bitişi tablettin narenciye asiditesiyle dans eder.' },
    { coffee: 'Cortado', chocolate: 'Seiste Tarte', reason: 'Kadifemsi süt dengesi, kakao sablesinin yoğunluğunu yumuşatır.' },
    { coffee: 'Signature Affogato', chocolate: 'Gold Leaf Truffle', reason: 'Vanilyalı dondurma + sıcak espresso + truffle — üçlü imza deneyimi.' },
  ],

  brewingTips: {
    v60: 'V60 demleme: 15g kahve, 250ml su (93°C), 2:30-3:00 dk. İnce-orta öğütme. Dairesel döküm.',
    chemex: 'Chemex demleme: 25g kahve, 400ml su (93°C), 4:00 dk. Orta-kalın öğütme. Temiz, parlak fincan.',
    espresso: 'Espresso: 18g kahve, 36ml çıktı, 25-30 saniye. İnce öğütme. 9 bar basınç.',
  },

  faq: {
    vegan: 'Vegan seçeneklerimiz mevcut. Bitkisel süt alternatifleri (yulaf, badem, soya) tüm kahvelerimizde kullanılabilir. Çikolatalarımızdan Madagascar Origin Tablet %100 bitkiseldir.',
    glutenFree: 'Gluten içermeyen seçeneklerimiz: Tüm trüflerimiz ve tabletlerimiz doğal olarak gluten içermez. Tatlılarımızda ise glutensiz alternatif için baristayla görüşebilirsiniz.',
    allergen: 'Alerjen bilgileri: Çikolatalarımızda süt, soya lesitini, fındık ve Antep fıstığı bulunabilir. Detaylı bilgi için lütfen fiziksel şubemizde uzman ekibimizle görüşün.',
    wifi: 'Evet, ücretsiz yüksek hızlı WiFi hizmetimiz mevcuttur. Şifre için baristayla görüşebilirsiniz.',
    parking: 'Valikonağı Caddesi üzerinde sokak parkı bulunmaktadır. Ayrıca 200m mesafedeki City\'s Nişantaşı AVM\'nin otoparkını kullanabilirsiniz.',
    dogFriendly: 'Seiste, evcil hayvan dostu bir mekandır. Dış oturma alanımızda sevimli dostlarınızla birlikte keyifli vakit geçirebilirsiniz.',
    delivery: 'Şu an için paket servis hizmeti vermiyoruz. Tüm ürünlerimiz mekanımızda taze olarak hazırlanmaktadır.',
    workshop: 'Çikolata yapım atölyelerimiz ayda 2 kez düzenlenmektedir. Katılım için contact@seiste.com adresine e-posta gönderebilir veya telefonla ulaşabilirsiniz.',
    privateEvent: 'Özel etkinlik ve kutlamalar için mekânımızı kiralayabilirsiniz. Minimum 15 kişilik gruplar için özel menü hazırlıyoruz. Detaylar için iletişime geçin.',
  },
};

// ---------- SMART INTENT DETECTION ----------
interface IntentResult {
  intent: string;
  confidence: number;
  entities: Record<string, string>;
}

function detectIntent(query: string): IntentResult {
  const q = query.toLowerCase().replace(/[?!.,]/g, '');
  const result: IntentResult = { intent: 'unknown', confidence: 0, entities: {} };

  // Greeting patterns
  if (/^(selam|merhaba|hey|günaydın|iyi akşamlar|iyi günler|hoş|meraba|slm|mrb|helo|hello|hi)\b/.test(q)) {
    return { intent: 'greeting', confidence: 0.95, entities: {} };
  }

  // Thanks / goodbye
  if (/^(teşekkür|sağol|sağ ol|eyvallah|bye|hoşça|görüşürüz|güle güle|iyi geceler)\b/.test(q)) {
    return { intent: 'thanks', confidence: 0.95, entities: {} };
  }

  // Booking intent
  if (/(rezervasyon|masa|yer ayır|yer ayırt|booking|reserve|yer var mı|müsait|boş masa)/.test(q)) {
    return { intent: 'booking', confidence: 0.9, entities: {} };
  }

  // Pairing / recommendation
  if (/(öneri|öner|tavsiye|eşleştir|pairing|ne iç|ne yiye|ne alayım|ne denersin|hangisi|en iyi|favorit|best|popüler|tercih)/.test(q)) {
    if (/(kahve|coffee|demleme|espresso)/.test(q)) result.entities['type'] = 'coffee';
    if (/(çikolata|truffle|trüf|tatlı|chocolate|dessert)/.test(q)) result.entities['type'] = 'chocolate';
    return { intent: 'recommendation', confidence: 0.85, entities: result.entities };
  }

  // Coffee menu
  if (/(kahve|coffee|latte|espresso|demleme|içecek|americano|cappuccino|macchiato|cortado|flat white|mocha|affogato|v60|chemex|ristretto)/.test(q)) {
    return { intent: 'coffee_menu', confidence: 0.9, entities: {} };
  }

  // Chocolate menu
  if (/(çikolata|chocolate|truffle|trüf|tatlı|pasta|dessert|praline|tablet|dome|hot chocolate|tarte)/.test(q)) {
    return { intent: 'chocolate_menu', confidence: 0.9, entities: {} };
  }

  // Full menu
  if (/(menü|menu|kart|fiyat|ne var|neler var|seçenek|ürün|product)/.test(q)) {
    return { intent: 'full_menu', confidence: 0.85, entities: {} };
  }

  // Location / hours
  if (/(adres|nerede|konum|saat|açık|kaçta|kapalı|iletişim|telefon|mail|ulaşım|yol tarifi|metro|location|address|directions)/.test(q)) {
    return { intent: 'location', confidence: 0.9, entities: {} };
  }

  // Story / about
  if (/(hikaye|kimdir|hakkında|nedir|seiste nedir|ne zaman|kuruldu|tarihçe|story|about|felsefe|misyon|vizyon)/.test(q)) {
    return { intent: 'story', confidence: 0.85, entities: {} };
  }

  // Brewing technique
  if (/(nasıl demlenir|demleme teknik|brewing|v60 nasıl|chemex nasıl|espresso nasıl|kavurma|roast)/.test(q)) {
    return { intent: 'brewing', confidence: 0.85, entities: {} };
  }

  // FAQ - Dietary
  if (/(vegan|bitkisel|sütsüz|laktozsuz|plant|oat milk|yulaf|badem)/.test(q)) {
    return { intent: 'faq_vegan', confidence: 0.9, entities: {} };
  }
  if (/(gluten|çölyak|glutensiz)/.test(q)) {
    return { intent: 'faq_gluten', confidence: 0.9, entities: {} };
  }
  if (/(alerj|alerjen|allergen|fıstık alerjisi)/.test(q)) {
    return { intent: 'faq_allergen', confidence: 0.9, entities: {} };
  }

  // FAQ - Facilities
  if (/(wifi|internet|şifre|password)/.test(q)) {
    return { intent: 'faq_wifi', confidence: 0.9, entities: {} };
  }
  if (/(park|otopark|parking|araç)/.test(q)) {
    return { intent: 'faq_parking', confidence: 0.9, entities: {} };
  }
  if (/(evcil|hayvan|köpek|kedi|dog|pet|cat)/.test(q)) {
    return { intent: 'faq_dog', confidence: 0.9, entities: {} };
  }
  if (/(paket|servis|delivery|sipariş|gel al|take away|getir)/.test(q)) {
    return { intent: 'faq_delivery', confidence: 0.9, entities: {} };
  }
  if (/(atölye|workshop|kurs|eğitim|öğren|yapım)/.test(q)) {
    return { intent: 'faq_workshop', confidence: 0.85, entities: {} };
  }
  if (/(özel|etkinlik|kutlama|doğum günü|parti|event|private|kiralama)/.test(q)) {
    return { intent: 'faq_event', confidence: 0.85, entities: {} };
  }

  // SCA / quality
  if (/(sca|puan|kalite|standart|sertifika|puanlama|cupping)/.test(q)) {
    return { intent: 'quality', confidence: 0.8, entities: {} };
  }

  return result;
}

// ---------- RESPONSE GENERATOR ----------
function generateResponse(
  intent: IntentResult,
  profile: UserProfile
): { text: string; category: Message['category'] } {
  const name = profile.name;
  const greeting = name ? `${name} Bey, ` : '';
  const pref = profile.preference;

  switch (intent.intent) {
    case 'greeting': {
      const greetings = [
        `Merhaba${name ? ` ${name} Bey` : ''}! Seiste dijital sommelier'iniz olarak hizmetinizde.\n\nSize nasıl yardımcı olabilirim?\n\n- Nitelikli kahve seçkimiz\n- El yapımı Belçika çikolatalarımız\n- Masa rezervasyonu\n- Konum ve çalışma saatleri`,
        `Hoş geldiniz${name ? ` ${name} Bey` : ''}! Ben Seiste'nin dijital sommelier'i.\n\nBugün sizin için ne hazırlayayım? Merak ettiğiniz her konuda buradayım.`,
      ];
      return { text: greetings[Math.floor(Math.random() * greetings.length)], category: 'greeting' };
    }

    case 'thanks': {
      return {
        text: `${greeting}Teşekkür ederim, sizinle sohbet etmek keyifliydi!\n\nSeiste'de görüşmek dileğiyle. Her zaman buradayım.`,
        category: 'greeting',
      };
    }

    case 'booking':
      return {
        text: `${greeting}Sizin için özel bir masa hazırlayalım.\n\nRezervasyon tarihini belirtir misiniz?\n\n*Örn: "Yarın", "Cumartesi", "5 Temmuz"*`,
        category: 'booking',
      };

    case 'coffee_menu': {
      const prefNote = pref ? `\n\n**Tercih profiliniz:** ${pref} — bu doğrultuda özellikle **${pref === 'meyvemsi ve yüksek asiditeli' ? 'Ethiopia Yirgacheffe ve Panama Geisha' : pref === 'yoğun kakaolu' ? 'Velvet Mocha ve Espresso' : 'Cortado ve Velvet Flat White'}** öneriyorum.` : '';
      return {
        text: `${menuDatabase.coffees}${prefNote}\n\n**Sommelier İpucu:** Her demleme yöntemi farklı aroma profili ortaya çıkarır. V60 temiz ve parlak, Chemex ise daha yuvarlak ve gövdeli bir fincan sunar.`,
        category: 'menu',
      };
    }

    case 'chocolate_menu': {
      const prefNote = pref ? `\n\n**Tercih profiliniz:** ${pref} — bu doğrultuda özellikle **${pref === 'yoğun kakaolu' ? 'Gold Leaf Truffle ve Madagascar Tablet' : pref === 'yumuşak ve karamelize' ? 'Belgian Sea Salt Truffle ve Seiste Tarte' : 'Artisan Dome Dessert'}** öneriyorum.` : '';
      return {
        text: `${menuDatabase.chocolates}${prefNote}\n\n**Sommelier İpucu:** Çikolatalarımız günlük taze üretilir ve %100 saf kakao yağı kullanılır. En iyi tadım deneyimi için çikolatanızı oda sıcaklığında tüketmenizi öneririz.`,
        category: 'menu',
      };
    }

    case 'full_menu':
      return {
        text: `${greeting}İşte Seiste'nin tam menüsü:\n\n${menuDatabase.coffees}\n\n---\n\n${menuDatabase.chocolates}\n\n**Sommelier İpucu:** Belirli bir ürün hakkında detay veya eşleştirme önerisi ister misiniz?`,
        category: 'menu',
      };

    case 'recommendation': {
      const randomPair = menuDatabase.pairings[Math.floor(Math.random() * menuDatabase.pairings.length)];
      const prefBasedRecommendation = pref
        ? pref === 'meyvemsi ve yüksek asiditeli'
          ? '\n\n**Sizin profilinize özel:** Ethiopia Yirgacheffe V60 + Artisan Dome Dessert — meyvemsi asidite ve frambuaz jölesinin uyumu.'
          : pref === 'yoğun kakaolu'
          ? '\n\n**Sizin profilinize özel:** Double Espresso + Gold Leaf Truffle — yoğun kakao ve espressonun gövdeli buluşması.'
          : '\n\n**Sizin profilinize özel:** Cortado + Seiste Tarte — kadifemsi süt dengesi ve karamel tatlılığı.'
        : '';

      return {
        text: `${greeting}Sommelier seçkimden bir eşleştirme:\n\n**${randomPair.coffee}**\n* ${randomPair.chocolate}\n\n${randomPair.reason}${prefBasedRecommendation}\n\nBaşka bir eşleştirme görmek ister misiniz? "Başka öneri" yazmanız yeterli.`,
        category: 'pairing',
      };
    }

    case 'location':
      return {
        text: `${greeting}${menuDatabase.location}\n\n**Ulaşım:** Harbiye Metro İstasyonu'ndan çıkış sonrası Valikonağı Caddesi yönünde 5 dakika yürüyüş mesafesindeyiz.`,
        category: 'info',
      };

    case 'story':
      return {
        text: `${greeting}${menuDatabase.story}\n\n**Fark yaratan detaylarımız:**\n• SCA 85+ puanlı mikro-lot çekirdekler\n• %100 kakao yağı, katkısız üretim\n• Cam bölmeli açık atölyede günlük taze üretim\n• Sürdürülebilir tarım sertifikalı tedarik`,
        category: 'info',
      };

    case 'brewing': {
      const tips = Object.values(menuDatabase.brewingTips).join('\n\n');
      return {
        text: `${greeting}Demleme tekniklerimiz hakkında bilgi:\n\n${tips}\n\n**Pro İpucu:** Su kalitesi kahvenin %98'ini oluşturur. Filtre su kullanmanızı kesinlikle öneriyoruz. Kavurma tarihinden itibaren 7-21 gün arası en ideal demleme penceresidir.`,
        category: 'info',
      };
    }

    case 'quality':
      return {
        text: `${greeting}Kalite standartlarımız:\n\n**SCA (Specialty Coffee Association) Puanlama:**\n• Tüm çekirdeklerimiz minimum 85+ SCA puanına sahiptir\n• Cupping protokolü ile haftalık kalite kontrol yapılır\n• Tek kökenli (single origin) çekirdekler doğrudan çiftliklerden tedarik edilir\n\n**Çikolata Kalite Kriterleri:**\n• %70+ saf kakao oranı\n• %100 kakao yağı (palm yağı kullanılmaz)\n• Madagaskar, Ekvador ve Kolombiya kökenli kuvertürler\n• Günlük taze üretim, stokta bekletilmez`,
        category: 'info',
      };

    case 'faq_vegan': return { text: `${greeting}${menuDatabase.faq.vegan}`, category: 'info' };
    case 'faq_gluten': return { text: `${greeting}${menuDatabase.faq.glutenFree}`, category: 'info' };
    case 'faq_allergen': return { text: `${greeting}${menuDatabase.faq.allergen}\n\n**Önemli:** Alerjen bilgileri tavsiye niteliğindedir. Kesin bilgi için fiziksel şubemizle iletişime geçin.`, category: 'info' };
    case 'faq_wifi': return { text: `${greeting}${menuDatabase.faq.wifi}`, category: 'info' };
    case 'faq_parking': return { text: `${greeting}${menuDatabase.faq.parking}`, category: 'info' };
    case 'faq_dog': return { text: `${greeting}${menuDatabase.faq.dogFriendly}`, category: 'info' };
    case 'faq_delivery': return { text: `${greeting}${menuDatabase.faq.delivery}`, category: 'info' };
    case 'faq_workshop': return { text: `${greeting}${menuDatabase.faq.workshop}\n\nAtölyelerimizde çikolata temperleme, truffle yapımı ve kahve cupping gibi konularda uygulamalı eğitimler sunuyoruz.`, category: 'info' };
    case 'faq_event': return { text: `${greeting}${menuDatabase.faq.privateEvent}\n\nDoğum günleri, yıldönümleri ve kurumsal etkinlikler için özel menu ve dekorasyon seçeneklerimiz mevcuttur.`, category: 'info' };

    default: {
      // Smarter fallback with context awareness
      const suggestions = profile.lastTopics.length > 0
        ? `\n\nDaha önce **${profile.lastTopics[profile.lastTopics.length - 1]}** hakkında konuşmuştuk. Bu konuda devam etmek ister misiniz?`
        : '';

      return {
        text: `${greeting}Bu konuda size daha iyi yardımcı olabilmem için birkaç önerim var:\n\n- **"Kahve menüsü"** — Nitelikli kahve seçkimiz\n- **"Çikolata"** — El yapımı trüf ve tabletler\n- **"Bana bir şey öner"** — Sommelier eşleştirme\n- **"Rezervasyon"** — Masa ayırtma\n- **"Konum"** — Adres ve çalışma saatleri\n- **"WiFi / Otopark / Vegan"** — Sık sorulanlar${suggestions}`,
        category: 'general',
      };
    }
  }
}

// ---------- COMPONENT ----------
export default function AIChat({ initialHasStarted }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Restore from localStorage if available
    try {
      const saved = localStorage.getItem('seiste_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved) as Message[];
        if (parsed.length > 0) return parsed.map(m => ({ ...m, timestamp: new Date(m.timestamp) }));
      }
    } catch { /* ignore */ }

    return [{
      id: 'welcome',
      sender: 'ai',
      text: 'Seiste dünyasına hoş geldiniz. Ben dijital sommelier asistanınızım.\n\nSize nasıl yardımcı olabilirim?\n\n- Nitelikli kahve seçkimiz\n- El yapımı Belçika çikolatalarımız\n- Kişisel eşleştirme önerisi\n- Masa rezervasyonu\n- Konum ve çalışma saatleri',
      timestamp: new Date(),
      category: 'greeting',
    }];
  });

  const [hasStarted, setHasStarted] = useState(initialHasStarted);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [booking, setBooking] = useState<BookingState>({ step: 'none' });
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('seiste_user_profile');
      if (saved) return JSON.parse(saved);
    } catch { /* ignore */ }
    return { name: null, preference: null, visitCount: 0, lastTopics: [], mood: 'neutral' };
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Persist messages to localStorage
  useEffect(() => {
    try {
      if (messages.length > 1) {
        localStorage.setItem('seiste_chat_history', JSON.stringify(messages.slice(-30))); // Keep last 30 messages
      }
    } catch { /* ignore */ }
  }, [messages]);

  // Persist profile
  useEffect(() => {
    try {
      localStorage.setItem('seiste_user_profile', JSON.stringify(profile));
    } catch { /* ignore */ }
  }, [profile]);

  useEffect(() => {
    if (hasStarted) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, hasStarted]);

  // Focus input on mount
  useEffect(() => {
    if (hasStarted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [hasStarted]);

  const detectNameFromText = useCallback((text: string): string | null => {
    const nameMatch = text.match(/(?:adım|ismim|adım\s+is|ismim\s+is)\s+([A-Za-zĞüşıöçĞÜŞİÖÇ]+)/i) ||
                      text.match(/(?:ben|ismim)\s+([A-Za-zĞüşıöçĞÜŞİÖÇ]+)(?:\s+yim|\s+yım|\b)/i);
    if (nameMatch?.[1]) {
      const name = nameMatch[1].trim();
      const excluded = ['bir', 've', 'iyi', 'cok', 'çok', 'kahve', 'cafe', 'masa', 'de', 'da', 'bu', 'şu', 'o'];
      if (name.length > 1 && !excluded.includes(name.toLowerCase())) {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      }
    }
    return null;
  }, []);

  const detectPreference = useCallback((query: string): string | null => {
    if (/asidik|ekşi|meyvemsi|çiçeksi|fruity|floral|bright/.test(query)) return 'meyvemsi ve yüksek asiditeli';
    if (/çikolata|yoğun|sert|koyu|acı|bitter|dark|bold/.test(query)) return 'yoğun kakaolu';
    if (/karamel|yumuşak|sütlü|hafif|tatlı|smooth|creamy|mild/.test(query)) return 'yumuşak ve karamelize';
    return null;
  }, []);

  const handleSend = useCallback((text: string) => {
    if (!text.trim()) return;
    if (!hasStarted) setHasStarted(true);

    const userMsg: Message = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      sender: 'user',
      text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const query = text.toLowerCase();

    // Update user profile
    const newName = detectNameFromText(text);
    const newPref = detectPreference(query);
    const updatedProfile = { ...profile };
    if (newName) updatedProfile.name = newName;
    if (newPref) updatedProfile.preference = newPref;
    updatedProfile.visitCount += 1;
    setProfile(updatedProfile);

    // Typing delay — more natural feel (varies by response complexity)
    const delay = 600 + Math.random() * 600;

    setTimeout(() => {
      // Handle booking flow separately
      if (booking.step !== 'none') {
        handleBookingFlow(text, updatedProfile.name);
        return;
      }

      const intent = detectIntent(query);

      // Special case: if booking intent detected, start flow
      if (intent.intent === 'booking') {
        setBooking({ step: 'day' });
      }

      // Track topic
      if (intent.intent !== 'unknown' && intent.intent !== 'greeting' && intent.intent !== 'thanks') {
        updatedProfile.lastTopics = [...updatedProfile.lastTopics.slice(-4), intent.intent];
        setProfile(updatedProfile);
      }

      const response = generateResponse(intent, updatedProfile);

      const aiMsg: Message = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        sender: 'ai',
        text: response.text,
        timestamp: new Date(),
        category: response.category,
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, delay);
  }, [hasStarted, booking, profile, detectNameFromText, detectPreference]);

  const handleBookingFlow = (rawText: string, currentName: string | null) => {
    let nextResponse = '';
    let nextStep = booking.step;
    const nextData = { ...booking };
    const nameGreeting = currentName ? `${currentName} Bey, ` : '';

    if (booking.step === 'day') {
      nextData.day = rawText;
      nextStep = 'people';
      nextResponse = `${nameGreeting}Kaç kişilik bir masa hazırlayalım?`;
    } else if (booking.step === 'people') {
      nextData.people = rawText;
      nextStep = 'time';
      nextResponse = `Saat kaç için yer ayıralım?\n\n**Çalışma saatlerimiz:**\nPazartesi – Cuma: 09:00 – 23:00\nCumartesi – Pazar: 09:00 – 00:00`;
    } else if (booking.step === 'time') {
      nextData.time = rawText;
      nextStep = 'name';
      nextResponse = `Son olarak, isminizi ve telefon numaranızı belirtir misiniz?`;
    } else if (booking.step === 'name') {
      nextData.name = rawText;
      nextStep = 'none';
      nextResponse = `Rezervasyonunuz kaydedilmiştir!\n\n**Tarih:** ${nextData.day}\n**Kişi:** ${nextData.people}\n**Saat:** ${nextData.time}\n**İletişim:** ${rawText}\n\nDeğişiklik veya iptal için: **+90 (212) 555 45 45**\n\n_Not: Bu bilgilendirme amaçlıdır. Kesin onay için ekibimiz sizinle iletişime geçecektir._`;
    }

    setBooking({ ...nextData, step: nextStep });

    setTimeout(() => {
      const aiMsg: Message = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        sender: 'ai',
        text: nextResponse,
        timestamp: new Date(),
        category: 'booking',
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, lineIdx) => {
      // Handle horizontal rule
      if (line.trim() === '---') return <div key={lineIdx} className="border-t border-white/5 my-3" />;

      // Handle italic
      let processedLine = line;
      const parts = processedLine.split(/(\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_)/g);
      const content = parts.map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <span key={partIdx} className="font-medium text-white/95">{part.slice(2, -2)}</span>;
        }
        if ((part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) || 
            (part.startsWith('_') && part.endsWith('_'))) {
          return <span key={partIdx} className="italic text-white/40 text-[10px]">{part.slice(1, -1)}</span>;
        }
        return part;
      });

      if (line.trim() === '') return <div key={lineIdx} className="h-2.5" />;

      const isTitle = line === line.toUpperCase() && line.length > 5 && !line.startsWith('-') && !line.startsWith('*') && !line.startsWith('•');
      const isBullet = line.trimStart().startsWith('•') || line.trimStart().startsWith('-');

      return (
        <div
          key={lineIdx}
          className={`${
            isTitle
              ? 'text-white/70 font-sans text-[10px] tracking-[0.2em] uppercase mt-4 mb-2 font-semibold'
              : isBullet
              ? 'ml-1 mb-1 text-white/50'
              : line.startsWith('  ')
              ? 'ml-3 mb-0.5'
              : 'mb-0.5'
          }`}
        >
          {content}
        </div>
      );
    });
  };

  const getContextChips = (): string[] => {
    if (booking.step === 'day') return ['Bugün', 'Yarın', 'Cumartesi', 'Pazar'];
    if (booking.step === 'people') return ['2 Kişi', '4 Kişi', '6 Kişi', '8+ Kişi'];
    if (booking.step === 'time') return ['12:00', '14:00', '17:00', '20:00'];
    if (booking.step === 'name') return [];

    // Context-aware chips based on conversation history
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.category === 'menu') return ['Bana Öner', 'Eşleştirme', 'Rezervasyon', 'Konum'];
    if (lastMsg?.category === 'pairing') return ['Başka Öneri', 'Kahve Menüsü', 'Çikolata', 'Rezervasyon'];
    if (lastMsg?.category === 'booking') return ['Kahve Menüsü', 'Çikolata', 'Konum'];

    return ['Kahve Menüsü', 'Çikolata', 'Bana Öner', 'Rezervasyon', 'Konum', 'Atölye'];
  };

  const chipToQuery: Record<string, string> = {
    'Kahve Menüsü': 'Kahve menünüzü gösterir misiniz?',
    'Kahve Seçkisi': 'Kahve menünüzü gösterir misiniz?',
    'Çikolata': 'Çikolata ve tatlı seçkileriniz nelerdir?',
    'Rezervasyon': 'Masa rezervasyonu yapmak istiyorum.',
    'Konum': 'Adresiniz ve çalışma saatleriniz nedir?',
    'Bana Öner': 'Bana bir kahve-çikolata eşleştirmesi önerir misin?',
    'Eşleştirme': 'Başka bir eşleştirme önerir misin?',
    'Başka Öneri': 'Başka bir eşleştirme önerir misin?',
    'Atölye': 'Çikolata yapım atölyeniz hakkında bilgi verir misiniz?',
  };

  const activeChips = getContextChips();

  const handleClearChat = () => {
    setMessages([{
      id: 'welcome',
      sender: 'ai',
      text: 'Seiste dünyasına hoş geldiniz. Ben dijital sommelier asistanınızım.\n\nSize nasıl yardımcı olabilirim?\n\n- Nitelikli kahve seçkimiz\n- El yapımı Belçika çikolatalarımız\n- Kişisel eşleştirme önerisi\n- Masa rezervasyonu\n- Konum ve çalışma saatleri',
      timestamp: new Date(),
      category: 'greeting',
    }]);
    setBooking({ step: 'none' });
    try { localStorage.removeItem('seiste_chat_history'); } catch { /* ignore */ }
  };

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

            {/* User Profile Card */}
            {profile.name && (
              <div className="flex flex-col gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[8px] font-sans tracking-[0.25em] text-white/20 uppercase font-semibold">
                  Profiliniz
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-sans text-white/60">{profile.name} Bey</span>
                  {profile.preference && (
                    <span className="text-[8px] font-sans text-white/30 tracking-wide">
                      Tercih: {profile.preference}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Reservation Stepper */}
            <div className="flex flex-col gap-3 mt-2">
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

            {/* Quick Topics */}
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-[8px] font-sans tracking-[0.25em] text-white/20 uppercase font-semibold">
                Popüler Konular
              </span>
              <div className="flex flex-col gap-1.5">
                {['Demleme Teknikleri', 'Vegan Seçenekler', 'Atölye Bilgisi', 'Özel Etkinlik'].map(topic => (
                  <button
                    key={topic}
                    onClick={() => handleSend(chipToQuery[topic] || topic)}
                    className="text-left text-[8px] font-sans tracking-[0.1em] text-white/20 hover:text-white/50 transition-colors cursor-pointer"
                  >
                    → {topic}
                  </button>
                ))}
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
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-sans tracking-[0.2em] text-white/25 uppercase">Dijital Sommelier</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-pulse" />
                <span className="text-[7px] font-sans text-white/20 tracking-wider">Çevrimiçi</span>
              </div>
            </div>
            <button
              onClick={handleClearChat}
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
                  <div className={`max-w-[85%] md:max-w-[75%] px-5 py-4 text-[11px] md:text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-white/[0.04] border border-white/8 text-white/90 font-light rounded-[16px] rounded-tr-sm'
                      : 'bg-white/[0.02] border border-white/5 text-white/70 font-light rounded-[16px] rounded-tl-sm'
                  }`}>
                    {msg.sender === 'ai' ? renderFormattedText(msg.text) : msg.text}
                  </div>
                  <span className="text-[6px] font-sans text-white/10 mt-1 tracking-wider">
                    {msg.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <div className="flex flex-col items-start">
                <span className="text-[7px] font-sans tracking-[0.12em] text-white/15 mb-1 uppercase">Sommelier</span>
                <div className="bg-white/[0.02] border border-white/5 px-5 py-4 rounded-[16px] rounded-tl-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: '200ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: '400ms' }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Chips */}
          {activeChips.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4 mb-3">
              {activeChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSend(chipToQuery[chip] || chip)}
                  disabled={isTyping}
                  className="border border-white/8 text-white/35 hover:text-white/70 hover:border-white/15 text-[8px] tracking-[0.12em] uppercase px-3 py-1.5 rounded-full transition-all duration-300 bg-transparent cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

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
              aria-label="Sommelier'e mesaj yazın"
            />
            <button
              onClick={() => handleSend(inputValue)}
              disabled={isTyping || !inputValue.trim()}
              className="absolute right-5 text-[9px] font-sans tracking-[0.15em] text-white/30 hover:text-white/70 disabled:text-white/10 disabled:pointer-events-none transition-colors cursor-pointer uppercase"
              aria-label="Mesaj gönder"
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
