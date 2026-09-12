import { useEffect, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import { formatPrice } from '../utils/formatters';
import { Bottle3DFallback } from '../components/Perfume3D';

// Lazy-load the heavy Three.js bundle — won't block first paint
const Perfume3D = lazy(() =>
  import('../components/Perfume3D').then((m) => ({ default: m.default }))
);

/* ─── Signature scents ──────────────────────────────────────────────────────── */
const SIGNATURE_SCENTS = [
  {
    name: 'Dapper Whimsy',
    category: 'Pour Homme',
    to: '/shop/for-him',
    tagline: 'Bold. Warm. Unforgettable.',
    accent: '#E8C87A',
    textAccent: '#1A1A1A',
    notes: 'Bergamot · Oud · Sandalwood',
  },
  {
    name: 'Enchanted',
    category: 'Unisex',
    to: '/shop/unisex',
    tagline: 'Mystical. Ethereal. Timeless.',
    accent: '#FAF7F2',
    textAccent: '#7B1E3A',
    notes: 'Rose · Jasmine · White Musk',
  },
  {
    name: 'Sundown Chic',
    category: 'Pour Femme',
    to: '/shop/for-her',
    tagline: 'Warm evenings in a bottle.',
    accent: '#D4A5A5',
    textAccent: '#1A1A1A',
    notes: 'Peach · Amber · Vanilla',
  },
  {
    name: 'Cosmos Charm',
    category: 'Pour Homme',
    to: '/shop/for-him',
    tagline: 'Crisp. Electric. Magnetic.',
    accent: '#A8C8E0',
    textAccent: '#1A1A1A',
    notes: 'Aqua · Cedar · Vetiver',
  },
  {
    name: 'Marine Serene',
    category: 'Unisex',
    to: '/shop/unisex',
    tagline: 'Ocean air, bottled.',
    accent: '#B8C4B0',
    textAccent: '#1A1A1A',
    notes: 'Sea Salt · Green Tea · Driftwood',
  },
  {
    name: 'Petal Noir',
    category: 'Pour Femme',
    to: '/shop/for-her',
    tagline: 'Flowers after dark.',
    accent: '#F4C2C2',
    textAccent: '#7B1E3A',
    notes: 'Black Rose · Tuberose · Patchouli',
  },
];

/* ─── Trust badges ──────────────────────────────────────────────────────────── */
const TRUST = [
  { title: 'Handcrafted',    desc: 'Every bottle made with care in Amravati' },
  { title: 'Free Shipping',  desc: 'On all orders above ₹999' },
  { title: 'Easy Returns',   desc: '7-day hassle-free return policy' },
  { title: 'Secure Payment', desc: 'SSL-encrypted checkout' },
];

/* ─── Product showcase card ─────────────────────────────────────────────────── */
const ScentCard = ({ name, category, to, tagline, accent, textAccent, notes }) => (
  <Link to={to} className="group block">
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden border"
      style={{ borderColor: 'rgba(201,169,97,0.25)' }}
    >
      {/* Colour plate */}
      <div
        className="relative h-48 flex flex-col items-center justify-center"
        style={{ backgroundColor: accent }}
      >
        {/* AL watermark */}
        <span
          className="absolute font-serif text-7xl font-bold opacity-10 select-none"
          style={{ color: textAccent }}
          aria-hidden="true"
        >
          AL
        </span>
        {/* Mini bottle silhouette */}
        <div className="relative z-10 flex flex-col items-center gap-0.5">
          <div className="w-4 h-3 rounded-t-full" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }} />
          <div className="w-3 h-4"               style={{ backgroundColor: 'rgba(0,0,0,0.2)' }} />
          <div className="w-12 h-16 rounded-b-lg" style={{ backgroundColor: 'rgba(0,0,0,0.18)', border: '1px solid rgba(0,0,0,0.1)' }} />
        </div>
        {/* Category pill */}
        <span
          className="absolute top-3 left-3 text-[9px] uppercase font-sans px-2 py-0.5"
          style={{ backgroundColor: '#7B1E3A', color: '#FAF7F2', letterSpacing: '0.15em' }}
        >
          {category}
        </span>
      </div>

      {/* Text */}
      <div className="p-4" style={{ backgroundColor: '#FFFFFF' }}>
        <h3 className="font-serif text-lg font-light leading-tight" style={{ color: '#2A2A2A' }}>
          {name}
        </h3>
        <p className="font-sans text-xs mt-1" style={{ color: '#8A8177' }}>{tagline}</p>
        <p className="font-sans text-[10px] mt-2" style={{ color: '#C9A961' }}>{notes}</p>
        <p
          className="font-sans text-[10px] uppercase mt-3 transition-opacity group-hover:opacity-60"
          style={{ color: '#7B1E3A', letterSpacing: '0.15em' }}
        >
          Shop Now →
        </p>
      </div>
    </motion.div>
  </Link>
);

