import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

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

export function useFetchTestimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!supabase) {
      setError('Supabase não configurado')
      setLoading(false)
      return
    }

    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('web_testimonials')
          .select('*')
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

export function useFetchProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!supabase) {
      setError('Supabase não configurado')
      setLoading(false)
      return
    }

    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('web_products')
          .select('*')
          .eq('is_featured', true)
          .order('name', { ascending: true })

        if (error) throw error
        setProducts(data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}
