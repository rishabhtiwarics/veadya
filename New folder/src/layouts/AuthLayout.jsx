import { Outlet, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Leaf } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-brand-cream relative overflow-hidden flex items-center justify-center py-20 px-6">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none z-0">
        <div className="grid grid-cols-4 gap-20 -rotate-12 translate-y-20">
          {[...Array(12)].map((_, i) => (
            <Leaf key={i} size={200} className="text-brand-green" />
          ))}
        </div>
      </div>

      <div className="absolute -top-20 -left-20 w-96 h-96 bg-brand-sage/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        {/* Branding Logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <Link to="/" className="block bg-white p-4 shadow-xl border border-brand-green/5">
            <img src="/logo.png" className="h-16 w-auto object-contain" alt="Veadya Logo" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full"
        >
          <Outlet />
        </motion.div>

        {/* Back Link */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
        >
            <Link to="/" className="text-[10px] font-bold tracking-[0.4em] text-brand-green/40 hover:text-brand-green transition-all uppercase flex items-center gap-4 group">
                <div className="w-10 h-[1px] bg-brand-green/10 group-hover:w-16 group-hover:bg-brand-green transition-all" />
                Return to Shop
            </Link>
        </motion.div>
      </div>
    </div>
  );
}
