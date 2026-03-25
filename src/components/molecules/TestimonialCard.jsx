import { Star } from 'lucide-react'

// TestimonialCard Component - Molecule
export default function TestimonialCard({ 
  customerName, 
  rating, 
  reviewText, 
  avatarUrl,
  className = '' 
}) {
  return (
    <div className={`card hover:shadow-card-hover transition-all duration-300 ${className}`}>
      {/* Rating Stars */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'fill-accent-500 text-accent-500' : 'text-gray-300'}
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-body-md text-gray-700 mb-4 italic">
        "{reviewText}"
      </p>

      {/* Customer Info */}
      <div className="flex items-center gap-3 border-t border-background-muted pt-4">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={customerName}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="font-heading font-bold text-primary-600">
              {customerName.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="font-heading font-semibold text-primary-600 text-body-sm">
            {customerName}
          </p>
          <p className="text-body-xs text-gray-500">Verified Customer</p>
        </div>
      </div>
    </div>
  )
}
