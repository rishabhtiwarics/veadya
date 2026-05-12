import { ShoppingBag, Heart, Star, ArrowUpRight } from 'lucide-react';
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
    }
  };

  return (
    <div className="stagger-item h-full">
      <motion.div
        whileHover={{ y: -10 }}
        className="group relative h-full flex flex-col border border-brand-green/10 bg-white/50 p-4 rounded-[40px] transition-all duration-500 hover:border-brand-green/20 hover:bg-white"
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden  bg-brand-earth/30 rounded-[40px]  transition-all duration-500 group-hover:shadow-xl group-hover:shadow-brand-green/5">
          {/* Wishlist */}
          <button className="absolute top-6 right-6 p-2.5 bg-white rounded-full shadow-sm text-brand-green/30 hover:text-brand-gold transition-colors z-10">
            <Heart size={15} />
          </button>

          {product.badge && (
            <div className="absolute top-6 left-6 bg-brand-green text-white text-[8px] font-bold px-3 py-1 rounded-full uppercase tracking-widest z-10">
              {product.badge}
            </div>
          )}

          <div className="relative w-full h-full flex items-center justify-center">
            <motion.img
              src={product.image}
              alt={product.name}
              className="max-w-[90%] max-h-[90%] object-contain transition-transform duration-700"
            />
          </div>

          {/* Quick View Button */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 z-10">
            <button className="bg-white text-brand-green px-6 py-2.5 rounded-full text-[10px] font-bold tracking-wider shadow-xl flex items-center gap-2 whitespace-nowrap border border-brand-green/5">
              <ShoppingBag size={12} />
              Quick View
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="pt-4 sm:pt-6 pb-2 px-1 sm:px-2 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-serif text-lg sm:text-xl text-brand-green tracking-tight leading-tight flex-1">
              {product.name}
            </h3>
            <span className="text-[10px] font-bold text-brand-green/30 uppercase tracking-widest ml-4 pt-1.5">
              30ML
            </span>
          </div>

          {/* Rating */}
          <div className="flex gap-0.5 mb-4 sm:mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className="fill-brand-gold text-brand-gold" />
            ))}
          </div>

          {/* Price and Action */}
          <div className="mt-auto flex flex-col gap-4 sm:gap-6">
            <div className="flex items-center justify-between">
              <span className="hidden sm:block text-[10px] font-bold text-brand-green/40 uppercase tracking-widest">Premium Quality</span>
              <p className="font-sans font-bold text-brand-green text-base sm:text-lg">{product.price}</p>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isInCart}
              className="w-full bg-brand-green text-white py-3 sm:py-4 rounded-full text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 sm:gap-3 hover:bg-brand-text transition-all shadow-lg group/btn"
            >
              {isInCart ? 'IN BAG' : 'SHOP NOW'}
              <ArrowUpRight size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
