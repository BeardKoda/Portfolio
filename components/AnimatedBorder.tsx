'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface AnimatedBorderProps {
  sectionId: string
  nextSectionId: string
}

export default function AnimatedBorder({ sectionId, nextSectionId }: AnimatedBorderProps) {
  const borderRef = useRef<SVGSVGElement>(null)
  const arrowRef = useRef<SVGGElement>(null)
  const borderPathRef = useRef<SVGPathElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [nextSectionPosition, setNextSectionPosition] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const section = document.getElementById(sectionId)
    const nextSection = document.getElementById(nextSectionId)
    if (!section || !borderRef.current) return

    const updateDimensions = () => {
      const rect = section.getBoundingClientRect()
      setDimensions({
        width: rect.width,
        height: rect.height,
      })

      // Calculate next section position relative to current section
      if (nextSection) {
        const nextRect = nextSection.getBoundingClientRect()
        const currentRect = section.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        
        // Calculate relative position
        const relativeX = (nextRect.left + nextRect.width / 2) - currentRect.left
        const relativeY = (nextRect.top + nextRect.height / 2) - (currentRect.top + scrollTop)
        
        setNextSectionPosition({
          x: relativeX,
          y: relativeY + currentRect.height,
        })
      } else {
        // Default to bottom center if next section not found
        setNextSectionPosition({
          x: rect.width / 2,
          y: rect.height,
        })
      }
    }

    const updateScrollProgress = () => {
      if (!section) return

      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionTop = rect.top + window.pageYOffset
      const sectionHeight = rect.height
      const currentScroll = window.pageYOffset || window.scrollY

      // Calculate scroll progress (0 to 1)
      // Progress increases as user scrolls through the section
      let progress = 0
      
      if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
        // User is scrolling through this section
        progress = (currentScroll - sectionTop) / sectionHeight
      } else if (currentScroll >= sectionTop + sectionHeight) {
        // User has scrolled past this section
        progress = 1
      }

      setScrollProgress(Math.min(1, Math.max(0, progress)))
    }

    // Initial calculations
    updateDimensions()
    updateScrollProgress()

    // Update on scroll and resize
    const handleScroll = () => {
      updateScrollProgress()
      updateDimensions()
    }

    const handleResize = () => {
      updateDimensions()
      updateScrollProgress()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    // Initial delay to ensure DOM is ready
    setTimeout(() => {
      updateDimensions()
      updateScrollProgress()
    }, 100)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [sectionId, nextSectionId])

  useEffect(() => {
    if (!borderPathRef.current || !arrowRef.current || dimensions.width === 0 || !nextSectionPosition) return

    const borderPath = borderPathRef.current
    // Wait for next frame to ensure path is rendered
    requestAnimationFrame(() => {
      const pathLength = borderPath.getTotalLength()
      
      // Calculate dash offset based on scroll progress
      // The border animates around the section perimeter as scroll progresses
      const dashOffset = pathLength * (1 - scrollProgress)

      // Animate border with smooth easing
      gsap.to(borderPath, {
        strokeDashoffset: dashOffset,
        duration: 0.5,
        ease: 'power2.out',
      })

    // Calculate arrow position along the border path
    // Arrow moves around the perimeter and points toward next section
    const perimeter = (dimensions.width + dimensions.height) * 2
    const arrowDistance = perimeter * scrollProgress
    
    let arrowX = 0
    let arrowY = 0
    let rotation = 0

    const padding = 20
    const width = dimensions.width - padding * 2
    const height = dimensions.height - padding * 2

    // Determine which edge the arrow should be on based on scroll progress
    if (arrowDistance < width) {
      // Top edge (left to right)
      arrowX = padding + arrowDistance
      arrowY = padding
      rotation = 90 // Point down
    } else if (arrowDistance < width + height) {
      // Right edge (top to bottom)
      arrowX = dimensions.width - padding
      arrowY = padding + (arrowDistance - width)
      rotation = 180 // Point left
    } else if (arrowDistance < width * 2 + height) {
      // Bottom edge (right to left)
      arrowX = dimensions.width - padding - (arrowDistance - width - height)
      arrowY = dimensions.height - padding
      rotation = 270 // Point up
    } else {
      // Left edge (bottom to top)
      arrowX = padding
      arrowY = dimensions.height - padding - (arrowDistance - width * 2 - height)
      rotation = 0 // Point right
    }

    // Point arrow toward next section
    if (nextSectionPosition) {
      const dx = nextSectionPosition.x - arrowX
      const dy = nextSectionPosition.y - arrowY
      rotation = (Math.atan2(dy, dx) * 180) / Math.PI + 90
    }

      // Animate arrow position and rotation
      gsap.to(arrowRef.current, {
        x: arrowX,
        y: arrowY,
        rotation: rotation,
        opacity: scrollProgress > 0.1 ? Math.min(1, scrollProgress * 3) : 0,
        scale: scrollProgress > 0.1 ? 1 : 0.5,
        duration: 0.5,
        ease: 'power2.out',
      })
    })
  }, [scrollProgress, dimensions, nextSectionPosition])

  if (dimensions.width === 0 || dimensions.height === 0 || !nextSectionPosition) {
    return null
  }

  const padding = 20
  const pathD = `
    M ${padding} ${padding}
    L ${dimensions.width - padding} ${padding}
    L ${dimensions.width - padding} ${dimensions.height - padding}
    L ${padding} ${dimensions.height - padding}
    Z
  `

  return (
    <svg
      ref={borderRef}
      className="absolute inset-0 pointer-events-none z-10"
      width={dimensions.width}
      height={dimensions.height}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={`borderGradient-${sectionId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#065f46" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#047857" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#065f46" stopOpacity="0.9" />
        </linearGradient>
        <filter id={`glow-${sectionId}`}>
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Animated border path */}
      <path
        ref={borderPathRef}
        className="border-path"
        d={pathD}
        fill="none"
        stroke={`url(#borderGradient-${sectionId})`}
        strokeWidth="3"
        strokeDasharray="2000"
        strokeDashoffset="2000"
        filter={`url(#glow-${sectionId})`}
        style={{
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
      />
      
      {/* Arrow pointing to next section */}
      <g ref={arrowRef} opacity="0" transformOrigin="center center">
        <circle
          cx="0"
          cy="0"
          r="8"
          fill="#065f46"
          opacity="0.4"
          filter={`url(#glow-${sectionId})`}
        />
        <path
          d="M 0 -12 L -8 4 L 0 0 L 8 4 Z"
          fill="#065f46"
          filter={`url(#glow-${sectionId})`}
        />
      </g>
    </svg>
  )
}

