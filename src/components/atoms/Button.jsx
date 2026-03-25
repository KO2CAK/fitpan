// Button Component - Atom
export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) {
  const baseStyles = 'font-heading font-semibold rounded-lg transition-colors duration-200'
  
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg',
    accent: 'bg-accent-500 hover:bg-accent-600 text-white shadow-md hover:shadow-lg',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50',
    secondary: 'bg-background-darker hover:bg-background-muted text-gray-700',
    ghost: 'text-primary-600 hover:bg-primary-50',
  }

  const sizes = {
    sm: 'px-4 py-2 text-body-sm',
    md: 'px-6 py-3 text-body-md',
    lg: 'px-8 py-4 text-body-lg',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
