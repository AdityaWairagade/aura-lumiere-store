import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="pt-32 min-h-screen flex flex-col items-center justify-center text-center px-6">
    <p className="text-[10px] tracking-widest uppercase text-gold-500 font-sans mb-4">404</p>
    <h1 className="font-serif text-5xl font-light text-noir mb-4">Page Not Found</h1>
    <p className="text-gray-400 font-sans text-sm mb-10 max-w-sm">
      The page you're looking for has drifted away like a fading scent. Let us guide you back.
    </p>
    <Link to="/" className="btn-primary">Return Home</Link>
  </div>
);

export default NotFoundPage;
