import { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCartOpen } from '../../store/slices/cartSlice';

export default function Header() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <motion.header 
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -150 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 sm:top-8 inset-x-0 z-50 px-0 sm:px-12 pointer-events-none"
      >
        <nav className="max-w-7xl mx-auto bg-brand-cream/95 backdrop-blur-sm border-b sm:border border-brand-gold/20 px-6 py-3 sm:py-0 flex items-center justify-between transition-all duration-500 pointer-events-auto rounded-none shadow-2xl shadow-black/5">
          {/* Logo */}
          <Link to="/" className="flex-none flex items-center group cursor-pointer h-full">
             <div className="h-20 hidden sm:flex items-center justify-center px-4 border-r border-brand-gold/20 group-hover:bg-brand-gold/5 transition-all duration-500">
                <img src="/logo/bgremovepng.png" className="h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-500" alt="Veadya Logo" />
             </div>
             <div className="sm:hidden flex items-center justify-center h-16 px-3">
                <img src="/logo/bgremovepng.png" className="h-12 w-auto object-contain" alt="Veadya Logo" />
             </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden xl:flex flex-1 items-center justify-center gap-10">
            <Link to="/" className="text-[10px] font-bold tracking-[0.15em] uppercase text-brand-green/60 hover:text-brand-gold transition-all duration-300 relative group">
              HOME
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </Link>

            <div className="relative group py-8">
              <Link to="/shop" className="text-[10px] font-bold tracking-[0.15em] uppercase text-brand-green/60 hover:text-brand-gold transition-all duration-300 relative">
                SHOP
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
              </Link>
              <div className="absolute left-1/2 top-full w-56 -translate-x-1/2 translate-y-3 opacity-0 invisible group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div className="bg-brand-cream border border-brand-gold/30 shadow-2xl p-3">
                  <Link to="/shop?category=capsule" className="block px-5 py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-brand-green/70 hover:bg-brand-sage/25 hover:text-brand-green transition-colors">
                    Capsule
                  </Link>
                  <Link to="/shop?category=juice" className="block px-5 py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-brand-green/70 hover:bg-brand-sage/25 hover:text-brand-green transition-colors">
                    Juice
                  </Link>
                </div>
              </div>
            </div>

            {["ABOUT", "BLOG", "TRACK ORDER", "CONTACT US"].map((item) => (
              <Link 
                key={item} 
                to="#" 
                className="text-[10px] font-bold tracking-[0.15em] uppercase text-brand-green/60 hover:text-brand-gold transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-6">
            <div className="hidden lg:flex items-center gap-3 bg-brand-green/5 border border-brand-gold/20 px-4 py-2 hover:border-brand-gold/40 transition-all">
              <Search size={14} className="text-brand-gold/50" />
              <input 
                type="text" 
                placeholder="Find your plant-based cure..." 
                className="bg-transparent border-none outline-none text-[10px] text-brand-text w-40 placeholder:text-brand-green/30"
              />
            </div>

            <div className="flex items-center gap-1 sm:gap-4 text-brand-green/70">
              <Link to="/login" className="p-2 hover:text-brand-gold transition-all cursor-pointer">
                <User size={18} />
              </Link>
              <div 
                onClick={() => dispatch(setCartOpen(true))}
                className="p-2 hover:text-brand-gold transition-all cursor-pointer relative"
              >
                {items.length > 0 && (
                  <div className="w-2 h-2 bg-brand-gold absolute top-1 right-1 rounded-full border border-white shadow-[0_0_8px_rgba(234,179,8,0.3)]" />
                )}
                <ShoppingBag size={18} />
              </div>
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="xl:hidden p-2 text-brand-green hover:text-brand-gold transition-all"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] cursor-crosshair"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 w-full max-w-sm h-full bg-brand-green z-[110] p-12 flex flex-col"
            >
              <div className="flex items-center justify-between mb-16">
                <div className="bg-white p-2 border border-white/10">
                  <img src="/logo/bgremovepng.png" className="h-16 w-auto object-contain" alt="Veadya Logo" />
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="text-white hover:text-brand-gold transition-colors">
                  <Menu className="rotate-90" size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-8">
                {["HOME", "SHOP", "CAPSULE", "JUICE", "ABOUT", "BLOG", "TRACK ORDER", "CONTACT US"].map((item, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    key={item}
                  >
                    <Link
                      to={item === "SHOP" ? "/shop" : item === "HOME" ? "/" : item === "CAPSULE" ? "/shop?category=capsule" : item === "JUICE" ? "/shop?category=juice" : "#"}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-2xl font-serif text-white/70 hover:text-white transition-all hover:translate-x-4 inline-block"
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
