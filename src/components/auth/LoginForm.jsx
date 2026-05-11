import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
    }),
    onSubmit: (values) => {
      console.log('Login values:', values);
      // Handle login logic here
    },
  });

  return (
    <div className="w-full max-w-md mx-auto bg-white/40 backdrop-blur-3xl border border-brand-green/10 p-10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles size={100} className="text-brand-green" />
      </div>
      
      <div className="text-center mb-10 relative z-10">
        <h2 className="text-3xl font-serif text-brand-green mb-2 tracking-wide uppercase">Welcome Back</h2>
        <p className="text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase">Enter your credentials to enter the sanctuary</p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6 relative z-10">
        <div className="space-y-2">
          <label className="text-[10px] font-bold tracking-[0.2em] text-brand-green/60 uppercase ml-1">Email Sanctuary</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-green/40 group-focus-within:text-brand-green transition-colors" size={16} />
            <input
              type="email"
              {...formik.getFieldProps('email')}
              className="w-full bg-white border border-brand-green/10 px-12 py-4 text-sm focus:outline-none focus:border-brand-green/40 transition-all placeholder:text-brand-green/20"
              placeholder="hello@veadya.care"
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="text-[9px] text-red-500 font-bold uppercase tracking-widest ml-1">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold tracking-[0.2em] text-brand-green/60 uppercase ml-1">Secret Key</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-green/40 group-focus-within:text-brand-green transition-colors" size={16} />
            <input
              type="password"
              {...formik.getFieldProps('password')}
              className="w-full bg-white border border-brand-green/10 px-12 py-4 text-sm focus:outline-none focus:border-brand-green/40 transition-all placeholder:text-brand-green/20"
              placeholder="••••••••"
            />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-[9px] text-red-500 font-bold uppercase tracking-widest ml-1">{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="flex items-center justify-between py-2">
          <Link to="/forgot-password" size={10} className="text-[10px] font-bold text-brand-green/40 hover:text-brand-green transition-colors uppercase tracking-widest">
            Lost your key?
          </Link>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-brand-green text-white py-5 text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-brand-text transition-all shadow-xl flex items-center justify-center gap-4"
        >
          Enter Sanctuary
          <ArrowRight size={16} />
        </motion.button>

        <div className="text-center pt-6">
          <p className="text-[10px] font-bold text-brand-green/40 uppercase tracking-[0.2em]">
            New to the circle? {' '}
            <Link to="/register" className="text-brand-green hover:text-brand-gold transition-colors underline decoration-2 underline-offset-4">
              Join Us
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
