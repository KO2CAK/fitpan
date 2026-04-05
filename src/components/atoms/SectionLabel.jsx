/**
 * Small uppercase eyebrow label used above section headings.
 * Pass a color utility via `className` (e.g. "text-primary-500", "text-accent-300").
 */
export default function SectionLabel({ children, className = '' }) {
  return (
    <p className={`text-xs font-heading font-bold tracking-widest uppercase ${className}`}>
      {children}
    </p>
  )
}
