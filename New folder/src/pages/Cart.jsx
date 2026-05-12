import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Cart() {
  const { items } = useSelector((state) => state.cart);
  const subtotal = items.reduce((acc, item) => {
    const priceNum = parseInt(item.price.replace('₹', ''));
    return acc + priceNum * item.quantity;
  }, 0);

  return (
    <div className="bg-brand-cream min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif text-brand-green uppercase tracking-widest">Your Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="bg-white p-20 text-center shadow-xl border border-brand-green/5">
            <div className="w-20 h-20 bg-brand-earth/20 flex items-center justify-center mx-auto mb-8">
              <ShoppingBag size={32} className="text-brand-green/30" />
            </div>
            <h2 className="text-2xl font-serif text-brand-green mb-4">Your bag is empty</h2>
            <p className="text-brand-green/50 text-[11px] font-bold tracking-[0.2em] uppercase mb-12">Time to fill it with botanical goodness</p>
            <Link to="/shop">
              <button className="bg-brand-green text-white px-12 py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-brand-gold transition-all shadow-xl">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white p-8 shadow-xl border border-brand-green/5 sticky top-32">
                <h3 className="font-serif text-xl text-brand-green uppercase tracking-wide mb-8">Summary</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[10px] font-bold tracking-[0.2em] uppercase text-brand-green/50">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold tracking-[0.2em] uppercase text-brand-green/50">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="pt-4 border-t border-brand-green/10 flex justify-between">
                    <span className="font-serif text-lg text-brand-green uppercase">Total</span>
                    <span className="font-sans font-bold text-xl text-brand-green">₹{subtotal}</span>
                  </div>
                </div>
                <Link to="/checkout">
                  <button className="w-full bg-brand-green text-white py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-brand-gold transition-all shadow-xl flex items-center justify-center gap-4">
                    Proceed to Checkout
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
