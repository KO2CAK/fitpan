import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
const staticCategories = []

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null

const COUNTER_LS_KEY = 'fitpan_beli_count'
const COUNTER_START = 209

// ─── Beli Sekarang Counter ────────────────────────────────────────────────────
export function useBeliCounter() {
  const [count, setCount] = useState(null) // null while loading

  useEffect(() => {
    if (!supabase) {
      const stored = localStorage.getItem(COUNTER_LS_KEY)
      setCount(stored ? parseInt(stored, 10) : COUNTER_START)
      return
    }

    supabase
      .from('web_counters')
      .select('count')
      .eq('id', 'beli_sekarang')
      .single()
      .then(({ data }) => {
        setCount(data ? data.count : COUNTER_START)
      })
  }, [])

  const increment = async () => {
    const optimistic = (count ?? COUNTER_START) + 1
    setCount(optimistic)

    if (!supabase) {
      localStorage.setItem(COUNTER_LS_KEY, optimistic)
      return
    }

    const { data } = await supabase.rpc('increment_beli_counter')
    if (data) setCount(data)
  }

  return { count: count ?? COUNTER_START, loading: count === null, increment }
}

// ─── Testimonials (from unified `testimonials` table) ─────────────────────────
export function useFetchTestimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('is_featured', { ascending: false })
          .order('created_at', { ascending: false })

        if (error) throw error
        setTestimonials(data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  return { testimonials, loading, error }
}

// ─── Web Products — grouped by category (from unified `products` table) ───────
function deriveCategoryId(catName) {
  // "Fitpan Buah" → "buah", "Fitpan Sayur" → "sayur", "Fitpan Mix" → "mix"
  const last = catName.trim().split(/\s+/).pop().toLowerCase()
  return last
}

