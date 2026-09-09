import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-noir text-champagne/80 font-sans">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white/10 pb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl font-light tracking-luxury text-champagne mb-1">
              Aura Lumière
            </h3>
            <p className="text-[10px] tracking-widest uppercase text-gold-400 mb-4">
              Maison de Parfum
            </p>
            <p className="text-sm leading-relaxed text-champagne/60">
              Crafting rare and exquisite fragrances for those who understand
              that luxury is not a price tag — it is an experience.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="hover:text-gold-400 transition-colors"><FiInstagram size={18} /></a>
              <a href="#" aria-label="Facebook" className="hover:text-gold-400 transition-colors"><FiFacebook size={18} /></a>
              <a href="#" aria-label="Twitter" className="hover:text-gold-400 transition-colors"><FiTwitter size={18} /></a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-[10px] tracking-widest uppercase text-gold-400 mb-5">Collections</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'For Her', to: '/shop/for-her' },
                { label: 'For Him', to: '/shop/for-him' },
                { label: 'Unisex', to: '/shop/unisex' },
                { label: 'Limited Edition', to: '/shop/limited-edition' },
                { label: 'Gift Sets', to: '/shop/gift-sets' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-gold-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-[10px] tracking-widest uppercase text-gold-400 mb-5">Help</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Contact Us', to: '#' },
                { label: 'Shipping & Returns', to: '#' },
                { label: 'Track My Order', to: '/orders' },
                { label: 'FAQ', to: '#' },
                { label: 'Fragrance Guide', to: '#' },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-gold-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[10px] tracking-widest uppercase text-gold-400 mb-5">
              The Inner Circle
            </h4>
            <p className="text-sm text-champagne/60 mb-4 leading-relaxed">
              Be the first to discover new collections, exclusive offers, and
              fragrance stories.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email for newsletter"
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 text-sm text-champagne placeholder-champagne/30
                           focus:outline-none focus:border-gold-500 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gold-500 text-noir text-xs font-medium tracking-widest hover:bg-gold-400 transition-colors"
              >
                JOIN
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs text-champagne/30 tracking-wide">
          <p>© {new Date().getFullYear()} Aura Lumière. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
