# 🍌 FitPan - Healthy Snack Landing Page

A modern, mobile-responsive landing page for FitPan - your go-to destination for healthy fruit and vegetable chips in Indonesia.

![FitPan Landing Page](https://via.placeholder.com/800x400?text=FitPan+Landing+Page)

## ✨ Features

### 🛒 Order Modal System

- **Product Catalog** - Browse through extensive product selection:
  - 🍎 Fruit Chips (9 varieties)
  - 🥕 Vegetable Chips (14 varieties)
  - 🎁 Mix Pre-Order (4 varieties)
- **Dynamic Pricing** - Real-time price calculation based on:
  - Product selection
  - Weight (100g / 200g)
  - Quantity
- **WhatsApp Integration** - One-click ordering via WhatsApp with pre-filled message

### 🎨 Design Highlights

- **Mobile-First Design** - Optimized for iPhone X and similar devices
- **Emerald Theme** - Fresh, healthy color palette
- **Smooth Animations** - Polished micro-interactions
- **Sticky Header** - Always accessible CTA button

### 📱 Sections

1. **Hero Section** - Compelling headline with product video
2. **Social Proof** - Customer testimonials
3. **Features** - Key benefits (100% natural, healthy daily snack, great taste)
4. **Final CTA** - Conversion-focused closing section

## 🛠️ Tech Stack

- **React 18** - UI Library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Mobile-first** - Responsive design

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/KO2CAK/fitpan.git
cd fitpan

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## 📁 Project Structure

```
fitpan/
├── public/
│   └── vite.svg
├── src/
│   ├── img/
│   │   ├── fitpan-video.mp4
│   │   ├── fitpan1.jpeg
│   │   └── logo-fitpan.jpeg
│   ├── pages/
│   │   └── SalesLandingPage.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## 🎯 Product Catalog

### 🍎 Fruit Chips

| Product        | 100g       | 200g       |
| -------------- | ---------- | ---------- |
| Apel           | Rp 27.000  | Rp 51.000  |
| Buah Naga      | Rp 56.000  | Rp 108.000 |
| Durian Montong | Rp 110.000 | Rp 217.000 |
| Buah Kelapa    | Rp 28.000  | Rp 52.000  |
| Nanas          | Rp 32.000  | Rp 60.000  |
| Nangka         | Rp 30.000  | Rp 56.000  |
| Pisang         | Rp 21.000  | Rp 38.000  |
| Pisang Kepok   | Rp 22.000  | Rp 41.000  |
| Salak          | Rp 25.000  | Rp 47.000  |

### 🥕 Vegetable Chips

| Product                | 100g      | 200g       |
| ---------------------- | --------- | ---------- |
| Bawang Merah Bulat     | Rp 54.000 | Rp 104.000 |
| Bawang Putih           | Rp 51.000 | Rp 98.000  |
| Beetroot               | Rp 50.000 | Rp 96.000  |
| Buncis                 | Rp 33.000 | Rp 62.000  |
| Edamame                | Rp 32.000 | Rp 59.000  |
| Jagung Manis           | Rp 23.000 | Rp 42.000  |
| Jagung Ungu            | Rp 22.000 | Rp 54.000  |
| Kentang Granola/Wedges | Rp 29.000 | Rp 55.000  |
| Labu Madu              | Rp 28.000 | Rp 52.000  |
| Okra                   | Rp 41.000 | Rp 77.000  |
| Singkong               | Rp 18.000 | Rp 33.000  |
| Tape Singkong          | Rp 19.000 | Rp 35.000  |
| Ubi Cilembu/Madu       | Rp 19.000 | Rp 35.000  |
| Wortel                 | Rp 30.000 | Rp 58.000  |

### 🎁 Mix Pre-Order

| Product       | 100g      | 200g      |
| ------------- | --------- | --------- |
| Mix Fruits    | Rp 27.000 | Rp 50.000 |
| Mix Sayur     | Rp 30.000 | Rp 55.000 |
| Mix Bertepung | Rp 29.000 | Rp 52.000 |
| Mix Total     | Rp 32.000 | Rp 55.000 |

## 📱 WhatsApp Ordering

When customers click "Kirim via WhatsApp", they get a pre-filled message:

```
Halo FitPan, saya mau pesan:
- Produk: Apel (FRUIT CHIPS)
- Berat: 100g
- Jumlah: 2 bungkus
- Total: Rp 54.000
- Alamat: [customer address]

Apakah ready stock?
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Lucide Icons](https://lucide.dev) - Beautiful icons
- [Tailwind CSS](https://tailwindcss.com) - Amazing CSS framework
- [Vite](https://vitejs.dev) - Next generation frontend tooling

---

<p align="center">Made with ❤️ for your healthy snack journey</p>
