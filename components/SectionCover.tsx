'use client'

interface SectionCoverProps {
  children: React.ReactNode
  id?: string
  className?: string
}

export default function SectionCover({
  children,
  id,
  className = '',
}: SectionCoverProps) {
  return (
    <div 
      id={id} 
      className={`relative scroll-snap-align-start w-full ${className}`}
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}
    >
      {children}
    </div>
  )
}

