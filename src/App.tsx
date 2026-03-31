/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  ArrowRight, 
  Plus, 
  Facebook, 
  Instagram, 
  MessageCircle,
  Truck,
  Sparkles,
  Headphones,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { Language, Product, Category } from './types';

const PRODUCTS: Product[] = [
  { id: '1', nameEn: 'Crystal Rose Lamp', nameBn: 'ক্রিস্টাল রোজ ল্যাম্প', price: 850, category: 'LED', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80', badgeEn: 'Best Seller', badgeBn: 'সেরা বিক্রিত' },
  { id: '2', nameEn: 'Smart Watch Pro v2', nameBn: 'স্মার্ট ওয়াচ প্রো v2', price: 2150, category: 'Gadgets', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80', badgeEn: 'New', badgeBn: 'নতুন' },
  { id: '3', nameEn: 'Personalized Glass Frame', nameBn: 'কাস্টম গ্লাস ফ্রেম', price: 1250, category: 'Gifts', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80' },
  { id: '4', nameEn: 'Galaxy Star Projector', nameBn: 'গ্যালাক্সি স্টার প্রজেক্টর', price: 1800, category: 'LED', image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=600&q=80', badgeEn: 'Popular', badgeBn: 'জনপ্রিয়' },
  { id: '5', nameEn: 'Anti-Gravity Humidifier', nameBn: 'অ্যান্টি-গ্র্যাভিটি হিউমিডিফায়ার', price: 2450, category: 'Gadgets', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=600&q=80' },
  { id: '6', nameEn: 'Retro Bluetooth Speaker', nameBn: 'রেট্রো ব্লুটুথ স্পিকার', price: 3200, category: 'Gadgets', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80' },
  { id: '7', nameEn: 'Moving Sand Art Frame', nameBn: 'মুভিং স্যান্ড আর্ট ফ্রেম', price: 1650, category: 'Showpieces', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', badgeEn: 'Limited', badgeBn: 'সীমিত' },
  { id: '8', nameEn: 'Smart Coffee Mug Warmer', nameBn: 'স্মার্ট কফি মগ ওয়ার্মার', price: 950, category: 'Gadgets', image: 'https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&w=600&q=80' },
  { id: '9', nameEn: 'Levitating Moon Lamp', nameBn: 'লেভিটেটিং মুন ল্যাম্প', price: 4500, category: 'LED', image: 'https://images.unsplash.com/photo-1532767153582-b1a0e5145009?auto=format&fit=crop&w=600&q=80' },
  { id: '10', nameEn: 'Luxury Executive Pen Set', nameBn: 'লাক্সারি এক্সিকিউটিভ পেন সেট', price: 1400, category: 'Gifts', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80' },
  { id: '11', nameEn: 'Sunset Projection Lamp', nameBn: 'সানসেট প্রজেকশন ল্যাম্প', price: 750, category: 'LED', image: 'https://images.unsplash.com/photo-1617957718614-8c23f060c2d0?auto=format&fit=crop&w=600&q=80' },
  { id: '12', nameEn: 'RGB Mechanical Keyboard', nameBn: 'RGB মেকানিক্যাল কিবোর্ড', price: 3800, category: 'Gadgets', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=600&q=80', badgeEn: 'Trend', badgeBn: 'ট্রেন্ড' },
];

const CATEGORIES: Category[] = [
  { id: '1', nameEn: 'Gift Sets', nameBn: 'গিফট সেট ও কম্বো', icon: '🎁', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80', count: '01' },
  { id: '2', nameEn: 'Smart Gadgets', nameBn: 'স্মার্ট গ্যাজেট', icon: '⚡', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80', count: '02' },
  { id: '3', nameEn: 'Couple Gifts', nameBn: 'কাপল গিফট', icon: '💑', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80', count: '03' },
  { id: '4', nameEn: 'Showpieces', nameBn: 'ডেস্ক শোপিস', icon: '🏺', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80', count: '04' },
  { id: '5', nameEn: 'LED & Novelty', nameBn: 'LED গ্যাজেট', icon: '✨', image: 'https://images.unsplash.com/photo-1617957718614-8c23f060c2d0?auto=format&fit=crop&w=600&q=80', count: '05' },
];

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const followMouse = () => {
      setRingPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.15,
        y: prev.y + (mousePos.y - prev.y) * 0.15,
      }));
      requestAnimationFrame(followMouse);
    };
    const frame = requestAnimationFrame(followMouse);
    return () => cancelAnimationFrame(frame);
  }, [mousePos]);

  const t = (en: string, bn: string) => (lang === 'en' ? en : bn);

  return (
    <div className={`min-h-screen bg-black text-text selection:bg-gold selection:text-black ${lang === 'bn' ? 'font-sans' : 'font-sans'}`}>
      {/* Custom Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        animate={{ 
          x: mousePos.x, 
          y: mousePos.y,
          scale: isHovering ? 2 : 1
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-9 h-9 border border-gold/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        animate={{ 
          x: ringPos.x, 
          y: ringPos.y,
          scale: isHovering ? 1.5 : 1
        }}
      />

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-gold origin-left z-[101]" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-16 py-6 bg-gradient-to-b from-black/95 to-transparent backdrop-blur-[2px]">
        <a href="#" className="font-serif text-2xl tracking-[6px] text-gold hover:text-gold-light transition-colors">
          Avi<span className="italic text-gold-light">Nix</span>
        </a>

        <ul className="hidden md:flex gap-10">
          {['Collection', 'Products', 'About', 'Contact'].map((item) => (
            <li key={item}>
              <a 
                href={`#${item.toLowerCase()}`} 
                className="text-[11px] tracking-[3px] uppercase text-muted hover:text-gold transition-colors"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {t(item, item === 'Collection' ? 'কালেকশন' : item === 'Products' ? 'পণ্যসমূহ' : item === 'About' ? 'আমাদের সম্পর্কে' : 'যোগাযোগ')}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <div className="flex bg-gold/10 border border-gold/25 rounded-full overflow-hidden p-1">
            <button 
              onClick={() => setLang('en')}
              className={`px-3 py-1 text-[10px] tracking-widest rounded-full transition-all ${lang === 'en' ? 'bg-gold text-black font-medium' : 'text-muted hover:text-gold'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang('bn')}
              className={`px-3 py-1 text-[10px] tracking-widest rounded-full transition-all ${lang === 'bn' ? 'bg-gold text-black font-medium' : 'text-muted hover:text-gold'}`}
            >
              বাং
            </button>
          </div>
          <a 
            href="#contact" 
            className="hidden md:block border border-gold text-gold px-6 py-2 text-[11px] tracking-[3px] uppercase hover:bg-gold hover:text-black transition-all"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {t('Order Now', 'অর্ডার করুন')}
          </a>
          <button className="md:hidden text-gold" onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex justify-between items-center p-8 border-b border-gold/10">
              <span className="font-serif text-2xl tracking-[6px] text-gold">Avi<span className="italic text-gold-light">Nix</span></span>
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(false)} 
                className="text-gold p-2"
              >
                <X size={32} />
              </motion.button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center px-8">
              <ul className="flex flex-col gap-10">
                {['Collection', 'Products', 'About', 'Contact'].map((item, index) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                  >
                    <a 
                      href={`#${item.toLowerCase()}`} 
                      className="group flex items-center gap-6"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-gold/30 font-serif text-sm">0{index + 1}</span>
                      <span className="text-4xl font-serif tracking-[4px] text-text group-hover:text-gold transition-colors">
                        {t(item, item === 'Collection' ? 'কালেকশন' : item === 'Products' ? 'পণ্যসমূহ' : item === 'About' ? 'আমাদের সম্পর্কে' : 'যোগাযোগ')}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-8 border-t border-gold/10 flex flex-col gap-6"
            >
              <div className="text-[10px] tracking-[4px] uppercase text-muted">Follow Us</div>
              <div className="flex gap-10">
                <a href="#" className="text-muted hover:text-gold transition-colors"><Facebook size={20} /></a>
                <a href="#" className="text-muted hover:text-gold transition-colors"><Instagram size={20} /></a>
                <a href="https://wa.me/8801615846368" className="text-muted hover:text-gold transition-colors"><MessageCircle size={20} /></a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_70%_50%,rgba(201,168,76,0.06),transparent_70%),radial-gradient(ellipse_40%_60%_at_20%_80%,rgba(201,168,76,0.03),transparent_60%)]" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-gold/15 to-transparent -translate-x-1/2" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 text-[10px] tracking-[6px] uppercase text-gold mb-8"
          >
            <div className="w-10 h-px bg-gold" />
            {t('Premium Gift Experience', 'প্রিমিয়াম গিফট এক্সপেরিয়েন্স')}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif leading-[1.05] mb-8"
          >
            {t('Gifts That', 'উপহার যা')} <br />
            <span className="italic text-gold">{t('Speak Louder', 'বলে অনেক কিছু')}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-base leading-relaxed text-muted max-w-md mb-12"
          >
            {t(
              'The finest gadgets, showpieces & gift items — sourced from top manufacturers and delivered across Bangladesh with premium packaging.',
              'সেরা গ্যাজেট, শোপিস ও গিফট আইটেম — শীর্ষ ম্যানুফ্যাকচারার থেকে আনা, প্রিমিয়াম প্যাকেজিংয়ে সারা বাংলাদেশে ডেলিভারি।'
            )}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-8"
          >
            <a 
              href="#products" 
              className="bg-gold text-black px-10 py-4 text-[11px] tracking-[3px] uppercase font-medium hover:bg-gold-light transition-all"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {t('Explore Collection', 'কালেকশন দেখুন')}
            </a>
            <a 
              href="#contact" 
              className="group flex items-center gap-3 text-[11px] tracking-[2px] uppercase text-muted hover:text-gold transition-colors"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {t('Order Now', 'অর্ডার করুন')}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Floating Badge */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute right-20 top-1/2 -translate-y-1/2 w-36 h-36 border border-gold/30 rounded-full hidden lg:flex items-center justify-center text-center p-4"
        >
          <div className="font-serif text-gold">
            <span className="text-3xl block mb-1">✦</span>
            <span className="text-[13px] leading-tight uppercase tracking-widest">
              {t('Premium\nQuality', 'প্রিমিয়াম\nমান')}
            </span>
          </div>
        </motion.div>
      </section>

      {/* Marquee */}
      <div className="border-y border-gold/10 py-5 overflow-hidden bg-gold/[0.02]">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex gap-16 whitespace-nowrap"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 text-[10px] tracking-[4px] uppercase text-muted">
              <span>Gifts</span> <span className="text-gold">◆</span>
              <span>Gadgets</span> <span className="text-gold">◆</span>
              <span>Showpieces</span> <span className="text-gold">◆</span>
              <span>Premium Quality</span> <span className="text-gold">◆</span>
              <span>Fast Delivery</span> <span className="text-gold">◆</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Categories Section */}
      <section id="collection" className="px-6 md:px-16 py-24">
        <div className="flex items-center gap-4 text-[10px] tracking-[5px] uppercase text-gold mb-4">
          <div className="w-8 h-px bg-gold" />
          {t('Our Collections', 'আমাদের কালেকশন')}
        </div>
        <h2 className="text-4xl md:text-6xl mb-16">{t('Shop by Category', 'ক্যাটাগরি অনুযায়ী কিনুন')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-0.5 bg-gold/10 border border-gold/10">
          {CATEGORIES.map((cat, idx) => (
            <motion.div 
              key={cat.id}
              whileHover={{ backgroundColor: 'rgba(201,168,76,0.05)' }}
              className={`relative bg-dark p-10 min-h-[280px] flex flex-col justify-end group cursor-none overflow-hidden ${idx === 0 ? 'md:col-span-2 md:row-span-2 min-h-[560px]' : ''}`}
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={cat.image} 
                  alt={cat.nameEn} 
                  className="w-full h-full object-cover opacity-[0.15] group-hover:opacity-[0.25] group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
              <div className="relative z-10">
                <div className="font-serif text-xs text-gold tracking-[3px] mb-2">{cat.count}</div>
                <h3 className="text-3xl mb-4">{t(cat.nameEn, cat.nameBn)}</h3>
                <a 
                  href="#products" 
                  className="inline-flex items-center gap-2 text-[10px] tracking-[3px] uppercase text-gold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                >
                  {t('Explore', 'দেখুন')} <ChevronRight size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="px-6 md:px-16 py-24">
        <div className="flex items-center gap-4 text-[10px] tracking-[5px] uppercase text-gold mb-4">
          <div className="w-8 h-px bg-gold" />
          {t('Bestsellers', 'সেরা বিক্রিত')}
        </div>
        <h2 className="text-4xl md:text-6xl mb-16">{t('Featured Products', 'ফিচার্ড পণ্যসমূহ')}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((prod) => (
            <motion.div 
              key={prod.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="relative aspect-square bg-dark border border-gold/10 flex items-center justify-center overflow-hidden group-hover:border-gold/40 transition-colors">
                {prod.badgeEn && (
                  <div className="absolute top-4 left-4 bg-gold text-black text-[9px] tracking-[2px] uppercase font-bold px-2.5 py-1 z-10">
                    {t(prod.badgeEn, prod.badgeBn || '')}
                  </div>
                )}
                <motion.img 
                  src={prod.image} 
                  alt={prod.nameEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }} 
                  transition={{ duration: 0.6 }} 
                />
              </div>
              <div className="mt-6 flex justify-between items-start">
                <div>
                  <h4 className="text-xl mb-2">{t(prod.nameEn, prod.nameBn)}</h4>
                  <div className="font-serif text-2xl text-gold">
                    ৳{prod.price.toLocaleString()}
                  </div>
                </div>
                <button className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all">
                  <Plus size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About / Why Section */}
      <section id="about" className="px-6 md:px-16 py-24 bg-off-black">
        <div className="flex items-center gap-4 text-[10px] tracking-[5px] uppercase text-gold mb-4">
          <div className="w-8 h-px bg-gold" />
          {t('Why AviNix', 'কেন AviNix')}
        </div>
        <h2 className="text-4xl md:text-6xl mb-16">{t('Why Choose Us', 'কেন আমাদের বেছে নেবেন')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 border border-gold/10">
          {[
            { icon: <Sparkles className="text-gold" />, titleEn: 'Premium Quality', titleBn: 'সর্বোচ্চ মান', descEn: 'Every product is sourced from top manufacturers and quality-checked before it reaches you.', descBn: 'প্রতিটি পণ্য শীর্ষ ম্যানুফ্যাকচারার থেকে আনা হয় এবং বিক্রির আগে মান যাচাই করা হয়।' },
            { icon: <Truck className="text-gold" />, titleEn: 'Fast Delivery', titleBn: 'দ্রুত ডেলিভারি', descEn: '1–2 days in Chittagong, 2–3 days outside Chittagong — delivered to your doorstep.', descBn: 'চট্টগ্রামে ১–২ দিন, চট্টগ্রামের বাইরে ২–৩ দিনের মধ্যে আপনার দোরগোড়ায়।' },
            { icon: <Headphones className="text-gold" />, titleEn: '24/7 Support', titleBn: 'সার্বক্ষণিক সহায়তা', descEn: "Message us on WhatsApp anytime — we're always here for orders, tracking, and questions.", descBn: 'WhatsApp-এ যেকোনো সময় মেসেজ করুন — অর্ডার, ট্র্যাকিং ও যেকোনো প্রশ্নে আমরা সবসময় আছি।' }
          ].map((item, i) => (
            <div key={i} className={`p-12 border-gold/10 ${i !== 2 ? 'md:border-r' : ''} hover:bg-gold/[0.03] transition-colors`}>
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-2xl mb-4">{t(item.titleEn, item.titleBn)}</h3>
              <p className="text-sm text-muted leading-relaxed">{t(item.descEn, item.descBn)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-16 py-32 text-center bg-dark/50">
        <div className="flex justify-center items-center gap-4 text-[10px] tracking-[5px] uppercase text-gold mb-12">
          <div className="w-8 h-px bg-gold" />
          {t('Customer Love', 'কাস্টমারদের কথা')}
          <div className="w-8 h-px bg-gold" />
        </div>
        <blockquote className="font-serif text-2xl md:text-4xl italic text-cream leading-relaxed max-w-4xl mx-auto mb-10">
          "{t(
            'I ordered a gift for my sister from AviNix — from the packaging to the product quality, absolutely everything was wonderful.',
            'AviNix থেকে বোনের জন্য গিফট নিয়েছিলাম — প্যাকেজিং থেকে শুরু করে প্রোডাক্ট কোয়ালিটি সব কিছুই অসাধারণ ছিল।'
          )}"
        </blockquote>
        <cite className="text-[11px] tracking-[3px] uppercase text-gold not-italic">
          — {t('Raheela Akhter, Dhaka', 'রাহেলা আক্তার, ঢাকা')}
        </cite>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 md:px-16 py-24">
        <div className="flex items-center gap-4 text-[10px] tracking-[5px] uppercase text-gold mb-4">
          <div className="w-8 h-px bg-gold" />
          {t('Get In Touch', 'যোগাযোগ করুন')}
        </div>
        <h2 className="text-4xl md:text-6xl mb-16">{t('Order Now', 'অর্ডার করুন এখনই')}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <p className="text-muted leading-relaxed mb-12">
              {t(
                'Contact us on WhatsApp or Facebook. We\'re ready to help with orders, pricing, and delivery anytime.',
                'WhatsApp বা Facebook-এ যোগাযোগ করুন। অর্ডার, দাম ও ডেলিভারি সম্পর্কে আমরা সবসময় সাহায্য করতে প্রস্তুত।'
              )}
            </p>
            <div className="space-y-6 mb-12">
              {[
                { label: 'WhatsApp', value: '01615846368' },
                { label: 'Facebook', value: 'facebook.com/AviNix' },
                { label: 'Instagram', value: 'instagram.com/AviNix' },
                { label: t('Delivery', 'ডেলিভারি'), value: t('1-2 days in Chittagong, 2-3 days outside', 'চট্টগ্রামে ১-২ দিন, বাইরে ২-৩ দিন') }
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-4 text-sm border-b border-gold/10 pb-4">
                  <strong className="text-text min-w-[100px]">{row.label}</strong>
                  <span className="text-muted">{row.value}</span>
                </div>
              ))}
            </div>
            <a 
              href="https://wa.me/8801615846368" 
              className="inline-flex items-center gap-3 bg-gold text-black px-10 py-4 text-[11px] tracking-[3px] uppercase font-medium hover:bg-gold-light transition-all"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <MessageCircle size={16} />
              {t('WhatsApp Us', 'WhatsApp করুন')}
            </a>
          </div>

          <form className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder={t('Your Name', 'আপনার নাম')}
              className="bg-white/5 border border-gold/15 p-4 text-sm outline-none focus:border-gold transition-colors"
            />
            <input 
              type="tel" 
              placeholder={t('Phone Number', 'মোবাইল নম্বর')}
              className="bg-white/5 border border-gold/15 p-4 text-sm outline-none focus:border-gold transition-colors"
            />
            <input 
              type="text" 
              placeholder={t('Which product are you interested in?', 'আপনি কোন প্রোডাক্ট চান?')}
              className="bg-white/5 border border-gold/15 p-4 text-sm outline-none focus:border-gold transition-colors"
            />
            <textarea 
              rows={4} 
              placeholder={t('Your message...', 'বিস্তারিত লিখুন...')}
              className="bg-white/5 border border-gold/15 p-4 text-sm outline-none focus:border-gold transition-colors resize-none"
            />
            <button 
              type="submit" 
              className="bg-gold text-black py-4 text-[11px] tracking-[3px] uppercase font-bold hover:bg-gold-light transition-all"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {t('Send Message', 'মেসেজ পাঠান')}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-12 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="font-serif text-2xl tracking-[6px] text-gold">AviNix</div>
        <div className="text-[11px] text-muted uppercase tracking-widest">
          {t('© 2025 AviNix. All rights reserved.', '© ২০২৫ AviNix. সর্বস্বত্ব সংরক্ষিত।')}
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-[10px] tracking-[3px] uppercase text-muted hover:text-gold transition-colors"><Facebook size={16} /></a>
          <a href="#" className="text-[10px] tracking-[3px] uppercase text-muted hover:text-gold transition-colors"><Instagram size={16} /></a>
          <a href="#" className="text-[10px] tracking-[3px] uppercase text-muted hover:text-gold transition-colors"><MessageCircle size={16} /></a>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/8801615846368"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.4)] flex items-center justify-center hover:bg-[#128C7E] transition-all group"
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-4 bg-white text-black px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[2px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-gold/10">
          {t('Chat with us', 'আমাদের সাথে চ্যাট করুন')}
        </span>
      </motion.a>
    </div>
  );
}
