# 🎨 Fitpan Design System - Tailwind Configuration

## 📋 Overview

This document explains the premium Tailwind CSS configuration created for Fitpan's landing page. The design system ensures visual consistency, premium aesthetics, and accessibility across all components.

---

## 🎯 Color Palette

### Primary Colors
- **Primary (Deep Green)**: `#1F573F` — Health & natural ingredients
  - Used for: Headings, CTAs, main backgrounds
  - Variants: 50–900 (light to dark)

- **Accent (Warm Almond)**: `#C19A6B` — Warmth, grains & nutrition
  - Used for: Highlights, secondary CTAs, accents
  - Variants: 50–900

### Background Colors
- **Light**: `#FDFCFB` (Off-White/Cream) — Main background
- **Darker**: `#F9F8F6` — Subtle contrast
- **Muted**: `#EFE9E0` — Service areas & cards

---

## 🔤 Typography System

### Font Families
| Usage | Font | Weight | Use Case |
|-------|------|--------|----------|
| Headings | Montserrat | 400–700 | H1–H6, Bold text |
| Body | Plus Jakarta Sans | 400–700 | Paragraphs, UI text |

### Font Sizes
| Class | Size | Line Height | Weight |
|-------|------|------------|--------|
| h1 | 3rem | 1.2 | 700 |
| h2 | 2.25rem | 1.3 | 700 |
| h3 | 1.875rem | 1.3 | 700 |
| h4 | 1.5rem | 1.4 | 600 |
| body-lg | 1.125rem | 1.6 | 400 |
| body-md | 1rem | 1.6 | 400 |
| body-sm | 0.875rem | 1.6 | 400 |

---

## 📏 Spacing Scale

The spacing system uses a consistent scale from `xs` (0.25rem) to `8xl` (8rem):

```
xs: 0.25rem   (4px)
sm: 0.5rem    (8px)
md: 1rem      (16px)
lg: 1.5rem    (24px)
xl: 2rem      (32px)
2xl: 2.5rem   (40px)
3xl: 3rem     (48px)
4xl: 4rem     (64px)
5xl: 5rem     (80px)
6xl: 6rem     (96px)
7xl: 7rem     (112px)
8xl: 8rem     (128px)
```

**Usage**: Apply spacing utilities like `p-4`, `m-6`, `gap-8` for consistent layout.

---

## 🌟 Shadow System

Premium shadows that create depth without weight:

| Shadow | Use Case |
|--------|----------|
| xs | Subtle separation |
| sm | Minimal elevation |
| md | Card default |
| lg | Elevated content |
| card | Premium card styling |
| card-hover | Card on hover |
| glow | Accent highlights |

---

## 🎨 Component Utilities

### Buttons
```html
<!-- Primary Button -->
<button class="btn-primary">Beli Sekarang</button>

<!-- Outline Button -->
<button class="btn-primary-outline">Pelajari Lebih Lanjut</button>

<!-- Accent Button -->
<button class="btn-accent">Submit</button>
```

### Cards
```html
<!-- Standard Card -->
<div class="card">Content here</div>

<!-- Elevated Card (hover effect) -->
<div class="card-elevated">Premium content</div>

<!-- With lift effect -->
<div class="card card-hover-lift">Hover me!</div>
```

### Badges
```html
<span class="badge">New</span>
<span class="badge-accent">Premium</span>
```

### Typography Utilities
```html
<!-- Gradient text -->
<h1 class="text-gradient">Fitpan Magik</h1>

<!-- Divider -->
<div class="divider"></div>
```

---

## ✨ Animations

### Built-in Animations
- **fade-in**: Fade in effect
- **fade-in-up**: Fade in while moving up
- **slide-in-left**: Slide in from left

### Usage with Framer Motion
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

---

## 📱 Responsive Design

The design system is mobile-first:

| Breakpoint | Width |
|------------|-------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |

**Example:**
```html
<h1 class="text-2xl md:text-4xl lg:text-5xl">Responsive heading</h1>
```

---

## 🚀 Atomic Component Structure

```
components/
├── atoms/           # Basic building blocks
│   ├── Button
│   └── Badge
├── molecules/       # Combined atoms
│   ├── NavLink
│   └── TestimonialCard
├── organisms/       # Sections
│   ├── Navbar
│   ├── HeroSection
│   ├── BenefitBar
│   ├── WhyChooseFitpan
│   └── Footer
└── templates/       # Page layouts
    └── Layout
```

---

## 💡 Best Practices

1. **Color Usage**:
   - Primary for main CTAs and headings
   - Accent for highlights and secondary actions
   - Backgrounds for subtle surfaces

2. **Typography**:
   - Use heading utilities for hierarchical structure
   - Maintain body text at readable sizes (16px+)

3. **Spacing**:
   - Use consistent spacing units from the scale
   - Apply `section-container` for max-width sections

4. **Shadows**:
   - Use `card` class for default card styling
   - Apply `card-hover` for interactive elements

5. **Accessibility**:
   - Maintain color contrast (WCAG AA standard)
   - Use semantic HTML with proper ARIA labels

---

## 🔧 Customization

To extend the theme:

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      // Add custom colors
    },
    fontFamily: {
      // Add custom fonts
    },
    spacing: {
      // Add custom spacing
    },
  },
}
```

---

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Lucide React Icons](https://lucide.dev)

---

**Design System Version**: 1.0  
**Last Updated**: 2026  
**Maintained by**: Fitpan Team
