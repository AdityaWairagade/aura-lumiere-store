import { Link } from 'react-router-dom';
import { FiInstagram, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="font-sans" style={{ backgroundColor: '#2A2A2A', color: '#FAF7F2' }}>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">

        {/* Tagline strip */}
        <div className="text-center mb-12">
          <p
            className="font-serif text-3xl font-light italic tracking-wide"
            style={{ color: '#FAF7F2' }}
          >
            Scents That Stay With You
          </p>
          <div className="w-16 h-px mx-auto mt-4" style={{ backgroundColor: '#C9A961' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b pb-12"
          style={{ borderColor: 'rgba(250,247,242,0.12)' }}>

          {/* Brand column */}
          <div className="md:col-span-1">
            {/* AL monogram */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 flex items-center justify-center font-serif text-lg font-semibold border"
                style={{ backgroundColor: 'rgba(250,247,242,0.08)', color: '#FAF7F2', borderColor: '#C9A961' }}
              >
                AL
              </div>
              <div>
                <p className="font-serif text-lg font-semibold tracking-wider" style={{ color: '#FAF7F2' }}>
                  AURA LUMIÈRE
                </p>
                <p className="text-[9px] tracking-[0.25em] uppercase" style={{ color: '#C9A961' }}>
                  Fine Fragrances
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(250,247,242,0.6)' }}>
              Handcrafted luxury perfumes born in the heart of Amravati.
              Every bottle is a story waiting to be worn.
            </p>
            <a
              href="https://instagram.com/aura_lumiere"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @aura_lumiere"
              className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-75"
              style={{ color: '#C9A961' }}
            >
              <FiInstagram size={16} />
              @aura_lumiere
            </a>
          </div>

          {/* Collections */}
          <div>
            <h4
              className="text-[10px] tracking-widest uppercase mb-5"
              style={{ color: '#C9A961' }}
            >
              Collections
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Pour Homme',  to: '/shop/for-him' },
                { label: 'Pour Femme',  to: '/shop/for-her' },
                { label: 'Unisex',      to: '/shop/unisex' },
                { label: 'Gifting',     to: '/shop/gift-sets' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="transition-opacity hover:opacity-75"
                    style={{ color: 'rgba(250,247,242,0.72)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4
              className="text-[10px] tracking-widest uppercase mb-5"
              style={{ color: '#C9A961' }}
            >
              Help
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Track My Order',    to: '/orders' },
                { label: 'Shipping & Returns', to: '#' },
                { label: 'FAQ',               to: '#' },
                { label: 'Contact Us',        to: '#' },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="transition-opacity hover:opacity-75"
                    style={{ color: 'rgba(250,247,242,0.72)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-[10px] tracking-widest uppercase mb-5"
              style={{ color: '#C9A961' }}
            >
              Find Us
            </h4>
            <ul className="space-y-4 text-sm" style={{ color: 'rgba(250,247,242,0.72)' }}>
              <li className="flex items-start gap-2">
                <FiMapPin size={14} className="mt-0.5 shrink-0" style={{ color: '#D4AF37' }} />
                <span className="leading-relaxed">
                  Shop No. 208, Daga Plazzo,<br />
                  Biyani Square Camp,<br />
                  Amravati, Maharashtra 444602
                </span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone size={14} style={{ color: '#D4AF37' }} />
                <a href="tel:+917620896719" className="transition-opacity hover:opacity-75">
                  +91 76208 96719
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiMail size={14} style={{ color: '#D4AF37' }} />
                <a href="mailto:hello@auralumiere.com" className="transition-opacity hover:opacity-75">
                  hello@auralumiere.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs tracking-wide"
          style={{ color: 'rgba(250,247,242,0.3)' }}>
          <p>© {new Date().getFullYear()} AURA LUMIÈRE. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-opacity hover:opacity-75">Privacy Policy</a>
            <a href="#" className="transition-opacity hover:opacity-75">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
