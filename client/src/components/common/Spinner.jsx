const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`inline-block ${sizes[size]} border-2 border-gold-200 border-t-gold-500 rounded-full animate-spin ${className}`}
    />
  );
};

export const PageSpinner = () => (
  <div className="flex items-center justify-center min-h-[40vh]">
    <Spinner size="lg" />
  </div>
);

export default Spinner;
