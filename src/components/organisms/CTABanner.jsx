import { Link } from 'react-router-dom'
import Button from '../atoms/Button'

export default function CTABanner() {
  return (
    <section className="py-16 bg-primary-500">
      <div className="max-w-3xl mx-auto px-4 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Mulai Perjalanan Sehat Anda Hari Ini
        </h2>
        <p className="text-primary-100 mb-8 text-body-lg">
          Bergabunglah dengan ribuan pelanggan yang sudah merasakan manfaat Fitpan.
        </p>
        <Link to="/distributor">
          <Button variant="accent" size="lg">Beli di Distributor Resmi</Button>
        </Link>
      </div>
    </section>
  )
}
