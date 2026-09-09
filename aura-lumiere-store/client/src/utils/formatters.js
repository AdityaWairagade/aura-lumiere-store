/**
 * Format a number as currency
 * @param {number} amount
 * @param {string} currency
 */
export const formatPrice = (amount, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);

/**
 * Format a date string to human-readable
 * @param {string|Date} dateStr
 */
export const formatDate = (dateStr) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr));

/**
 * Truncate text to given length
 */
export const truncate = (text, length = 80) =>
  text?.length > length ? `${text.substring(0, length)}...` : text;

/**
 * Calculate discounted price
 */
export const discountedPrice = (price, percent) =>
  +(price * (1 - percent / 100)).toFixed(2);