/* ─── Page ──────────────────────────────────────────────────────────────────── */
const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    api.get('/products/featured')
      .then(({ data }) => setFeatured(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ backgroundColor: '#FAF7F2' }}>

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section
        className="min-h-screen flex items-center pt-20 pb-16 px-6"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, #F0E9DD 0%, #FAF7F2 65%)',
        }}
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <p
              className="font-sans text-[11px] uppercase mb-4"
              style={{ color: '#C9A961', letterSpacing: '0.35em' }}
            >
              Handcrafted in Amravati
            </p>

            <h1
              className="font-serif text-5xl md:text-6xl font-light leading-tight mb-6"
              style={{ color: '#2A2A2A' }}
            >
              More Than a<br />
              <em>Fragrance,</em><br />
              It's a Feeling
            </h1>

            <p
              className="font-sans text-base leading-relaxed mb-4 max-w-md"
              style={{ color: '#2A2A2A', opacity: 0.65 }}
            >
              Handcrafted luxury perfumes starting at{' '}
              <strong style={{ color: '#7B1E3A' }}>₹99</strong>. Discover scents
              that become your second skin.
            </p>

            <div className="flex items-center gap-2 mb-8">
              <span className="text-sm" style={{ color: '#C9A961' }}>★★★★★</span>
              <span className="font-sans text-xs" style={{ color: '#8A8177' }}>
                Loved by 500+ customers
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-3 font-sans text-sm font-medium uppercase transition-opacity hover:opacity-85"
                style={{ backgroundColor: '#7B1E3A', color: '#FAF7F2', letterSpacing: '0.15em' }}
              >
                Explore Collection
              </Link>
              <Link
                to="/shop/gift-sets"
                className="inline-flex items-center gap-2 px-8 py-3 font-sans text-sm font-medium uppercase border transition-colors hover:opacity-75"
                style={{ borderColor: '#7B1E3A', color: '#7B1E3A', backgroundColor: 'transparent', letterSpacing: '0.15em' }}
              >
                Gifting
              </Link>
            </div>
          </motion.div>

          {/* Right — 3D bottle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="order-1 lg:order-2 w-full"
            style={{ height: '400px' }}
            // On large screens, taller canvas
          >
            <div className="w-full h-full lg:h-[600px]">
              <Suspense fallback={<Bottle3DFallback />}>
                <Perfume3D />
              </Suspense>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Brand strip ───────────────────────────────────────────────────────── */}
      <div className="py-4" style={{ backgroundColor: '#F0E9DD' }}>
        <p
          className="text-center font-sans uppercase"
          style={{ color: '#8A8177', fontSize: '11px', letterSpacing: '0.35em' }}
        >
          Handcrafted &nbsp;·&nbsp; Long-Lasting &nbsp;·&nbsp; Made in India &nbsp;·&nbsp; Starting ₹99
        </p>
      </div>

      {/* ── Signature Scents ──────────────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p
              className="font-sans text-[11px] uppercase mb-2"
              style={{ color: '#C9A961', letterSpacing: '0.15em' }}
            >
              The Collection
            </p>
            <h2 className="font-serif text-4xl font-light" style={{ color: '#2A2A2A' }}>
              Our Signature Scents
            </h2>
            <div className="w-16 h-px mx-auto mt-4" style={{ backgroundColor: '#C9A961' }} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {SIGNATURE_SCENTS.map((scent) => (
              <ScentCard key={scent.name} {...scent} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 font-sans text-sm font-medium uppercase border transition-colors"
              style={{ borderColor: '#7B1E3A', color: '#7B1E3A', letterSpacing: '0.15em' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#7B1E3A';
                e.currentTarget.style.color = '#FAF7F2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#7B1E3A';
              }}
            >
              View All Fragrances
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured from DB (only when seeded) ───────────────────────────────── */}
      {!loading && featured.length > 0 && (
        <section className="py-16" style={{ backgroundColor: '#F0E9DD' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <p
                className="font-sans text-[11px] uppercase mb-2"
                style={{ color: '#C9A961', letterSpacing: '0.15em' }}
              >
                Curated For You
              </p>
              <h2 className="font-serif text-4xl font-light" style={{ color: '#2A2A2A' }}>
                Featured Fragrances
              </h2>
              <div className="w-16 h-px mx-auto mt-4" style={{ backgroundColor: '#C9A961' }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {featured.slice(0, 4).map((product) => {
                const price = product.variants?.length
                  ? Math.min(...product.variants.map((v) => v.price))
                  : product.price;
                return (
                  <Link
                    key={product._id}
                    to={`/product/${product.slug}`}
                    className="group block"
                  >
                    <div
                      className="aspect-[3/4] flex items-center justify-center mb-3 relative overflow-hidden"
                      style={{ backgroundColor: '#E8C87A' }}
                    >
                      {product.images?.[0]?.url ? (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <span
                          className="font-serif text-5xl font-bold opacity-20 select-none"
                          style={{ color: '#1A1A1A' }}
                        >
                          AL
                        </span>
                      )}
                    </div>
                    <p
                      className="font-sans text-[10px] uppercase mb-0.5"
                      style={{ color: '#C9A961', letterSpacing: '0.15em' }}
                    >
                      {product.brand}
                    </p>
                    <h3 className="font-serif text-lg font-light" style={{ color: '#2A2A2A' }}>
                      {product.name}
                    </h3>
                    {price && (
                      <p className="font-sans text-sm font-medium mt-1" style={{ color: '#7B1E3A' }}>
                        {formatPrice(price)}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Brand story ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center" style={{ backgroundColor: '#2A2A2A' }}>
        <div className="max-w-2xl mx-auto">
          <p
            className="font-sans text-[11px] uppercase mb-4"
            style={{ color: '#C9A961', letterSpacing: '0.15em' }}
          >
            Our Philosophy
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl font-light leading-snug mb-6"
            style={{ color: '#FAF7F2' }}
          >
            Fragrance is the invisible<br />part of your personality.
          </h2>
          <p
            className="font-sans text-sm leading-relaxed mb-8 max-w-lg mx-auto"
            style={{ color: 'rgba(250,247,242,0.6)' }}
          >
            Born in Amravati, crafted with passion. At AURA LUMIÈRE, every
            perfume is a story — of places, emotions, and the people who wear
            them. We believe luxury should be accessible, so we start at ₹99.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 font-sans text-sm font-medium uppercase transition-opacity hover:opacity-85"
            style={{ backgroundColor: '#C9A961', color: '#2A2A2A', letterSpacing: '0.15em' }}
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* ── Trust badges ──────────────────────────────────────────────────────── */}
      <section
        className="py-14 border-t"
        style={{ backgroundColor: '#FAF7F2', borderColor: '#e8e0d4' }}
      >
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {TRUST.map((item) => (
            <div key={item.title}>
              <div className="w-8 h-px mx-auto mb-3" style={{ backgroundColor: '#C9A961' }} />
              <h4 className="font-serif text-lg mb-1" style={{ color: '#2A2A2A' }}>
                {item.title}
              </h4>
              <p className="font-sans text-xs leading-relaxed" style={{ color: '#8A8177' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default HomePage;
