export const sampleProducts = [
  {
    name: 'Noir Absolu',
    brand: 'Aura Lumière',
    description:
      'A dark and mysterious fragrance that opens with smoky black pepper and bergamot, deepens into a heart of midnight rose and oud, then settles into a rich base of sandalwood, vetiver, and musk. For the bold and unapologetic.',
    shortDescription: 'Dark. Smoky. Unforgettable.',
    category: 'for-him',
    concentration: 'Eau de Parfum',
    notes: {
      top: ['Black Pepper', 'Bergamot', 'Cardamom'],
      middle: ['Midnight Rose', 'Oud', 'Leather'],
      base: ['Sandalwood', 'Vetiver', 'Musk'],
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800', alt: 'Noir Absolu bottle' },
    ],
    variants: [
      { size: '50ml', price: 185, stock: 30 },
      { size: '100ml', price: 270, stock: 20 },
    ],
    price: 185,
    isFeatured: true,
    isBestseller: true,
    tags: ['dark', 'smoky', 'oud', 'masculine'],
  },
  {
    name: 'Lumière Rose',
    brand: 'Aura Lumière',
    description:
      'An ethereal floral fragrance that captures the first light of dawn. Opens with sparkling pink pepper and lychee, blossoms into a heart of Bulgarian rose and peony, then whispers of white musk and cashmere.',
    shortDescription: 'Radiant. Feminine. Timeless.',
    category: 'for-her',
    concentration: 'Eau de Parfum',
    notes: {
      top: ['Pink Pepper', 'Lychee', 'Bergamot'],
      middle: ['Bulgarian Rose', 'Peony', 'Jasmine'],
      base: ['White Musk', 'Cashmere', 'Sandalwood'],
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1595274459742-4a41776a7ed6?w=800', alt: 'Lumière Rose bottle' },
    ],
    variants: [
      { size: '30ml', price: 120, stock: 25 },
      { size: '50ml', price: 195, stock: 40 },
      { size: '100ml', price: 290, stock: 15 },
    ],
    price: 195,
    isFeatured: true,
    isNewArrival: true,
    tags: ['floral', 'rose', 'feminine', 'romantic'],
  },
  {
    name: 'Santal Doré',
    brand: 'Aura Lumière',
    description:
      'A warm, golden embrace of creamy sandalwood and precious woods. A masterpiece of minimalism that speaks volumes with saffron, amber, and smooth vanilla.',
    shortDescription: 'Warm. Creamy. Hypnotic.',
    category: 'unisex',
    concentration: 'Parfum',
    notes: {
      top: ['Saffron', 'Cardamom', 'Pink Pepper'],
      middle: ['Sandalwood', 'Cedarwood', 'Rose'],
      base: ['Amber', 'Vanilla', 'Tonka Bean'],
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800', alt: 'Santal Doré bottle' },
    ],
    variants: [
      { size: '50ml', price: 320, stock: 18 },
      { size: '100ml', price: 480, stock: 10 },
    ],
    price: 320,
    isFeatured: true,
    isBestseller: true,
    tags: ['sandalwood', 'warm', 'amber', 'unisex', 'woody'],
  },
  {
    name: 'Aqua Céleste',
    brand: 'Aura Lumière',
    description:
      'A voyage across crystalline waters. Fresh marine accords intertwined with crisp citrus and a heart of white flowers, anchored by clean woods and soft musk.',
    shortDescription: 'Fresh. Airy. Serene.',
    category: 'unisex',
    concentration: 'Eau de Toilette',
    notes: {
      top: ['Sea Salt', 'Lemon', 'Bergamot'],
      middle: ['White Jasmine', 'Cyclamen', 'Green Tea'],
      base: ['Driftwood', 'Ambergris', 'White Musk'],
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800', alt: 'Aqua Céleste bottle' },
    ],
    variants: [
      { size: '50ml', price: 140, stock: 35 },
      { size: '100ml', price: 210, stock: 25 },
    ],
    price: 140,
    isNewArrival: true,
    tags: ['fresh', 'aquatic', 'marine', 'summer'],
  },
  {
    name: 'Velours Noir',
    brand: 'Aura Lumière',
    description:
      'The scent of luxury after dark. A gourmand oriental with rich dark chocolate, black cherry, and a whisper of tobacco, wrapped in the softest cashmere and vanilla.',
    shortDescription: 'Seductive. Indulgent. Velvety.',
    category: 'for-her',
    concentration: 'Eau de Parfum',
    notes: {
      top: ['Dark Cherry', 'Plum', 'Black Currant'],
      middle: ['Dark Chocolate', 'Tobacco Flower', 'Rose'],
      base: ['Cashmere', 'Vanilla', 'Patchouli'],
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=800', alt: 'Velours Noir bottle' },
    ],
    variants: [
      { size: '50ml', price: 210, stock: 20 },
      { size: '100ml', price: 310, stock: 12 },
    ],
    price: 210,
    isBestseller: true,
    tags: ['gourmand', 'oriental', 'dark', 'sweet', 'seductive'],
  },
  {
    name: 'Le Jardin Secret',
    brand: 'Aura Lumière',
    description:
      'Step into a secret garden at golden hour. This limited edition captures the essence of rare white florals — gardenia, tuberose and lily of the valley — over a mossy, earthy base.',
    shortDescription: 'Rare. Floral. Enchanting.',
    category: 'limited-edition',
    concentration: 'Parfum',
    notes: {
      top: ['Bergamot', 'Green Leaf', 'Dewdrops'],
      middle: ['Gardenia', 'Tuberose', 'Lily of the Valley'],
      base: ['Oakmoss', 'Vetiver', 'Cedarwood'],
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800', alt: 'Le Jardin Secret bottle' },
    ],
    variants: [
      { size: '50ml', price: 450, stock: 8 },
    ],
    price: 450,
    isFeatured: true,
    tags: ['limited', 'floral', 'gardenia', 'tuberose', 'rare'],
  },
];