export function useWebProductCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    const fetchProducts = async () => {
      try {
        // Fetch products and categories separately (more reliable than FK join)
        const [{ data: products, error: prodError }, { data: categoryRows }] = await Promise.all([
          supabase
            .from('products')
            .select('id, name, price, slug, image_url, web_description, category_id, stock')
            .eq('is_web_visible', true)
            .order('name'),
          supabase
            .from('categories')
            .select('id, name'),
        ])

        if (prodError) throw prodError
        if (!products || products.length === 0) {
          setLoading(false)
          return
        }

        // Build a category id → name lookup
        const catById = {}
        for (const c of (categoryRows || [])) {
          catById[c.id] = c.name
        }

        // Group products by category name
        const categoryMap = {}
        for (const product of products) {
          const catName = product.category_id
            ? (catById[product.category_id] || 'Lainnya')
            : 'Lainnya'
          if (!categoryMap[catName]) categoryMap[catName] = []
          categoryMap[catName].push(product)
        }

        // Build category objects using static styling as template
        const liveCategories = Object.entries(categoryMap).map(([catName, prods]) => {
          const catId = deriveCategoryId(catName)
          const staticCat = staticCategories.find((c) => c.id === catId || c.name.toLowerCase() === catName.toLowerCase())

          const variants = prods.map((p) => {
            // Try to preserve emoji from static data by matching on name
            const staticVariant = staticCat?.variants.find(
              (sv) => sv.name.toLowerCase() === p.name.toLowerCase() || sv.id === (p.slug || '')
            )
            return {
              id: p.slug || p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
              dbId: p.id,
              name: p.name,
              emoji: staticVariant?.emoji || staticCat?.emoji || '',
              price: p.price,
              desc: p.web_description || undefined,
              image_url: p.image_url || undefined,
              stock: p.stock ?? 0,
            }
          })

          return {
            id: staticCat?.id || catId,
            name: catName,
            subtitle: staticCat?.subtitle || 'Produk Fitpan',
            tagline: staticCat?.tagline || '',
            description: staticCat?.description || '',
            emoji: staticCat?.emoji || '',
            bgClass: staticCat?.bgClass || 'from-gray-50 to-slate-50',
            accentColor: staticCat?.accentColor || '#16A34A',
            textColor: staticCat?.textColor || 'text-green-700',
            borderColor: staticCat?.borderColor || 'border-gray-200',
            badgeBg: staticCat?.badgeBg || 'bg-gray-100',
            variants,
          }
        })

        // Sort to match static order
        const order = staticCategories.map((c) => c.id)
        liveCategories.sort((a, b) => {
          const ai = order.indexOf(a.id)
          const bi = order.indexOf(b.id)
          return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
        })

        setCategories(liveCategories)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { categories, loading, error }
}

// Legacy alias kept for any code that imports useFetchProducts
export function useFetchProducts() {
  const { categories, loading, error } = useWebProductCategories()
  return { products: categories.flatMap((c) => c.variants), loading, error }
}

// ─── Blogs (from unified `blogs` table) ───────────────────────────────────────
function mapBlogToPost(blog) {
  // Derive a short preview from the first non-empty paragraph
  const firstParagraph = blog.content
    ? blog.content.split('\n').find((l) => l.trim().length > 40)?.trim() || blog.content.substring(0, 150)
    : ''
  const preview = firstParagraph.length > 150
    ? firstParagraph.substring(0, 150) + '...'
    : firstParagraph

  return {
    id: blog.slug || blog.id,
    title: blog.title,
    category: blog.author || 'Blog Fitpan',
    problem: blog.published_at
      ? new Date(blog.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      : 'Blog',
    avatar: '📖',
    avatarImg: blog.image_url || null,
    avatarBg: 'bg-primary-50',
    preview,
    content: blog.content || '',
    tags: [],
    relatedProduct: null,
  }
}

export function useBlogs() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('id, title, slug, content, image_url, author, published_at')
          .eq('status', 'published')
          .order('published_at', { ascending: false })

        if (error) throw error
        setPosts(data ? data.map(mapBlogToPost) : [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  return { posts, loading, error }
}

export function useBlogPost(slug) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    if (!supabase) {
      setLoading(false)
      return
    }

    const fetchPost = async () => {
      try {
        const { data } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .single()

        setPost(data ? mapBlogToPost(data) : null)
      } catch {
        setPost(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  return { post, loading }
}

// ─── Web Analytics — page view tracking ──────────────────────────────────────
/**
 * Tracks a page view once per page mount by calling the increment_page_view RPC.
 * @param {string} pageId - The page identifier key (e.g. 'page_products')
 */
export function useTrackPageView(pageId) {
  useEffect(() => {
    if (!supabase || !pageId) return
    supabase.rpc('increment_page_view', { p_page_id: pageId }).then(() => {})
  }, [pageId])
}

// ─── Web Checkout — create pending transaction (WEB-5) ────────────────────────
export async function tryCreateWebOrder({ customerName, cartItems, total }) {
  const ownerId = import.meta.env.VITE_OWNER_ID
  if (!supabase || !ownerId) return null

  try {
    const txNumber =
      'WEB-' +
      new Date().toISOString().slice(0, 10).replace(/-/g, '') +
      '-' +
      Math.random().toString(36).substring(2, 8).toUpperCase()

    const { data: tx, error: txError } = await supabase
      .from('transactions')
      .insert([{
        user_id: ownerId,
        transaction_number: txNumber,
        source: 'web',
        status: 'pending',
        payment_method: 'online',
        total_amount: total,
        guest_name: customerName,
      }])
      .select('id, transaction_number')
      .single()

    if (txError || !tx) return null

    const items = cartItems.map((item) => ({
      transaction_id: tx.id,
      product_id: item.dbId || null,
      product_name: item.name,
      quantity: item.qty,
      unit_price: item.price || 0,
      price: item.price || 0,
      subtotal: (item.price || 0) * item.qty,
    }))

    await supabase.from('transaction_items').insert(items)

    return tx.transaction_number
  } catch {
    return null
  }
}
