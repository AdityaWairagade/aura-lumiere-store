import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import api from '../utils/api';
import ProductCard from '../components/product/ProductCard';
import { PageSpinner } from '../components/common/Spinner';

const HeroSlide = ({ image, title, subtitle, link }) => (
  <div className="relative h-[85vh] min-h-[500px] overflow-hidden">
    <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-noir/40" />
    <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-[11px] tracking-widest uppercase text-gold-300 font-sans mb-4"
      >
        New Collection
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="font-serif text-5xl md:text-7xl font-light text-white mb-6 leading-tight"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-champagne/80 font-sans text-sm md:text-base max-w-md mb-8 leading-relaxed"
      >
        {subtitle}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
      >
        <Link to={link} className="btn-gold">
          Explore Collection
        </Link>
      </motion.div>
    </div>
  </div>
);

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=1600',
    title: 'The Art of Scent',
    subtitle: 'Discover our new season fragrances, each a testament to the craft of fine perfumery.',
    link: '/shop',
  },
  {
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=1600',
    title: 'Noir Absolu',
    subtitle: 'A dark, smoky masterpiece for those who leave an impression without trying.',
    link: '/product/noir-absolu',
  },
  {
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=1600',
    title: 'Limited Edition',
    subtitle: 'Rare and exclusive fragrances. Each bottle is a collector\'s piece.',
    link: '/shop/limited-edition',
  },
];

const categories = [
  { label: 'For Her', to: '/shop/for-her', image: 'https://images.unsplash.com/photo-1595274459742-4a41776a7ed6?w=600' },
  { label: 'For Him', to: '/shop/for-him', image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600' },
  { label: 'Unisex', to: '/shop/unisex', image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600' },
  { label: 'Limited Edition', to: '/shop/limited-edition', image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600' },
];

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get('/products/featured');
        setFeatured(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div>
      {/* Hero Slider */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full"
      >
        {heroSlides.map((slide, i) => (
          <SwiperSlide key={i}>
            <HeroSlide {...slide} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Brand Strip */}
      <div className="bg-noir py-5">
        <p className="text-center text-[11px] tracking-[0.4em] uppercase text-gold-400 font-sans">
          Crafted with Intention &nbsp;·&nbsp; Worn with Purpose &nbsp;·&nbsp; Remembered Forever
        </p>
      </div>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <p className="section-subtitle">Shop By</p>
        <h2 className="section-title">Collections</h2>
        <div className="gold-divider" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {categories.map((cat) => (
            <Link
              key={cat.to}
              to={cat.to}
              className="group relative overflow-hidden aspect-[3/4] block"
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-noir/30 group-hover:bg-noir/50 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-end justify-center pb-6">
                <span className="font-serif text-xl text-white tracking-luxury">
                  {cat.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <p className="section-subtitle">Curated For You</p>
        <h2 className="section-title">Featured Fragrances</h2>
        <div className="gold-divider mb-12" />
        {loading ? (
          <PageSpinner />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {featured.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
        <div className="text-center mt-12">
          <Link to="/shop" className="btn-outline">
            View All Fragrances
          </Link>
        </div>
      </section>

      {/* Brand Story Banner */}
      <section className="relative py-28 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1600"
          alt="Our story"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-noir/65" />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-widest uppercase text-gold-400 font-sans mb-4">
            Our Philosophy
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-6 leading-snug">
            Fragrance is the invisible part of personality.
          </h2>
          <p className="text-champagne/70 font-sans text-sm leading-relaxed mb-8">
            At Aura Lumière, every bottle holds a story. We source the rarest ingredients
            from around the world and collaborate with master perfumers to create scents
            that transcend time.
          </p>
          <Link to="/shop" className="btn-gold">
            Discover Our Story
          </Link>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-cream py-14 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { title: 'Authentic', desc: 'Every fragrance is genuine and certified' },
            { title: 'Free Shipping', desc: 'On all orders above $150' },
            { title: 'Easy Returns', desc: '30-day hassle-free return policy' },
            { title: 'Secure Payment', desc: 'SSL-encrypted checkout powered by Stripe' },
          ].map((item) => (
            <div key={item.title}>
              <div className="gold-divider mb-3 mx-auto w-8" />
              <h4 className="font-serif text-lg text-noir mb-1">{item.title}</h4>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
