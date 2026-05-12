import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const { items } = useSelector((state) => state.cart);
  const subtotal = items.reduce((acc, item) => {
    const priceNum = parseInt(item.price.replace('₹', ''));
    return acc + priceNum * item.quantity;
  }, 0);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      zipCode: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      address: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      zipCode: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      console.log('Checkout values:', values);
      alert('Order placed successfully (Demo)');
    },
  });

  return (
    <div className="bg-brand-cream min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
            <Link to="/cart" className="text-brand-green/40 hover:text-brand-green transition-colors">
                <ArrowLeft size={20} />
            </Link>
            <h1 className="text-3xl font-serif text-brand-green uppercase tracking-widest">Checkout Sanctuary</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Shipping Form */}
          <div className="space-y-12">
            <section>
              <h2 className="text-[11px] font-bold tracking-[0.3em] text-brand-gold uppercase mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-brand-gold/40" />
                Shipping Details
              </h2>
              <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold tracking-[0.2em] text-brand-green/60 uppercase ml-1">First Name</label>
                  <input
                    type="text"
                    {...formik.getFieldProps('firstName')}
                    className="w-full bg-white border border-brand-green/10 px-6 py-4 text-sm focus:outline-none focus:border-brand-green/40 transition-all"
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className="text-[8px] text-red-500 uppercase font-bold">{formik.errors.firstName}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold tracking-[0.2em] text-brand-green/60 uppercase ml-1">Last Name</label>
                  <input
                    type="text"
                    {...formik.getFieldProps('lastName')}
                    className="w-full bg-white border border-brand-green/10 px-6 py-4 text-sm focus:outline-none focus:border-brand-green/40 transition-all"
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <div className="text-[8px] text-red-500 uppercase font-bold">{formik.errors.lastName}</div>
                  )}
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[9px] font-bold tracking-[0.2em] text-brand-green/60 uppercase ml-1">Email Address</label>
                  <input
                    type="email"
                    {...formik.getFieldProps('email')}
                    className="w-full bg-white border border-brand-green/10 px-6 py-4 text-sm focus:outline-none focus:border-brand-green/40 transition-all"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-[8px] text-red-500 uppercase font-bold">{formik.errors.email}</div>
                  )}
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[9px] font-bold tracking-[0.2em] text-brand-green/60 uppercase ml-1">Shipping Sanctuary (Address)</label>
                  <input
                    type="text"
                    {...formik.getFieldProps('address')}
                    className="w-full bg-white border border-brand-green/10 px-6 py-4 text-sm focus:outline-none focus:border-brand-green/40 transition-all"
                  />
                  {formik.touched.address && formik.errors.address && (
                    <div className="text-[8px] text-red-500 uppercase font-bold">{formik.errors.address}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold tracking-[0.2em] text-brand-green/60 uppercase ml-1">City</label>
                  <input
                    type="text"
                    {...formik.getFieldProps('city')}
                    className="w-full bg-white border border-brand-green/10 px-6 py-4 text-sm focus:outline-none focus:border-brand-green/40 transition-all"
                  />
                  {formik.touched.city && formik.errors.city && (
                    <div className="text-[8px] text-red-500 uppercase font-bold">{formik.errors.city}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold tracking-[0.2em] text-brand-green/60 uppercase ml-1">Zip Code</label>
                  <input
                    type="text"
                    {...formik.getFieldProps('zipCode')}
                    className="w-full bg-white border border-brand-green/10 px-6 py-4 text-sm focus:outline-none focus:border-brand-green/40 transition-all"
                  />
                  {formik.touched.zipCode && formik.errors.zipCode && (
                    <div className="text-[8px] text-red-500 uppercase font-bold">{formik.errors.zipCode}</div>
                  )}
                </div>
              </form>
            </section>

            <section>
                <h2 className="text-[11px] font-bold tracking-[0.3em] text-brand-gold uppercase mb-8 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-brand-gold/40" />
                    Payment Method
                </h2>
                <div className="p-6 bg-white border border-brand-green/20 flex items-center gap-4">
                    <CheckCircle2 size={20} className="text-brand-green" />
                    <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Cash on Delivery</span>
                </div>
            </section>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:pl-16">
            <div className="bg-white p-10 shadow-2xl border border-brand-green/5">
                <h3 className="font-serif text-2xl text-brand-green uppercase tracking-wide mb-10">Order Summary</h3>
                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 mb-10 custom-scrollbar">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                            <div className="w-16 h-20 bg-brand-earth/20 flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow">
                                <h4 className="text-xs font-bold text-brand-green uppercase tracking-wider">{item.name}</h4>
                                <p className="text-[9px] text-brand-green/40 uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                            </div>
                            <span className="text-sm font-bold text-brand-green">{item.price}</span>
                        </div>
                    ))}
                </div>
                
                <div className="space-y-4 pt-8 border-t border-brand-green/10">
                    <div className="flex justify-between text-[10px] font-bold tracking-[0.2em] uppercase text-brand-green/50">
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold tracking-[0.2em] uppercase text-brand-green/50">
                        <span>Shipping</span>
                        <span className="text-brand-sage">Free Sanctuary Delivery</span>
                    </div>
                    <div className="pt-6 flex justify-between">
                        <span className="font-serif text-2xl text-brand-green uppercase">Total</span>
                        <span className="font-sans font-bold text-2xl text-brand-green">₹{subtotal}</span>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => formik.handleSubmit()}
                    className="w-full bg-brand-green text-white py-6 mt-12 text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-brand-gold hover:text-brand-green transition-all shadow-xl"
                >
                    Confirm Ritual (Place Order)
                </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
