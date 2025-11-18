'use client'

import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'

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
  const sectionRef = useRef<HTMLDivElement>(null)
  const coverRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const hasAnimated = useRef(false)

  // Trigger animation when section becomes active (for tab navigation)
  useEffect(() => {
    if (!sectionRef.current || !coverRef.current) return

    // Check if this section should be visible (has the active id)
    const checkIfActive = () => {
      const sectionId = sectionRef.current?.getAttribute('id')
      const activeSectionId = (window as any).activeSectionId || 'hero'
      
      if (sectionId === activeSectionId) {
        // This section is active, trigger animation
        // Reset animation state to allow animation to play
        hasAnimated.current = false
        setIsOpen(true)
      } else {
        // This section is not active, reset cover
        hasAnimated.current = false
        setIsOpen(false)
        if (coverRef.current) {
          coverRef.current.style.display = 'flex'
          coverRef.current.style.opacity = '1'
          coverRef.current.style.transform = 'rotateY(0deg)'
          coverRef.current.style.transformOrigin = 'center center'
        }
        const content = sectionRef.current?.querySelector('.section-content') as HTMLElement
        if (content) {
          content.style.opacity = '0'
          content.style.transform = 'scale(0.98)'
        }
      }
    }

    // Check on mount
    const sectionId = sectionRef.current?.getAttribute('id')
    const activeSectionId = (window as any).activeSectionId || 'hero'
    
    // If this is the initial active section, show content immediately without animation
    if (sectionId === activeSectionId) {
      setIsOpen(true)
      hasAnimated.current = true
      if (coverRef.current) {
        coverRef.current.style.display = 'none'
      }
      const content = sectionRef.current?.querySelector('.section-content')
      if (content) {
        (content as HTMLElement).style.opacity = '1'
      }
    } else {
      checkIfActive()
    }

    // Listen for active section changes
    const handleActiveSectionChange = () => {
      checkIfActive()
    }

    window.addEventListener('activeSectionChange', handleActiveSectionChange)
    
    return () => {
      window.removeEventListener('activeSectionChange', handleActiveSectionChange)
    }
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !coverRef.current || !isOpen) return

    // Get scroll direction from global window object
    const globalDirection = (window as any).scrollDirection || 'forward'
    const isForward = globalDirection === 'forward'

    // Turn.js style page turning effect
    if (coverRef.current) {
      // Set transform origin to the edge (like a book spine)
      // Forward: page turns from right edge (left to right)
      // Backward: page turns from left edge (right to left)
      if (isForward) {
        coverRef.current.style.transformOrigin = 'right center'
      } else {
        coverRef.current.style.transformOrigin = 'left center'
      }

      // Ensure proper z-index and backface visibility
      coverRef.current.style.zIndex = '50'
      coverRef.current.style.backfaceVisibility = 'hidden'

      // Create animation values for turn.js style effect
      const animValues = {
        rotateY: 0,
        opacity: 1,
      }

      // Turn.js style: page rotates 180 degrees around its edge
      const endValues = isForward
        ? {
            rotateY: -180, // Rotate away (forward: right edge, turns left)
            opacity: 0,
          }
        : {
            rotateY: 180, // Rotate away (backward: left edge, turns right)
            opacity: 0,
          }

      // Get content element for simultaneous reveal
      const content = sectionRef.current?.querySelector('.section-content') as HTMLElement

      // Update transform for turn.js style page flip
      const updateTransform = () => {
        if (coverRef.current) {
          // Pure rotateY for book page turning effect
          coverRef.current.style.transform = `rotateY(${animValues.rotateY}deg)`
          coverRef.current.style.opacity = animValues.opacity.toString()
        }
        
        // Reveal content as page turns (inverse of cover opacity)
        if (content) {
          const progress = 1 - animValues.opacity
          // Content fades in as page turns
          content.style.opacity = Math.max(0, Math.min(1, progress)).toString()
          // Slight scale effect for depth
          const scale = 0.98 + (progress * 0.02)
          content.style.transform = `scale(${scale})`
        }
      }

      // Animate with turn.js style easing
      anime({
        targets: animValues,
        ...endValues,
        duration: 1000,
        easing: 'easeInOutQuad', // Smooth book-like easing
        update: () => {
          updateTransform()
        },
        complete: () => {
          hasAnimated.current = true
          if (coverRef.current) {
            coverRef.current.style.display = 'none'
            coverRef.current.style.zIndex = '0'
          }
          // Ensure content is fully visible
          if (content) {
            content.style.opacity = '1'
            content.style.transform = 'scale(1)'
          }
        },
      })
    }
  }, [isOpen])

  return (
    <div 
      ref={sectionRef} 
      id={id} 
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Page Cover - Turn.js style page turning effect */}
      <div
        ref={coverRef}
        className="absolute inset-0 z-50 bg-charcoal flex items-center justify-center"
        style={{
          display: isOpen ? 'none' : 'flex',
          transform: 'rotateY(0deg)',
          transformOrigin: 'center center',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      {/* Section Content - Revealed as page turns */}
      <div 
        className="section-content" 
        style={{
          opacity: 0,
          transform: 'scale(0.98)',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
    </div>
  )
}

