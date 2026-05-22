import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-transparent text-white flex flex-col pt-20 pb-16 px-5 md:px-12 relative z-10 select-none overflow-y-auto">
      
      <div className="flex-1 max-w-4xl w-full mx-auto flex flex-col justify-center my-auto py-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-10"
        >
          <span className="text-[8px] font-sans tracking-[0.3em] text-white/30 uppercase font-semibold">
            İLETİŞİM & KONUM
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-light tracking-[0.1em] leading-tight uppercase mt-2">
            BİZE ULAŞIN.
          </h1>
        </motion.div>

        {/* Two-Column Grid — Stacks on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full">
          
          {/* Left Column: Info + Map */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Contact Details */}
            <div className="flex flex-col gap-2.5 text-[11px] md:text-[12px] leading-relaxed text-white/50 font-light">
              <p>Valikonağı Caddesi No: 42, Nişantaşı, Şişli / İstanbul</p>
              <p>
                <a href="tel:+902125554545" className="hover:text-white/80 transition-colors">T: +90 (212) 555 45 45</a>
              </p>
              <p>
                <a href="mailto:contact@seiste.com" className="hover:text-white/80 transition-colors">E: contact@seiste.com</a>
              </p>
            </div>

            {/* Working Hours */}
            <div className="flex flex-col gap-2.5 border-t border-white/5 pt-4">
              <span className="text-[8px] font-sans tracking-[0.2em] text-white/25 uppercase font-semibold">Çalışma Saatleri</span>
              <div className="flex flex-col gap-1.5 text-[11px] font-light text-white/45">
                <div className="flex justify-between">
                  <span>Pazartesi – Cuma</span>
                  <span className="text-white/30 tracking-wider">09:00 – 23:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Cumartesi – Pazar</span>
                  <span className="text-white/30 tracking-wider">09:00 – 00:00</span>
                </div>
              </div>
            </div>

            {/* Dark Map */}
            <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
              <span className="text-[8px] font-sans tracking-[0.2em] text-white/25 uppercase font-semibold">Konum</span>
              <div className="w-full h-36 md:h-44 rounded-lg overflow-hidden border border-white/5">
                <iframe
                  title="Seiste Nişantaşı Konum"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.831!2d28.9895!3d41.0482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAyJzUzLjUiTiAyOMKwNTknMjIuMiJF!5e0!3m2!1str!2str!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(0.92) hue-rotate(180deg) saturate(0.3) contrast(0.85)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Message Form */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center w-full"
          >
            <AnimatePresence mode="wait">
              {status !== 'success' ? (
                <motion.form 
                  key="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-5 w-full"
                >
                  <span className="text-[8px] font-sans tracking-[0.2em] text-white/25 uppercase font-semibold">Mesaj Gönderin</span>
                  
                  <input
                    type="text"
                    required
                    placeholder="İSMİNİZ"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={status === 'sending'}
                    className="w-full bg-transparent border-b border-white/8 py-2.5 text-[11px] tracking-widest text-white placeholder-white/15 focus:outline-none focus:border-white/25 transition-colors uppercase"
                  />

                  <input
                    type="email"
                    required
                    placeholder="E-POSTA ADRESİNİZ"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={status === 'sending'}
                    className="w-full bg-transparent border-b border-white/8 py-2.5 text-[11px] tracking-widest text-white placeholder-white/15 focus:outline-none focus:border-white/25 transition-colors uppercase"
                  />

                  <textarea
                    required
                    rows={3}
                    placeholder="MESAJINIZ"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={status === 'sending'}
                    className="w-full bg-transparent border-b border-white/8 py-2.5 text-[11px] tracking-widest text-white placeholder-white/15 focus:outline-none focus:border-white/25 transition-colors resize-none uppercase"
                  />

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="py-2 px-5 rounded-full border border-white/10 text-[8px] sm:text-[9px] font-sans tracking-[0.18em] uppercase text-white/70 bg-transparent hover:bg-white hover:text-black hover:border-white transition-all duration-500 cursor-pointer self-start disabled:opacity-50 mt-1 whitespace-nowrap"
                  >
                    {status === 'sending' ? 'GÖNDERİLİYOR...' : 'GÖNDER'}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center gap-4 py-8 px-5 rounded-xl bg-white/[0.01] border border-white/5"
                >
                  <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50">
                    <svg width="16" height="12" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 8L7 14L19 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xs font-serif font-light tracking-widest text-white/80">MESAJINIZ İLETİLDİ</h3>
                    <p className="text-[9px] text-white/30 font-sans tracking-wide leading-relaxed max-w-xs mx-auto">
                      Nişantaşı ekibimiz sizinle en kısa sürede iletişime geçecektir.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
