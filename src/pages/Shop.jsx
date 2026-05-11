import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../data/products';
import ProductCard from '../components/shop/ProductCard';
import { motion } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

export default function Shop() {
  useEffect(() => {
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach((container) => {
      const items = container.querySelectorAll('.stagger-item');
      gsap.fromTo(items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
          }
        }
      );
    });
  }, []);

  return (
    <div className="bg-brand-cream min-h-screen pt-12 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <div className="w-8 h-[1px] bg-brand-gold/40" />
            <span className="text-[10px] font-bold tracking-[0.5em] text-brand-gold uppercase">Full Inventory</span>
            <div className="w-8 h-[1px] bg-brand-gold/40" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-brand-green leading-none tracking-wide"
          >
            Shop All Wellness
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-brand-green/60 font-sans text-sm md:text-base leading-relaxed mt-6 font-medium"
          >
            Explore our complete collection of pure botanical extracts, Ayurvedic capsules, and clinical-grade Aloe Vera solutions.
          </motion.p>
        </div>

        {/* Filter/Sort Placeholder */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 py-6 border-y border-brand-green/10">
            <div className="flex gap-8 text-[10px] font-bold tracking-[0.2em] text-brand-green/40 uppercase">
                <span className="text-brand-green cursor-pointer">All Products</span>
                <span className="hover:text-brand-green cursor-pointer transition-colors">Juices</span>
                <span className="hover:text-brand-green cursor-pointer transition-colors">Capsules</span>
                <span className="hover:text-brand-green cursor-pointer transition-colors">Extracts</span>
            </div>
            <div className="mt-4 md:mt-0 text-[10px] font-bold tracking-[0.2em] text-brand-green/40 uppercase">
                Showing {products.length} Results
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-container">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
