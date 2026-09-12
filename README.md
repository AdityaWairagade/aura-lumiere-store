# AURA LUMIÈRE

> **More Than a Fragrance, It's a Feeling**

AURA LUMIÈRE is a luxury Indian perfume brand based in Amravati, Maharashtra. This repository contains the full-stack e-commerce platform built with the MERN stack.

---

## Brand

| | |
|---|---|
| **Brand** | AURA LUMIÈRE |
| **Tagline** | More Than a Fragrance, It's a Feeling |
| **Location** | Shop No. 208, Daga Plazzo, Biyani Square Camp, Amravati, MH 444602 |
| **Phone** | +91 76208 96719 |
| **Email** | hello@auralumiere.com |
| **Instagram** | @aura_lumiere |

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT |
| Payments | Stripe |
| Image Uploads | Cloudinary |

---

## Brand Palette

| Token | Hex | Use |
|---|---|---|
| `burgundy` | `#7B1E3A` | Accents, scrollbar, headings |
| `cream` | `#F5F0E8` | Page background |
| `gold` | `#D4AF37` | CTAs, dividers, highlights |
| `charcoal` | `#1A1A1A` | Body text, primary buttons |
| `softPink` | `#F4C2C2` | Pour Femme accents |
| `sageGreen` | `#B8C4B0` | Unisex accents |
| `warmAmber` | `#E8C87A` | Pour Homme accents |
| `dustyRose` | `#D4A5A5` | Gifting accents |
| `skyBlue` | `#A8C8E0` | Fresh / aquatic |

**Fonts:** Cormorant Garamond (serif) · Inter (sans) · Great Vibes (script)

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- MongoDB running locally or Atlas URI

### Setup

```bash
# 1. Install all dependencies
npm run install:all

# 2. Copy and fill environment variables
cp .env.example .env

# 3. Seed the database with sample products
npm run seed

# 4. Start dev servers (backend + frontend concurrently)
npm run dev
```

The API runs on `http://localhost:5000` and the client on `http://localhost:5173`.

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start both servers concurrently |
| `npm run server` | Backend only (nodemon) |
| `npm run client` | Frontend only (Vite) |
| `npm run seed` | Seed sample products & admin user |
| `npm run seed:destroy` | Wipe database |
| `npm run build` | Production build of the client |

### Default Admin Account (after seeding)

- **Email:** admin@auralumiere.com
- **Password:** Admin@123456

---

## Project Structure

```
aura-lumiere-store/
├── client/               # React + Vite frontend
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── context/      # AuthContext, CartContext
│       ├── pages/        # Route-level pages
│       └── utils/        # api.js, formatters.js, constants.js
└── server/               # Express backend
    ├── config/           # MongoDB connection
    ├── controllers/      # Route handlers
    ├── middleware/       # Auth, error, upload
    ├── models/           # Mongoose schemas
    ├── routes/           # Express routers
    └── data/             # Seeder & sample data
```

---

## Product Categories

- **Pour Homme** — Masculine fragrances
- **Pour Femme** — Feminine fragrances
- **Unisex** — Gender-neutral scents
- **Gifting** — Curated gift sets

---

*© 2026 AURA LUMIÈRE. All rights reserved.*
