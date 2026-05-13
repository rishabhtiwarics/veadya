import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Leaf, Sparkles, Sprout, ShieldCheck, ChevronLeft, ChevronRight, Send, Mail, Clock, Truck, Headphones, CreditCard, Rabbit, Gift, Droplet } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products, heroSlides, testimonials, ingredients } from '../data/products';
import ProductCard from '../components/shop/ProductCard';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    // Scroll reveal animations with GSAP
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach((container) => {
      const items = container.querySelectorAll('.stagger-item');
      gsap.fromTo(items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => {
      clearInterval(timer);
      clearInterval(testimonialTimer);
    };
  }, []);

  return (
    <>
      {/* Hero Slider Section */}
      <section className="relative h-[550px] sm:h-[650px] lg:h-[850px] flex items-center justify-center overflow-hidden bg-brand-cream">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-20 text-center text-white px-6 max-w-5xl mx-auto flex h-full md:items-center md:justify-center items-end justify-end pt-28 pb-16">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentSlide}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="space-y-4 md:space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-center gap-3 mb-2"
                >
                  <div className="w-8 h-[1px] bg-brand-gold/60" />
                  <span className="text-[10px] font-bold tracking-[0.5em] text-brand-gold uppercase">
                    {heroSlides[currentSlide].sub}
                  </span>
                  <div className="w-8 h-[1px] bg-brand-gold/60" />
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-serif text-brand-cream leading-[1.05] tracking-wide">
                  {heroSlides[currentSlide].title}
                </h2>
                <p className="text-brand-cream/70 font-sans text-sm md:text-base mb-6 md:mb-12 leading-relaxed font-medium max-w-xl mx-auto">
                  {heroSlides[currentSlide].desc}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                  <Link to="/shop">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto
                       bg-white text-brand-text px-8 py-4 text-[10px] font-bold tracking-[0.3em] 
                       uppercase transition-all shadow-2xl hover:bg-brand-green hover:text-white rounded-full"
                    >
                      SHOP WELLNESS
                    </motion.button>
                  </Link>
                  <Link to="/shop">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto border border-white/20
                      hover:border-white text-white px-8 py-4 text-[10px] font-bold tracking-[0.3em] 
                      uppercase transition-all backdrop-blur-md rounded-full"
                    >
                      OUR STORY
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Vertical Slider Indicators */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-6 items-center">
          <p className="text-[10px] font-bold text-white uppercase tracking-[0.4em] rotate-90 mb-12 opacity-50">SCROLL</p>
          <div className="h-40 w-[1px] bg-white/10 relative">
            <motion.div
              animate={{ top: `${(currentSlide / (heroSlides.length - 1)) * 100}%` }}
              className="absolute left-1/2 -translate-x-1/2 w-4 h-4 border border-white bg-white/20 backdrop-blur-sm rounded-full"
            />
          </div>
          <div className="flex flex-col gap-4 mt-8">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`text-[10px] font-bold transition-all ${currentSlide === i ? 'text-white scale-125' : 'text-white/20'}`}
              >
                0{i + 1}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Highlights */}
      <section className="py-24 px-6 bg-white scroll-reveal shadow-[0_30px_90px_-60px_rgba(35,65,35,0.18)] relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute -top-10 -right-10 w-64 md:w-96 h-64 md:h-96 opacity-30 pointer-events-none z-0">
          <motion.img
            src="/discover/1.png"
            alt="Decorative Leaf"
            animate={{
              y: [0, 15, 0],
              rotate: [0, 8, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="absolute -bottom-10 -left-10 w-64 md:w-96 h-64 md:h-96 opacity-30 pointer-events-none z-0 rotate-180">
          <motion.img
            src="/discover/1.png"
            alt="Decorative Leaf"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 8, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full h-full object-contain"
          />
        </div>


        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 space-y-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-8 h-[1px] bg-brand-gold/40" />
              <span className="text-[10px] font-bold tracking-[0.5em] text-brand-gold uppercase">
                Shop by Category
              </span>
              <div className="w-8 h-[1px] bg-brand-gold/40" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-brand-green leading-none tracking-wide">
              Category Highlights
            </h2>
          </div>

          <div className="flex justify-center w-full">
            <div className="flex sm:grid overflow-x-auto sm:overflow-visible pb-12 sm:pb-0 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl snap-x snap-mandatory scrollbar-hide px-4 sm:px-0">
              {[
                { title: 'CAPSULES', items: '1 Items', image: '/productimges/product5.png', icon: Sparkles, to: '/shop?category=capsules' },
                { title: 'DROP', items: '1 Item', image: '/productimges/product5.png', icon: Droplet, to: '/shop?category=drop' },
                { title: 'JUICE', items: '4 Items', image: '/productimges/product5.png', icon: Leaf, to: '/shop?category=juice' },
              ].map((category) => (
                <Link key={category.title} to={category.to} className="block group flex-shrink-0 w-[85%] sm:w-auto snap-center">
                  <div className="relative overflow-hidden border border-brand-gold/20 bg-brand-earth/5 p-3 shadow-sm hover:shadow-xl transition-all duration-700 rounded-t-full rounded-b-[80px]">
                    <div className="relative h-[320px] sm:h-[380px] lg:h-[420px] overflow-hidden mb-8 sm:mb-12 rounded-t-full rounded-b-3xl border border-brand-gold/10">
                      <div className="relative w-full h-full overflow-hidden bg-brand-earth">
                        <motion.img
                          src={category.image}
                          alt={category.title}
                          className="h-full w-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
                        />
                      </div>
                    </div>

                    <div className="relative px-6 pb-4 sm:pb-8 text-center">
                      <div className="absolute top-[-60px] sm:top-[-80px] left-1/2 -translate-x-1/2">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#fcf9f4] bg-brand-gold text-white shadow-lg transition-transform duration-500 group-hover:scale-110">
                          <category.icon size={24} strokeWidth={1.5} />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-serif text-2xl text-brand-green tracking-wide group-hover:tracking-widest transition-all duration-500 uppercase">{category.title}</h3>
                        <p className="text-[10px] tracking-[0.3em] text-brand-green/50 font-bold uppercase">{category.items}</p>

                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Brand Values Feature Bar */}
          <div className="mt-20 bg-brand-earth/10 border border-brand-green/10 p-12 md:p-10 rounded-[80px] md:rounded-full shadow-sm max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-0">
              {[
                { icon: Leaf, title: "Natural Ingredients", desc: "Gentle & Safe" },
                { icon: Rabbit, title: "Cruelty Free", desc: "Love for Animals" },
                { icon: Gift, title: "Premium Quality", desc: "Best for You" },
                { icon: Sprout, title: "Sustainable", desc: "Better for Planet" }
              ].map((item, idx) => (
                <div key={idx} className={`flex flex-col md:flex-row items-center justify-center lg:justify-start gap-5 md:gap-6 px-4 md:px-10 ${idx !== 3 ? 'lg:border-r border-brand-green/10' : ''}`}>
                  <div className="text-brand-green bg-white/40 p-4 rounded-full border border-brand-green/5 shadow-inner">
                    <item.icon size={28} strokeWidth={1.5} />
                  </div>
                  <div className="text-center md:text-left space-y-1">
                    <h4 className="font-serif text-[14px] text-brand-green uppercase tracking-[0.1em] font-bold">{item.title}</h4>
                    <p className="text-[10px] text-brand-green/50 font-bold uppercase tracking-[0.2em]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Features Row */}
      <section id="core-values" className="py-20 bg-brand-earth/20 relative overflow-hidden scroll-reveal">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12 space-y-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-8 h-[1px] bg-brand-gold/40" />
              <span className="text-[10px] font-bold tracking-[0.5em] text-brand-gold uppercase">
                Core Values
              </span>
              <div className="w-8 h-[1px] bg-brand-gold/40" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-brand-green leading-none tracking-wide">
              Ayurvedic Purity
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-container">
            {[
              { icon: Leaf, title: "Natural Ingredients", desc: "Pure botanical extracts sourced directly from nature for the purest wellness experience." },
              { icon: Sparkles, title: "Standardized Quality", desc: "Scientific batches crafted with Ayurvedic care and extreme purity in our clinical laboratory." },
              { icon: Sprout, title: "Eco Friendly", desc: "Sustainable extraction and ethical sourcing that deeply respects the Earth and its cycles." },
              { icon: ShieldCheck, title: "Potent Formula", desc: "Heritage recipes designed for deep internal absorption and supreme cellular vitality." }
            ].map((feature, i) => (
              <div
                key={i}
                className="stagger-item h-full"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.8
                  }}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className="bg-white p-12 text-center flex flex-col items-center group transition-all duration-500 border border-brand-green/5 shadow-xl shadow-brand-green/5 h-full rounded-3xl"
                >
                  <div className="w-16 h-16 bg-brand-earth/30 rounded-full flex items-center justify-center mb-8 group-hover:bg-brand-green group-hover:text-white transition-colors duration-500">
                    <feature.icon className="w-6 h-6 text-brand-green group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-2xl mb-4 text-brand-green tracking-wide uppercase">{feature.title}</h3>
                  <p className="font-sans text-xs leading-relaxed text-brand-text/60 font-medium px-4">{feature.desc}</p>
                  <div className="mt-8 w-8 h-[1px] bg-brand-green/20 group-hover:w-16 transition-all duration-500" />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Refined Section */}
      <section className="py-20 px-6 bg-white scroll-reveal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-8 h-[1px] bg-brand-gold/40" />
              <span className="text-[10px] font-bold tracking-[0.5em] text-brand-gold uppercase">
                Curated Selection
              </span>
              <div className="w-8 h-[1px] bg-brand-gold/40" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-brand-green leading-none tracking-wide">
              Our Best Sellers
            </h2>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
              {['all', 'capsules', 'drop', 'juice'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all border ${activeFilter === cat
                    ? 'bg-brand-green text-white border-brand-green shadow-lg'
                    : 'bg-white text-brand-green border-brand-green/20 hover:border-brand-green'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-container">
            {products
              .filter(p => activeFilter === 'all' || p.category === activeFilter)
              .slice(0, 4)
              .map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-4 text-[11px] font-bold tracking-[0.4em] uppercase text-brand-green group"
            >
              View All
              <div className="w-10 h-10 rounded-full border border-brand-green/20 flex items-center justify-center group-hover:bg-brand-green group-hover:border-brand-green transition-all duration-500">
                <ArrowRight size={14} className="group-hover:text-white transition-colors" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Crafted with Nature - Square Theme */}
      <section className="py-16 px-6 bg-brand-earth/30 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-stretch">
            {/* Left: Image Grid (Square Theme) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex-1 grid grid-cols-2 gap-3 h-[450px] md:h-[600px] w-full"
            >
              <div className="flex flex-col gap-3 h-full">
                <div className="h-[45%] overflow-hidden border border-brand-green/5 shadow-lg rounded-2xl relative group/img">
                  <motion.img
                    src="/productimges/product3.png"
                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                    alt="Ayurvedic Treatment"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all duration-500 z-20">
                    <Link to="/shop">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-brand-green px-6 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase shadow-2xl"
                      >
                        Shop Now
                      </motion.button>
                    </Link>
                  </div>
                </div>
                <div className="h-[55%] overflow-hidden border border-brand-green/5 shadow-lg rounded-2xl relative group/img">
                  <motion.img
                    src="/productimges/product5.png"
                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                    alt="Botanical Oils"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all duration-500 z-20">
                    <Link to="/shop">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-brand-green px-6 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase shadow-2xl"
                      >
                        Shop Now
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="h-full overflow-hidden border border-brand-green/5 shadow-xl relative group group/img rounded-2xl">
                <div className="absolute inset-0 bg-brand-green/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <motion.img
                  src="/productimges/product7.png"
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                  alt="Wellness Ritual"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all duration-500 z-20">
                  <Link to="/shop">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-brand-green px-6 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase shadow-2xl"
                    >
                      Shop Now
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right: Content Area (Square Theme) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex-1 flex flex-col justify-center space-y-8 py-4"
            >
              <div className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <div className="w-6 h-[1px] bg-brand-gold" />
                  <span className="text-[10px] font-bold tracking-[0.5em] text-brand-gold uppercase">Our Philosophy</span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-3xl font-serif text-brand-green leading-[1.1] tracking-wide">
                  Crafted with Nature <br />
                  <span className="italic text-brand-gold">&</span> Inspired by Wellness
                </h2>
                <p className="text-brand-green/70 font-sans text-sm md:text-base leading-relaxed font-semibold max-w-xl">
                  At VEADYA, we specialize in high-purity Aloe Vera Juice and potent Ayurvedic Capsules, meticulously crafted to restore your body's natural harmony. Our philosophy centers on pure, clinical-grade herbal solutions for a holistic lifestyle.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Aloe Vera Purity", desc: "100% organic, cold-pressed juice derived from the finest hand-selected inner leaf fillets." },
                  { title: "Ayurvedic Potency", desc: "Standardized herbal capsules formulated with traditional wisdom and modern extraction precision." }
                ].map((item, i) => (
                  <div key={i} className="group p-6 border-l-2 border-brand-gold bg-brand-earth/5 hover:bg-brand-earth/15 transition-all space-y-3 rounded-2xl">
                    <h4 className="font-serif text-lg text-brand-green flex items-center gap-3 tracking-wide">
                      <div className="w-2 h-2 bg-brand-gold" />
                      {item.title}
                    </h4>
                    <p className="text-xs text-brand-green/60 leading-relaxed font-bold uppercase tracking-wider">{item.desc}</p>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="self-start inline-flex items-center gap-6 bg-brand-green text-brand-gold px-12 py-5 text-xs font-black tracking-[0.3em] uppercase shadow-2xl hover:bg-brand-gold hover:text-brand-green transition-all rounded-full"
              >
                Learn Our Process
                <ArrowRight size={16} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Botanical Origins - Refined */}
      <section className="py-20 px-6 bg-white scroll-reveal">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-center mb-16 space-y-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-8 h-[1px] bg-brand-gold/40" />
              <span className="text-[10px] font-bold tracking-[0.5em] text-brand-gold uppercase">
                Pure Earth Ingredients
              </span>
              <div className="w-8 h-[1px] bg-brand-gold/40" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-brand-green tracking-wide">
              Botanical Origins
            </h2>
            <p className="max-w-2xl mx-auto text-brand-text/70 font-sans leading-relaxed text-sm md:text-base px-4 font-semibold uppercase tracking-wider">
              We source the world’s most potent botanicals, harvested at their peak to ensure maximal nutrient density and vitalizing wellness benefits.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-8 stagger-container">
            {ingredients.map((ing, i) => (
              <div key={i} className="stagger-item w-full">
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 1.2
                  }}
                  whileHover={{ y: -18, scale: 1.02 }}
                  className="group cursor-pointer flex flex-col items-center w-full"
                >
                  <div className="w-full aspect-square bg-white shadow-[0_4px_20px_rgba(90,107,76,0.08)] p-2 rounded-2xl border border-brand-gold/20 transition-all duration-500 group-hover:border-brand-green/30 group-hover:shadow-[0_20px_50px_rgba(90,107,76,0.14)] overflow-hidden">
                    <div className="w-full h-full overflow-hidden rounded-xl bg-brand-earth/30">
                      <img src={ing.icon} className="w-full h-full object-cover transition-transform duration-1000" alt={ing.name} />
                    </div>
                  </div>
                  <h4 className="mt-6 text-[11px] font-bold tracking-[0.2em] text-brand-green/80 uppercase transition-all duration-500 group-hover:text-brand-green group-hover:tracking-[0.3em]">
                    {ing.name}
                  </h4>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ayurveda Section */}
      <div className="scroll-reveal">
        <AyurvedaSection />
      </div>

      {/* Testimonials Slider */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="mb-12 flex justify-center">
            <span className="text-4xl font-serif text-brand-green/30">"</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-[1px] bg-brand-gold/40" />
            <span className="text-[10px] font-bold tracking-[0.5em] text-brand-gold uppercase">
              Client Stories
            </span>
            <div className="w-8 h-[1px] bg-brand-gold/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-serif text-brand-green mb-12 tracking-wide"
          >
            Clients words about us
          </motion.h2>

          <div className="relative max-w-4xl mx-auto px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="space-y-8"
              >
                <p className="text-sm md:text-lg text-brand-green/70 font-sans leading-relaxed font-medium max-w-2xl mx-auto px-8">
                  {testimonials[currentTestimonial].quote}
                </p>
                <div className="flex items-center justify-center gap-2 pt-4">
                  <h4 className="text-[11px] font-bold tracking-[0.3em] text-brand-green uppercase">
                    {testimonials[currentTestimonial].author}
                  </h4>
                  <span className="text-brand-green/30 px-2 font-bold text-xs">,</span>
                  <p className="text-[11px] font-bold tracking-[0.3em] text-brand-green/60 uppercase">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-4 text-brand-green/40 hover:text-brand-green transition-colors"
            >
              <ChevronLeft size={32} strokeWidth={1} />
            </button>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-brand-green/40 hover:text-brand-green transition-colors"
            >
              <ChevronRight size={32} strokeWidth={1} />
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className="group relative py-4"
              >
                <div className={`h-[2px] transition-all duration-500 ${currentTestimonial === i ? 'w-12 bg-brand-green' : 'w-4 bg-brand-green/20 group-hover:bg-brand-green/40'
                  }`} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Opening Hours Section */}
      <div className="scroll-reveal">
        <OpeningHoursSection />
      </div>

      {/* Newsletter Section */}
      <section className="bg-linear-to-b from-brand-gold/95 via-brand-gold to-brand-gold/95 py-10 px-6 relative overflow-hidden scroll-reveal">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] z-0 pointer-events-none">
          <Send size={450} className="text-brand-green -rotate-12" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-3 mb-4"
              >
                <div className="w-8 h-[1px] bg-brand-gold/40" />
                <span className="text-[10px] font-bold tracking-[0.5em] text-brand-gold uppercase">Join the Circle</span>
                <div className="w-8 h-[1px] bg-brand-gold/40" />
              </motion.div>
              <h2 className="text-2xl md:text-3xl lg:text-3xl font-serif text-brand-green leading-tight font-medium">
                Wisdom of <br /> Botanical Heritage.
              </h2>
              <p className="text-brand-green max-w-2xl mx-auto font-sans font-semibold text-base md:text-lg leading-relaxed">
                Subscribe to receive seasonal wellness rituals, exclusive collection previews, and artisanal stories from our sanctuary.
              </p>
            </div>

            <div className="max-w-2xl mx-auto pt-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-brand-green/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                <div className="relative flex flex-col sm:flex-row items-center gap-3 bg-white/60 backdrop-blur-2xl border border-brand-green/20 p-2 rounded-2xl shadow-2xl">
                  <div className="flex-grow flex items-center px-6 gap-3">
                    <Mail size={18} className="text-brand-green/60" />
                    <input type="email" placeholder="Enter your email address" className="w-full bg-transparent py-4 text-brand-green placeholder:text-brand-green/60 text-sm font-bold focus:outline-none" />
                  </div>
                  <button className="w-full sm:w-auto bg-brand-green text-brand-gold px-8 py-4 rounded-xl text-xs font-black tracking-[0.2em] uppercase hover:bg-brand-green/90 transition-all shadow-lg">
                    Subscribe
                  </button>
                </div>
              </div>
              <p className="mt-6 text-[10px] text-brand-green/60 font-black tracking-[0.2em] uppercase">
                By joining, you agree to our <span className="text-brand-green cursor-pointer hover:underline border-b-2 border-brand-green/30 pb-0.5">Privacy Rituals</span>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function OpeningHoursSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={containerRef} className="relative py-16 md:py-24 overflow-hidden bg-brand-cream">
      <motion.div style={{ y }} className="absolute inset-0 z-0 h-[130%] w-full">
        <div className="absolute inset-0 bg-brand-cream/60 z-10" />
        <img src="/discover/one.png" className="w-full h-full object-cover opacity-40" alt="background" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-3 gap-3 md:gap-6">
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="aspect-[2/5] overflow-hidden rounded-t-full rounded-b-2xl shadow-2xl">
                <img src="/productimges/one.jpeg" className="w-full h-full object-cover" alt="Wellness 1" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: -50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="aspect-[2/5] overflow-hidden rounded-t-full rounded-b-2xl shadow-2xl mt-12 md:mt-16">
                <img src="/productimges/three.jpeg" className="w-full h-full object-cover" alt="Wellness 2" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="aspect-[2/5] overflow-hidden rounded-t-full rounded-b-2xl shadow-2xl">
                <img src="/productimges/two.jpeg" className="w-full h-full object-cover" alt="Wellness 3" />
              </motion.div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-12 text-center md:text-left flex flex-col items-center md:items-start">
            <div className="space-y-6 flex flex-col items-center md:items-start">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4 flex flex-col items-center md:items-start">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <div className="w-6 h-[1px] bg-brand-gold" />
                  <span className="text-[10px] font-bold tracking-[0.5em] text-brand-gold uppercase">Sanctuary & Shop</span>
                </div>
              </motion.div>
              <p className="text-brand-green font-sans leading-relaxed text-sm md:text-base font-semibold max-w-md">
                Discover our specialized collection of potent <span className="text-brand-gold font-bold">Ayurveda capsules</span> and revitalizing, high-purity <span className="text-brand-gold font-bold">Aloe Vera juice</span>. We provide natural remedies that nurture your body from the inside out.
              </p>
            </div>

            <div className="space-y-10">
              <div className="grid grid-cols-2 gap-8 text-left">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold tracking-[0.2em] text-brand-green uppercase">The Sanctuary</h4>
                  <p className="text-xs text-brand-green/80 font-semibold leading-relaxed">124 Botanical Gardens,<br />Veadya Valley, HP 173212</p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold tracking-[0.2em] text-brand-green uppercase">Ritual Hours</h4>
                  <p className="text-xs text-brand-green/80 font-semibold leading-relaxed">Mon - Fri: 09:00 - 20:00<br />Sat - Sun: 10:00 - 18:00</p>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-green/10 flex items-center gap-4 text-brand-green/40">
                <Clock size={16} />
                <span className="text-[10px] font-bold tracking-[0.1em] uppercase">Private Consultations Available</span>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <motion.button whileHover={{ scale: 1.05, backgroundColor: "#2d2d2d" }} whileTap={{ scale: 0.95 }} className="bg-brand-green text-white px-12 py-5 text-[11px] font-bold tracking-[0.3em] uppercase rounded-full shadow-xl transition-all">
                Explore Products
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AyurvedaSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-24 w-full overflow-hidden flex items-center justify-center">
      <motion.div style={{ y }} className="absolute inset-0 z-0 h-[130%] w-full">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img src="/discover/one.png" className="w-full h-full object-cover" alt="Ayurveda Background" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white">
        <div className="space-y-6 drop-shadow-2xl">
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }}>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-brand-gold/60" />
              <span className="text-[10px] font-bold tracking-[0.5em] text-brand-gold uppercase">Botanical Wisdom</span>
              <div className="w-12 h-[1px] bg-brand-gold/60" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif leading-tight tracking-wide text-white">
              Wisdom of <br />
              <span className="italic text-brand-gold">Botanical Heritage</span>
            </h2>
          </motion.div>
          <motion.p initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }} className="text-white font-sans text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-semibold">
            Immerse yourself in centuries of herbal expertise. Our legacy of purity combines ancient Ayurvedic rituals with modern botanical science to restore your natural vital force.
          </motion.p>
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}>
            <motion.button whileHover={{ scale: 1.05, backgroundColor: "#2d2d2d" }} whileTap={{ scale: 0.95 }}
              className="bg-brand-green text-white px-12 py-5 text-[11px] font-bold tracking-[0.3em] uppercase rounded-full shadow-xl transition-all"
              style={{ color: "#ffff" }}>
              Explore Our Heritage
            </motion.button>


          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
