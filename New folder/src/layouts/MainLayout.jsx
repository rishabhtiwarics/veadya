import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { setCartOpen } from '../store/slices/cartSlice';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import CartItem from '../components/cart/CartItem';
import { useEffect } from 'react';

export default function MainLayout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isCartOpen, items } = useSelector((state) => state.cart);
  const subtotal = items.reduce((acc, item) => {
    const priceNum = parseInt(item.price.replace('₹', ''));
    return acc + priceNum * item.quantity;
  }, 0);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-green selection:text-white relative">
      <Header />
      
      <main>
        <Outlet />
      </main>

      <Footer />

      {/* Global Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dispatch(setCartOpen(false))}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] cursor-crosshair"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full max-w-md h-full bg-white z-[110] p-12 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="font-serif text-brand-green tracking-widest text-xl font-bold uppercase">Cart</span>
                <button onClick={() => dispatch(setCartOpen(false))} className="text-brand-green hover:text-brand-gold transition-colors">
                  <ArrowRight className="" size={24} />
                </button>
              </div>
              
              <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-20 h-20 bg-brand-earth/20 flex items-center justify-center mb-4">
                      <ShoppingBag size={32} className="text-brand-green/30" />
                    </div>
                    <h4 className="font-serif text-2xl text-brand-green uppercase tracking-wide">Your bag is empty</h4>
                    <p className="text-brand-green/50 text-[11px] font-bold tracking-[0.2em] uppercase">Add botanical essentials to start</p>
                    <button 
                      onClick={() => dispatch(setCartOpen(false))}
                      className="mt-8 bg-brand-green text-white px-8 py-4 text-[10px] font-bold tracking-[0.3em] uppercase transition-all shadow-xl hover:bg-brand-gold hover:text-brand-green rounded-none"
                    >
                      Shop Now
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-auto pt-10 border-t border-brand-green/10">
                 <div className="flex justify-between items-center mb-8">
                   <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-green/50">Subtotal</span>
                   <span className="font-sans font-bold text-brand-text text-xl">₹{subtotal}</span>
                 </div>
                 {items.length > 0 ? (
                   <button 
                    onClick={() => {
                        dispatch(setCartOpen(false));
                        // Navigate to checkout
                    }}
                    className="w-full bg-brand-green text-white py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-brand-gold hover:text-brand-green transition-all shadow-xl rounded-none"
                   >
                      Proceed to Checkout
                   </button>
                 ) : (
                   <button className="w-full bg-brand-green/10 text-brand-green/40 py-5 text-[10px] font-bold tracking-[0.3em] uppercase cursor-not-allowed rounded-none">
                      Checkout Unavailable
                   </button>
                 )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
