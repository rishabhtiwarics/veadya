import { Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <footer className="bg-brand-green py-16 px-6 text-brand-cream overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Branding */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="bg-white p-3 rounded-none border border-white/10">
                  <img src="/logo/bgremovepng.png" className="h-20 w-auto object-contain" alt="Veadya Logo" />
                </div>
              </div>
              <p className="text-brand-cream/40 text-sm leading-relaxed font-medium">
                Pioneering the intersection of ancient Ayurvedic wisdom and modern clinical purity. Hand-blended for your sanctuary.
              </p>
              <div className="flex gap-6 text-brand-gold/60">
                <Instagram size={18} className="hover:text-brand-gold cursor-pointer transition-colors" />
                <Facebook size={18} className="hover:text-brand-gold cursor-pointer transition-colors" />
                <Twitter size={18} className="hover:text-brand-gold cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Links Group 1 */}
            <div className="hidden md:block space-y-8">
              <h4 className="text-[10px] tracking-[0.3em] font-bold uppercase text-brand-gold/80">Collections</h4>
              <ul className="space-y-4 text-sm font-sans font-medium text-brand-cream/50">
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Ayurvedic Capsules</li>
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Aloe Vera Juices</li>
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Botanical Extracts</li>
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Wellness Gift Sets</li>
              </ul>
            </div>

            {/* Links Group 2 */}
            <div className="hidden md:block space-y-8">
              <h4 className="text-[10px] tracking-[0.3em] font-bold uppercase text-brand-gold/80">Sanctuary</h4>
              <ul className="space-y-4 text-sm font-sans font-medium text-brand-cream/50">
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Our Heritage</li>
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Sourcing Ethics</li>
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Journal</li>
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Contact Sanctuary</li>
              </ul>
            </div>

            {/* Links Group 3 */}
            <div className="hidden md:block space-y-8">
              <h4 className="text-[10px] tracking-[0.3em] font-bold uppercase text-brand-gold/80">Support</h4>
              <ul className="space-y-4 text-sm font-sans font-medium text-brand-cream/50">
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Shipping & Returns</li>
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Terms of Wellness</li>
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Wholesale</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <div className="bg-brand-green py-4 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] tracking-widest font-bold text-brand-cream/30 uppercase">
            © 2024 VEADYA CARE. CRAFTED WITH SOUL.
          </p>
          <div className="flex gap-8 text-[10px] tracking-widest font-bold text-brand-cream/30 uppercase">
            <span>MADE IN INDIA</span>
            <span>GLOBAL SHIPPING</span>
          </div>
        </div>
      </div>
    </>
  );
}
