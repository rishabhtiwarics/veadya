import { ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, setCartOpen } from '../../store/slices/cartSlice';

export default function ProductCard({ product, index }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addToCart({ ...product, quantity: 1 }));
      dispatch(setCartOpen(true));
    }
  };

  return (
    <div className="stagger-item h-full">
      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 1.5
        }}
        whileHover={{ y: -18, scale: 1.03 }}
        className="group relative bg-brand-earth/20 border border-brand-green/20 p-4 shadow-sm hover:shadow-2xl hover:shadow-brand-green/10 transition-all duration-700 h-full"
      >
        <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-white border border-brand-gold/20">
          <div className="relative w-full h-full overflow-hidden bg-brand-earth">
          {/* Primary Image */}
          <motion.img 
            src={product.image} 
            alt={product.name} 
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-0" 
          />
          {/* Hover Image */}
          <motion.img 
            src={product.hoverImage} 
            alt={`${product.name} alternate view`} 
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-105" 
          />
          
          {product.badge && (
            <div className="absolute top-4 left-4 bg-brand-green text-white text-[8px] font-bold px-3 py-1 uppercase tracking-[0.2em] z-10">
              {product.badge}
            </div>
          )}
          <div className="absolute inset-0 bg-brand-green/0 group-hover:bg-brand-green/5 transition-colors duration-500" />
          
          {/* Hover Quick Add */}
          <div className="absolute bottom-4 inset-x-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
            <button 
              onClick={handleAddToCart}
              disabled={isInCart}
              className={`w-full ${isInCart ? 'bg-brand-green/50 cursor-not-allowed' : 'bg-brand-green hover:bg-brand-text'} text-white py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 rounded-none`}
            >
              <ShoppingBag size={14} />
              {isInCart ? 'In Bag' : 'Add to Bag'}
            </button>
          </div>
          </div>
        </div>

        <div className="text-center px-4 mb-4">
          <p className="text-[10px] tracking-[0.3em] text-brand-green/50 font-bold uppercase mb-2">{product.description}</p>
          <h3 className="font-serif text-2xl text-brand-green tracking-wide group-hover:tracking-widest transition-all duration-500">{product.name}</h3>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="w-8 h-[1px] bg-brand-green/10 group-hover:w-4 transition-all" />
            <p className="font-sans font-bold text-brand-text">{product.price}</p>
            <span className="w-8 h-[1px] bg-brand-green/10 group-hover:w-4 transition-all" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
