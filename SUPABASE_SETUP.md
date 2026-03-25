# 🗄️ Supabase Integration Guide

This guide explains how to connect Fitpan landing page to Supabase for dynamic content management.

---

## 📋 Prerequisites

1. **Supabase Account** — Sign up at [supabase.com](https://supabase.com)
2. **Project Created** — Create a new Supabase project
3. **Environment Variables** — Add Supabase credentials to `.env.local`

---

## 🚀 Setup Steps

### Step 1: Get Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click **Settings** → **API**
4. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Anon Public Key** → `VITE_SUPABASE_ANON_KEY`

### Step 2: Set Environment Variables

Create/update `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_WHATSAPP_PHONE=62813xxxxxxxx
```

### Step 3: Create Database Tables

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Open a new query
3. Copy entire contents from `supabase.sql`
4. Paste into the editor
5. Click **Run**

This will create:
- `web_products` table
- `web_testimonials` table
- Sample data
- Indexes for performance
- Real-time subscriptions

### Step 4: Create Storage Bucket (for images)

1. Go to **Storage** → **Buckets**
2. Click **Create a new bucket**
3. Name: `fitpan-products`
4. Make it **Public**
5. Click **Create bucket**

### Step 5: Set Storage Policies

For bucket `fitpan-products`:

1. Click **Policies**
2. **Add Policy** → SELECT (Public Read)
   - For: Authenticated and Anonymous users
3. **Add Policy** → INSERT
   - For: Authenticated users only (admin uploads)

---

## 📊 Database Schema

### `web_products` Table

| Column | Type | Purpose |
|--------|------|---------|
| `id` | UUID | Unique product ID |
| `name` | VARCHAR | Product name (e.g., "Fitpan Original") |
| `slug` | VARCHAR | URL-friendly name |
| `price` | DECIMAL | Product price (IDR) |
| `nutrition_json` | JSONB | Nutrition data: `{"calories": "150", "protein": "5g", "fiber": "12g"}` |
| `ingredients_text` | TEXT | Ingredient list |
| `image_url` | VARCHAR | Link to product image |
| `is_featured` | BOOLEAN | Show in landing page? |
| `created_at` | TIMESTAMP | When added |
| `updated_at` | TIMESTAMP | Last modification |

**Example nutrition_json:**
```json
{
  "calories": "150",
  "protein": "5g",
  "fiber": "12g",
  "sugar": "3g",
  "fat": "4g"
}
```

### `web_testimonials` Table

| Column | Type | Purpose |
|--------|------|---------|
| `id` | UUID | Unique testimonial ID |
| `customer_name` | VARCHAR | Customer's name |
| `rating` | INTEGER | 1-5 star rating |
| `review_text` | TEXT | Review content |
| `avatar_url` | VARCHAR | Link to customer avatar |
| `created_at` | TIMESTAMP | When submitted |
| `updated_at` | TIMESTAMP | Last modification |

---

## 🔗 Using Data in React

### Fetch Products (Featured Only)

```jsx
import { useFetchProducts } from './hooks/useSupabase'

function MyComponent() {
  const { products, loading, error } = useFetchProducts()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: Rp {product.price}</p>
        </div>
      ))}
    </div>
  )
}
```

### Fetch Testimonials

```jsx
import { useFetchTestimonials } from './hooks/useSupabase'

function TestimonialsComponent() {
  const { testimonials, loading, error } = useFetchTestimonials()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {testimonials.map(testimonial => (
        <div key={testimonial.id}>
          <h4>{testimonial.customer_name}</h4>
          <p>★★★★★ {testimonial.rating}/5</p>
          <p>{testimonial.review_text}</p>
        </div>
      ))}
    </div>
  )
}
```

---

## 📁 Upload Product Images

### Via Supabase Dashboard

1. Go to **Storage** → `fitpan-products` bucket
2. Click **Upload**
3. Select product image
4. Copy the public URL (shown after upload)
5. Paste URL into `image_url` column in `web_products` table

### Via Code (Future Enhancement)

```javascript
const uploadImage = async (file, productName) => {
  const filename = `${productName}-${Date.now()}.webp`
  const { data, error } = await supabase.storage
    .from('fitpan-products')
    .upload(filename, file)

  if (error) throw error
  
  return supabase.storage
    .from('fitpan-products')
    .getPublicUrl(filename).data.publicUrl
}
```

---

## 🔐 Security Policies

### Current Settings (Development)

- **Read Access**: Public (anyone can see products & testimonials)
- **Write Access**: Disabled for landing page (only admin via dashboard)

### Production Best Practices

1. **Keep Anon Key public** (for frontend)
2. **Never expose Service Role Key** (backend only)
3. **Use RLS (Row Level Security)** for sensitive data
4. **Add API rate limiting** before going live

---

## 🐛 Troubleshooting

### Q: "Supabase not configured" message appears

**A:** Check:
- `.env.local` has `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Restart dev server: `npm run dev`

### Q: Products/testimonials not showing

**A:** Verify:
- Tables created in Supabase SQL Editor
- Sample data inserted
- Network tab shows requests to `supabase.co`

### Q: Images not loading

**A:** Check:
- Storage bucket `fitpan-products` is **Public**
- Image URLs are complete (start with `https://`)
- Storage policies allow public read

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [RLS (Row Level Security)](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)

---

## ✅ Quick Checklist

- [ ] Supabase account created
- [ ] Project set up
- [ ] Credentials in `.env.local`
- [ ] Tables created via `supabase.sql`
- [ ] Storage bucket created
- [ ] Sample data visible in Supabase
- [ ] Dev server shows products & testimonials
- [ ] Images uploading successfully

---

**Status**: Ready for development  
**Version**: 1.0  
**Last Updated**: 2026
