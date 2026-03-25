-- ============================================================
-- FITPAN SUPABASE DATABASE SCHEMA
-- Copy and paste these SQL statements in Supabase SQL Editor
-- ============================================================

-- ============================================================
-- Table: web_products
-- ============================================================
CREATE TABLE IF NOT EXISTS web_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  price DECIMAL(10, 2) NOT NULL,
  nutrition_json JSONB NOT NULL DEFAULT '{}',
  ingredients_text TEXT,
  image_url VARCHAR(500),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Insert for web_products
INSERT INTO web_products (name, slug, price, nutrition_json, ingredients_text, is_featured) VALUES
('Fitpan Original', 'fitpan-original', 45000, '{"calories": "150", "protein": "5g", "fiber": "12g", "sugar": "3g"}', 'Sweet Potato, Oats, Brown Sugar, Salt', true),
('Fitpan Choco', 'fitpan-choco', 50000, '{"calories": "160", "protein": "6g", "fiber": "11g", "sugar": "2g"}', 'Sweet Potato, Oats, Cocoa, Almonds', true),
('Fitpan Berry Blast', 'fitpan-berry', 52000, '{"calories": "155", "protein": "5g", "fiber": "13g", "sugar": "2.5g"}', 'Sweet Potato, Oats, Strawberry, Blueberry', true);

-- ============================================================
-- Table: web_testimonials
-- ============================================================
CREATE TABLE IF NOT EXISTS web_testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(255) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Insert for web_testimonials
INSERT INTO web_testimonials (customer_name, rating, review_text) VALUES
('Siti Nurhaliza', 5, 'Fitpan benar-benar mengubah kebiasaan snacking saya. Rasanya enak dan saya bisa fokus lebih lama tanpa rasa ngantuk.'),
('Budi Santoso', 5, 'Sebagai atlet, saya butuh snack bergizi. Fitpan adalah pilihan terbaik—tinggi serat, rendah gula, energi stabil.'),
('Clara Wulandari', 4, 'Sudah 3 bulan konsumsi Fitpan. Berat badan stabil, kulit lebih cerah, dan kolesterol turun signifikan!'),
('Rudi Hermawan', 5, 'Harga mungkin premium, tapi worth it! Kualitas bahan benar-benar terasa berbeda dari snack lain.');

-- ============================================================
-- Enable Real-time (Optional)
-- ============================================================
ALTER TABLE web_products REPLICA IDENTITY FULL;
ALTER TABLE web_testimonials REPLICA IDENTITY FULL;

-- ============================================================
-- CREATE INDEXES
-- ============================================================
CREATE INDEX idx_products_featured ON web_products(is_featured);
CREATE INDEX idx_products_slug ON web_products(slug);
CREATE INDEX idx_testimonials_created ON web_testimonials(created_at DESC);

-- 1. Aktifkan RLS
ALTER TABLE web_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE web_testimonials ENABLE ROW LEVEL SECURITY;

-- 2. Buat Policy: Izinkan siapa saja (Anonymous) melihat data produk & testimoni
CREATE POLICY "Allow public read access" ON web_products FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON web_testimonials FOR SELECT USING (true);

-- 3. Fungsi & Trigger untuk otomatis update kolom updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_web_products_modtime BEFORE UPDATE ON web_products FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_web_testimonials_modtime BEFORE UPDATE ON web_testimonials FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- ============================================================
-- CREATE STORAGE BUCKET (for product images)
-- Use Supabase Dashboard to create 'fitpan-products' bucket
-- Then set policies for public read access
-- ============================================================

-- Instructions for Supabase Dashboard:
-- 1. Go to Storage > Buckets
-- 2. Create new bucket: "fitpan-products"
-- 3. Set to Public
-- 4. Add policy: SELECT (Public Read) for authenticated & anonymous users
-- 5. Add policy: INSERT for authenticated users (for admin uploads)
