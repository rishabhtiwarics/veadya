import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Mail, Lock, User, ArrowRight, Sprout } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: (values) => {
      console.log('Register values:', values);
    },
  });

  return (
    <div className="w-full max-w-md mx-auto bg-white/40 backdrop-blur-3xl border border-brand-green/10 p-10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sprout size={100} className="text-brand-green" />
      </div>
      
      <div className="text-center mb-10 relative z-10">
        <h2 className="text-3xl font-serif text-brand-green mb-2 tracking-wide uppercase">Join the Circle</h2>
        <p className="text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase">Begin your journey into botanical wellness</p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-5 relative z-10">
        <div className="space-y-2">
          <label className="text-[10px] font-bold tracking-[0.2em] text-brand-green/60 uppercase ml-1">Your Name</label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-green/40 group-focus-within:text-brand-green transition-colors" size={16} />
            <input
              type="text"
              {...formik.getFieldProps('name')}
              className="w-full bg-white border border-brand-green/10 px-12 py-4 text-sm focus:outline-none focus:border-brand-green/40 transition-all placeholder:text-brand-green/20"
              placeholder="Full Name"
            />
          </div>
          {formik.touched.name && formik.errors.name ? (
            <div className="text-[9px] text-red-500 font-bold uppercase tracking-widest ml-1">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold tracking-[0.2em] text-brand-green/60 uppercase ml-1">Email Address</label>
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
          <label className="text-[10px] font-bold tracking-[0.2em] text-brand-green/60 uppercase ml-1">Create Password</label>
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

        <div className="space-y-2">
          <label className="text-[10px] font-bold tracking-[0.2em] text-brand-green/60 uppercase ml-1">Confirm Password</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-green/40 group-focus-within:text-brand-green transition-colors" size={16} />
            <input
              type="password"
              {...formik.getFieldProps('confirmPassword')}
              className="w-full bg-white border border-brand-green/10 px-12 py-4 text-sm focus:outline-none focus:border-brand-green/40 transition-all placeholder:text-brand-green/20"
              placeholder="••••••••"
            />
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-[9px] text-red-500 font-bold uppercase tracking-widest ml-1">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-brand-green text-white py-5 mt-4 text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-brand-text transition-all shadow-xl flex items-center justify-center gap-4"
        >
          Create Account
          <ArrowRight size={16} />
        </motion.button>

        <div className="text-center pt-6">
          <p className="text-[10px] font-bold text-brand-green/40 uppercase tracking-[0.2em]">
            Already a member? {' '}
            <Link to="/login" className="text-brand-green hover:text-brand-gold transition-colors underline decoration-2 underline-offset-4">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
