# 🥑 Fitpan - Premium Healthy Food Landing Page

A modern, accessible, and conversion-focused landing page for Fitpan, built with React, Vite, and Tailwind CSS.

---

## ✨ Features

✅ **Premium Design System** with custom branding colors (Deep Green & Warm Almond)  
✅ **Atomic Component Architecture** for easy scalability  
✅ **Smooth Animations** powered by Framer Motion  
✅ **Mobile-First Responsive Design**  
✅ **SEO Optimized** with meta tags and semantic HTML  
✅ **Dark/Light Theme Ready** (extensible)  
✅ **Standalone** - No backend dependencies initially  

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ ([Download](https://nodejs.org))
- npm or yarn

### Installation

1. **Clone or navigate to the project**
```bash
cd fitpan-official-web
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```
The site will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
fitpan-official-web/
├── src/
│   ├── components/
│   │   ├── atoms/           # Button, Badge
│   │   ├── molecules/       # NavLink, Cards
│   │   └── organisms/       # Navbar, Hero, Footer, etc.
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # React entry point
│   └── index.css           # Tailwind + global styles
├── index.html              # HTML entry
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS config
├── vite.config.js          # Vite configuration
├── package.json
└── DESIGN_SYSTEM.md        # Design documentation
```

---

## 🎨 Design System

The project includes a comprehensive **design system** with:

- **Color Palette**: Deep Green (#1F573F), Warm Almond (#C19A6B), Off-White (#FDFCFB)
- **Typography**: Montserrat (headings), Plus Jakarta Sans (body)
- **Spacing Scale**: Consistent xs–8xl spacing
- **Shadow System**: Subtle to premium shadows
- **Component Utilities**: Pre-built button, card, badge utilities

👉 See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete documentation.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite 4 |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion 10 |
| Icons | Lucide React |
| Backend CMS | Supabase (planned) |
| Deployment | Netlify (ready) |

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript checks |

---

## 🎯 Roadmap

### ✅ Phase 1: Setup & Identity (DONE)
- [x] Repository & Tailwind setup
- [x] Navbar with sticky positioning
- [x] Design system configuration

### ✅ Phase 2: Hero & Benefits (DONE)
- [x] Hero section with product visual
- [x] Benefit bar (3 features)
- [x] Framer Motion animations

### ✅ Phase 3: Authority & Social Proof (DONE)
- [x] Why Choose Fitpan section with cards
- [x] Supabase testimonials integration (+ mock data)
- [x] Dynamic product feed (+ mock data)
- [x] Floating WhatsApp button

### 📋 Phase 4: Conversion & SEO (PLANNED)
- [ ] SEO metadata & Open Graph tags
- [ ] WebP image optimization
- [ ] Analytics integration
- [ ] Email newsletter signup

---

## 🔗 Integration with Supabase (Future)

Once database is ready, connect via:
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
```

👉 **Follow the [Supabase Setup Guide](./SUPABASE_SETUP.md) to:**
1. Create Supabase tables
2. Add environment variables
3. Upload product images
4. Manage testimonials

Currently using mock data for development. Switch to live Supabase data when ready!

---

## 📚 Documentation

- [Design System](./DESIGN_SYSTEM.md) — Complete branding & component guide
- [Tailwind Docs](https://tailwindcss.com) — Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) — Animation library
- [Lucide Icons](https://lucide.dev) — Icon collection

---

## 🤝 Contributing

For team collaboration:

1. Create feature branches: `feature/feature-name`
2. Follow atomic component structure
3. Keep components pure and reusable
4. Test on mobile before pushing

---

## 📝 License

© 2026 Fitpan Indonesia. All rights reserved.

---

## 👋 Questions?

Reach out to the Fitpan team or check the [Design System documentation](./DESIGN_SYSTEM.md).

**Happy coding! 🚀**
