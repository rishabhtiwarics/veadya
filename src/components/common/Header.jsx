import { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X, ArrowUpRight } from 'lucide-react';
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
        <nav className="max-w-7xl mx-auto bg-brand-cream/95 backdrop-blur-sm border-b sm:border border-brand-gold/20 px-6 py-3 sm:py-0 flex items-center justify-between transition-all duration-500 pointer-events-auto rounded-none sm:rounded-full shadow-2xl shadow-black/5">
          {/* Logo */}
          <Link to="/" className="flex-none flex items-center group cursor-pointer h-full">
             <div className="h-20 hidden sm:flex items-center justify-center px-4 border-r border-brand-gold/20 group-hover:bg-brand-gold/5 transition-all duration-500">
                <img src="/logo/bgremovepng.png" className="h-16 w-auto object-contain transition-transform duration-500" alt="Veadya Logo" />
             </div>
             <div className="sm:hidden flex items-center justify-center h-16 px-3">
                <img src="/logo/bgremovepng.png" className="h-12 w-auto object-contain" alt="Veadya Logo" />
             </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden xl:flex flex-1 items-center justify-center gap-10">
            <Link 
              to="/" 
              className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 relative group ${
                location.pathname === '/' ? 'text-brand-gold' : 'text-brand-green/80 hover:text-brand-gold'
              }`}
            >
              HOME
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-brand-gold transition-all duration-500 ${
                location.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
              {location.pathname === '/' && (
                <motion.div 
                  layoutId="activeDot"
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-gold rounded-full"
                />
              )}
            </Link>

            <div className="relative group py-8">
              <Link 
                to="/shop" 
                className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 relative group ${
                  location.pathname === '/shop' ? 'text-brand-gold' : 'text-brand-green/80 hover:text-brand-gold'
                }`}
              >
                SHOP
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-brand-gold transition-all duration-500 ${
                  location.pathname === '/shop' ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
                {location.pathname === '/shop' && (
                  <motion.div 
                    layoutId="activeDot"
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-gold rounded-full"
                  />
                )}
              </Link>
              <div className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 translate-y-4">
                <div className="bg-white/95 backdrop-blur-2xl border border-brand-gold/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[32px] overflow-hidden p-3 relative">
                  {/* Decorative accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-brand-gold/5 rounded-bl-[100px] -z-10" />
                  
                  {[
                    { name: 'Capsules', to: '/shop?category=capsules' },
                    { name: 'Drop', to: '/shop?category=drop' },
                    { name: 'Juice', to: '/shop?category=juice' }
                  ].map((cat) => (
                    <Link 
                      key={cat.name} 
                      to={cat.to} 
                      className="group/item flex items-center justify-between px-6 py-4 rounded-2xl hover:bg-brand-green transition-all duration-500 mb-1 last:mb-0"
                    >
                      <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-green/70 group-hover/item:text-white group-hover/item:translate-x-1 transition-all">
                        {cat.name}
                      </span>
                      <ArrowUpRight size={12} className="text-brand-gold opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0 -translate-x-2 transition-all duration-500" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {["ABOUT", "BLOG", "TRACK ORDER", "CONTACT US"].map((item) => {
              const to = `/${item.toLowerCase().replace(' ', '-')}`;
              const isActive = location.pathname === to;
              return (
                <Link 
                  key={item} 
                  to={to} 
                  className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 relative group ${
                    isActive ? 'text-brand-gold' : 'text-brand-green/80 hover:text-brand-gold'
                  }`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-0 h-[1px] bg-brand-gold transition-all duration-500 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                  {isActive && (
                    <motion.div 
                      layoutId="activeDot"
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-gold rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-6">
            <div className="hidden lg:flex items-center gap-3 bg-brand-green/5 border border-brand-gold/20 px-4 py-2 hover:border-brand-gold/40 transition-all rounded-full">
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
                className="relative p-2 text-brand-green hover:text-brand-gold transition-all cursor-pointer group"
              >
                <ShoppingBag size={20} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                {items.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={items.length}
                    className="absolute top-0 right-0 w-4 h-4 bg-brand-gold text-white text-[8px] flex items-center justify-center rounded-full font-black shadow-sm"
                  >
                    {items.length}
                  </motion.span>
                )}
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
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[85%] max-w-md bg-brand-cream/80 backdrop-blur-2xl z-[110] flex flex-col shadow-2xl"
            >
              {/* Header of Drawer */}
              <div className="p-8 flex items-center justify-between">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-3 rounded-2xl shadow-xl shadow-brand-green/5 border border-brand-green/5"
                >
                  <img src="/logo/bgremovepng.png" className="h-12 w-auto" alt="Veadya" />
                </motion.div>
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className="w-12 h-12 rounded-full bg-white/50 backdrop-blur-md border border-brand-green/10 flex items-center justify-center text-brand-green hover:bg-white transition-all shadow-sm"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-grow overflow-y-auto px-10 py-12 flex flex-col justify-center">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Shop All', path: '/shop' },
                  { name: 'Our Story', path: '/about' },
                  { name: 'Wellness Blog', path: '/blog' },
                  { name: 'Track Order', path: '/track' },
                  { name: 'Contact Us', path: '/contact' }
                ].map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + idx * 0.06, ease: "easeOut" }}
                  >
                    <Link 
                      to={link.path} 
                      onClick={() => setIsMenuOpen(false)} 
                      className="group flex items-center justify-between py-6 border-b border-brand-green/5 overflow-hidden"
                    >
                      <span className="text-3xl font-serif text-brand-green/80 group-hover:text-brand-green transition-all duration-500 tracking-wide">
                        {link.name}
                      </span>
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        className="text-brand-gold"
                      >
                        <ArrowUpRight size={22} strokeWidth={1.5} />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Minimal Footer */}
              <div className="p-10 mt-auto">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col gap-4"
                >
                  <div className="w-12 h-[1px] bg-brand-gold/40" />
                  <p className="text-[11px] font-bold text-brand-green/40 uppercase tracking-[0.4em] leading-relaxed">
                    Experience the ritual <br /> of botanical purity.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
