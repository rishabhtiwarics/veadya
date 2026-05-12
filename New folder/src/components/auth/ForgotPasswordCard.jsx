import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordCard() {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: (values) => {
      console.log('Reset values:', values);
    },
  });

  return (
    <div className="w-full max-w-md mx-auto bg-white/40 backdrop-blur-3xl border border-brand-green/10 p-10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <ShieldCheck size={100} className="text-brand-green" />
      </div>
      
      <div className="text-center mb-10 relative z-10">
        <h2 className="text-3xl font-serif text-brand-green mb-2 tracking-wide uppercase">Recover Access</h2>
        <p className="text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase">We will send a recovery link to your sanctuary email</p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6 relative z-10">
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

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-brand-green text-white py-5 text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-brand-text transition-all shadow-xl flex items-center justify-center gap-4"
        >
          Send Reset Link
          <ArrowRight size={16} />
        </motion.button>

        <div className="text-center pt-6">
          <Link to="/login" className="text-[10px] font-bold text-brand-green/40 hover:text-brand-green transition-colors uppercase tracking-[0.2em]">
            Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
