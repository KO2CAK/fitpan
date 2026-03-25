# 🥑 FITPAN: Premium Healthy Food Landing Page

**Project Goal:** Membangun *digital presence* yang kredibel, informatif, dan memiliki konversi tinggi untuk produk makanan sehat Fitpan.
**Role Model:** [hotto.co.id](https://hotto.co.id/) (Clean, Educational, Premium).
**Status:** Independent Project (Standalone).

---

## 🎨 1. Visual Identity (Design System)

Agar tidak terkena *copyright* Hotto, kita menggunakan palet warna "Earth & Health" yang unik untuk Fitpan.

- **Primary Color:** `#1F573F` (Deep Green) — Melambangkan kesehatan dan bahan alami.
- **Accent Color:** `#C19A6B` (Warm Almond) — Melambangkan gandum, serat, dan rasa gurih.
- **Background:** `#FDFCFB` (Off-White/Cream) — Memberikan kesan bersih tapi tetap hangat (tidak kaku seperti putih murni).
- **Typography:**
    - *Headings:* `Montserrat` (Bold) — Kesan modern dan kuat.
    - *Body:* `Plus Jakarta Sans` — Sangat bersih dan mudah dibaca di layar HP.

---

## 🏗️ 2. Tech Stack & Infrastructure

Sistem dibuat **Atomic** agar ringan dan mudah dikelola.

- **Frontend:** `React.js` (Vite) + `Tailwind CSS`.
- **Animations:** `Framer Motion` (Untuk efek *fade-in* dan *parallax* saat scroll).
- **Icons:** `Lucide-react`.
- **Backend/Database:** `Supabase` (Sebagai Headless CMS).
- **Deployment:** `Netlify` (Sudah kamu gunakan, tinggal hubungkan ke Repo baru).
- **Image Format:** `.webp` (Wajib, agar *loading* secepat kilat).

---

## 🗄️ 3. Database Schema (Supabase CMS)

Meskipun tidak ada login user, database ini berfungsi agar kamu bisa update konten tanpa koding.

## **Table: `web_products`**

*(Untuk menampilkan daftar varian produk & info gizi)*

- `id` (UUID)
- `name` (Contoh: Fitpan Original, Fitpan Choco)
- `slug` (URL friendly: `fitpan-original`)
- `price` (Decimal)
- `nutrition_json` (Data: `{ "calories": 150, "protein": "5g", "fiber": "12g" }`)
- `ingredients_text` (List bahan baku)
- `image_url` (Link foto produk di Supabase Storage)
- `is_featured` (Boolean: Jika TRUE, masuk ke bagian depan/Home)

## **Table: `web_testimonials`**

- `customer_name` (Text)
- `rating` (Integer 1-5)
- `review_text` (Text)
- `avatar_url` (Link foto pelanggan)

---

## 🧩 4. Atomic UI Components (Struktur Folder)

Kode harus rapi agar jika Hapid atau Andi bantu, mereka tidak pusing.

Plaintext

`fitpan-website/
 ├── src/
 │    ├── components/
 │    │    ├── atoms/       # Button, Badge, NutrientIcon
 │    │    ├── molecules/   # NavLink, TestimonialCard, NutritionRow
 │    │    ├── organisms/   # HeroSection, WhyFitpan, ProductFeed, Footer
 │    │    └── templates/   # Layout (Sticky Header + Content)
 │    ├── hooks/            # useFetchProducts.js (Logika tarik data Supabase)
 │    └── pages/            # Home.jsx (Landing Page Utama)`

---

## 🚀 5. Roadmap Eksekusi (Atomic Tasks)

## **Phase 1: Setup & Identity**

- [ ]  Buat Repository GitHub baru: `fitpan-official-web`.
- [ ]  Install Tailwind CSS & Konfigurasi tema warna Deep Green & Almond.
- [ ]  Buat **Navbar Sticky** dengan logo Fitpan di kiri dan tombol "Beli Sekarang" di kanan.

## **Phase 2: The "Hotto-Style" Hero**

- [x]  Implementasi **Hero Section**: Foto produk di mangkuk keramik + Slogan besar di kiri.
- [x]  Tambahkan **Benefit Bar** (3 Ikon di bawah Hero: Tinggi Serat, Rendah Gula, Energi Stabil).
- [x]  Pasang animasi **Framer Motion** (Text muncul perlahan saat page di-load).

## **Phase 3: Authority & Social Proof**

- [x]  Build **Section "Why Choose Fitpan?"**: Dua kartu (Satu untuk Bahan Segar, satu untuk Tabel Nutrisi).
- [x]  Integrasi **Supabase Testimonials**: Menampilkan review pelanggan secara otomatis (+ mock data).
- [x]  Implementasi **Dynamic Product Feed**: Menarik data produk terbaru dari tabel `web_products` (+ mock data).

## **Phase 4: Conversion & SEO**

- [ ]  Tambahkan **WhatsApp Floating Button** (Floating Action Button).
- [ ]  Setup **SEO Metadata**: Pasang Meta Title "Fitpan - Solusi Cemilan Sehat Balikpapan".
- [ ]  **Optimization:** Convert semua foto ke format WebP dan aktifkan Lazy Loading.

---

## 💡 6. Key Strategy: "The Fitpan Experience"

Agar berbeda dari kompetitor:

1. **Transparency:** Tampilkan foto asli bahan baku (Sweet Potato, Oats, etc.) di samping tabel nutrisi.
2. **Locality:** Sebutkan "Produk Kebanggaan Balikpapan" untuk membangun kedekatan dengan pembeli lokal.
3. **Human Touch:** Di bagian footer, tulis sedikit cerita singkat tentang "Kenapa Fitpan dibuat".