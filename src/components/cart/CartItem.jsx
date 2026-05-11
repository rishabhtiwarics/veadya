import { Plus, Minus, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/slices/cartSlice';

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="flex gap-6 py-6 border-b border-brand-green/10">
      <div className="w-24 h-32 bg-brand-earth/20 flex-shrink-0 overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-grow flex flex-col justify-between py-1">
        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <h4 className="font-serif text-lg text-brand-green uppercase tracking-wide">{item.name}</h4>
            <button onClick={handleRemove} className="text-brand-green/30 hover:text-red-500 transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
          <p className="text-[10px] font-bold text-brand-green/40 uppercase tracking-widest">{item.description}</p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center border border-brand-green/10">
            <button 
              onClick={handleDecrement}
              className="p-2 hover:bg-brand-green/5 text-brand-green/60 transition-colors"
            >
              <Minus size={12} />
            </button>
            <span className="w-10 text-center text-xs font-bold text-brand-green">{item.quantity}</span>
            <button 
              onClick={handleIncrement}
              className="p-2 hover:bg-brand-green/5 text-brand-green/60 transition-colors"
            >
              <Plus size={12} />
            </button>
          </div>
          <span className="font-sans font-bold text-brand-green">{item.price}</span>
        </div>
      </div>
    </div>
  );
}
