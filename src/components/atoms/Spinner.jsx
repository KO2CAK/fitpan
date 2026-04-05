export default function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-2',
    lg: 'w-12 h-12 border-4',
  }
  return (
    <div
      className={`${sizes[size]} border-primary-200 border-t-primary-600 rounded-full animate-spin ${className}`}
    />
  )
}
