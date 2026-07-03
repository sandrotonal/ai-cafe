#  SEISTE CAFE - AI Concierge Gastronomy

<div align="center">
  <img src="./public/images/cafe_interior.png" alt="Seiste Cafe" width="100%" style="border-radius: 10px; margin-bottom: 20px;" />
  <p><em>"Nitelikli Kahve ve Artizan Çikolatanın Yapay Zeka ile Buluştuğu Nokta"</em></p>
</div>

---

##  Proje Hakkında

**Seiste Cafe & Restaurant**, Nişantaşı'nın kalbinde yer alan, butik kahve deneyimini ve zanaatkar çikolata sanatını dijital bir platforma dönüştüren premium bir web uygulamasıdır. Sadece bir tanıtım sitesi değil, aynı zamanda misafirlere özel bir **AI Sommelier (Yapay Zeka Dijital Concierge)** hizmeti ve gelişmiş lokal SEO entegrasyonu sunan interaktif bir gastronomi alanıdır.

---

##  Sprint 1 & 2 Geliştirmeleri

###  1. Teknik SEO & Tarayıcı Performansı (Sprint 1)
- **JSON-LD Schema Markup:** Google ve diğer arama motorları için `CafeOrCoffeeShop` şeması dinamik olarak `index.html`'e eklendi.
- **Open Graph & Twitter Cards:** WhatsApp, Facebook, LinkedIn ve Twitter gibi platformlarda zengin paylaşım önizlemesi (meta tags) eklendi.
- **Sitemap & Robots:** `sitemap.xml` ve `robots.txt` tarama optimizasyonu amacıyla oluşturuldu.
- **Font preconnect & Preload:** Google Fonts yükleme performansı artırıldı.

###  2. Yeni Menü & İçerik Yapısı (Sprint 1 & 2)
- **Zanaatkar Menü Sayfası:** Çikolata ve kahve kategorilerini içeren, premium tasarıma sadık kalınarak oluşturulmuş HTML tabanlı [Menu.tsx](./src/components/Menu.tsx) sayfası eklendi. Alt kısmına sommelier eşleştirme rehberi yerleştirildi.
- **Blog & Hikayeler:** Nitelikli kahve ve zanaatkar çikolata üzerine 3 adet lüks makale içeren, kategori filtreli ve modal okuma pencereli [Blog.tsx](./src/components/Blog.tsx) sayfası oluşturuldu.
- **Masonry Galeri:** Lüks görseller sunan ve Lightbox modalına sahip [Gallery.tsx](./src/components/Gallery.tsx) sayfası entegre edildi.
- **SSS (FAQ):** Açılır akordeon animasyonlu, `FAQPage` schema markup'ını dinamik enjekte eden [FAQ.tsx](./src/components/FAQ.tsx) sayfası eklendi.
- **Yorumlar (Testimonials):** Misafir yorumlarını yansıtan lüks slider yapısına sahip [Testimonials.tsx](./src/components/Testimonials.tsx) sayfası eklendi.

### 🤖 3. Gelişmiş AI Sommelier (Dijital Concierge)
- [AIChat.tsx](./src/components/AIChat.tsx) asistanı tamamen yeniden yazılarak şu akıllı özelliklerle donatıldı:
  - **Smarter Intent Detection:** Vegan/gluten hassasiyeti, otopark, wifi şifresi, köpek/evcil hayvan kabulü, kahve demleme teknikleri, atölyeler ve özel etkinlik kiralama gibi 20'den fazla niyet (intent) algılanabiliyor.
  - **Kullanıcı Hafızası (Persistence):** Kullanıcının ismini ve kahve/çikolata tat tercihlerini (örn. *meyvemsi asidik* veya *yoğun kakaolu*) konuşmadan tespit edip tarayıcı hafızasında saklar, sonraki sorulara bu tercihe göre kişiselleştirilmiş yanıtlar verir.
  - **Profil Kartı:** Sol panelde misafirin ismini ve tat profilini gösteren şık bir kart eklendi.

---

##  Teknoloji Yığını

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Animations:** [Framer Motion 12](https://www.framer.com/motion/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

---

##  Başlangıç

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1. **Depoyu kopyalayın:**
   ```bash
   git clone https://github.com/sandrotonal/ai-cafe.git
   cd ai-cafe
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev
   ```

---

## 📍 Konum
**Nişantaşı, İstanbul**  
Valikonağı Caddesi No: 42, Şişli  
T: +90 (212) 555 45 45 | E: contact@seiste.com

---

<div align="center">
  Proudly developed by <strong>gucluyumhe</strong>
</div>
