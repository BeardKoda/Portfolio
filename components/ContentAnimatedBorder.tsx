'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface ContentAnimatedBorderProps {
  containerRef: React.RefObject<HTMLDivElement>
  nextSectionId: string
}

export default function ContentAnimatedBorder({ containerRef, nextSectionId }: ContentAnimatedBorderProps) {
  const borderRef = useRef<SVGSVGElement>(null)
  const arrowRef = useRef<SVGGElement>(null)
  const borderPathRef = useRef<SVGPathElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [nextSectionPosition, setNextSectionPosition] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const nextSection = document.getElementById(nextSectionId)
    if (!container || !borderRef.current) return

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect()
      setDimensions({
        width: rect.width,
        height: rect.height,
      })

      // Calculate next section position relative to container
      if (nextSection) {
        const nextRect = nextSection.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        
        // Calculate relative position
        const relativeX = (nextRect.left + nextRect.width / 2) - containerRect.left
        const relativeY = (nextRect.top + nextRect.height / 2) - (containerRect.top + scrollTop)
        
        setNextSectionPosition({
          x: relativeX,
          y: relativeY + containerRect.height,
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
      if (!container) return

      const heroSection = document.getElementById('hero')
      if (!heroSection) return

      const heroRect = heroSection.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const heroTop = heroRect.top + window.pageYOffset
      const heroHeight = heroRect.height
      const currentScroll = window.pageYOffset || window.scrollY

      // Calculate scroll progress (0 to 1)
      let progress = 0
      
      if (currentScroll >= heroTop && currentScroll < heroTop + heroHeight) {
        // User is scrolling through hero section
        progress = (currentScroll - heroTop) / heroHeight
      } else if (currentScroll >= heroTop + heroHeight) {
        // User has scrolled past hero section
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
  }, [containerRef, nextSectionId])

  useEffect(() => {
    if (!borderPathRef.current || !arrowRef.current || dimensions.width === 0 || !nextSectionPosition) return

    const borderPath = borderPathRef.current
    // Wait for next frame to ensure path is rendered
    requestAnimationFrame(() => {
      const pathLength = borderPath.getTotalLength()
      
      // Calculate dash offset based on scroll progress
      const dashOffset = pathLength * (1 - scrollProgress)

      // Animate border with smooth easing
      gsap.to(borderPath, {
        strokeDashoffset: dashOffset,
        duration: 0.5,
        ease: 'power2.out',
      })

      // Calculate arrow position along the border path
      const padding = 15
      const perimeter = (dimensions.width + dimensions.height) * 2
      const arrowDistance = perimeter * scrollProgress
      
      let arrowX = 0
      let arrowY = 0
      let rotation = 0

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

  const padding = 15
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
      className="absolute inset-0 pointer-events-none z-0"
      width={dimensions.width}
      height={dimensions.height}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={`contentBorderGradient-${nextSectionId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#065f46" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#047857" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#065f46" stopOpacity="0.8" />
        </linearGradient>
        <filter id={`contentGlow-${nextSectionId}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Animated border path */}
      <path
        ref={borderPathRef}
        className="content-border-path"
        d={pathD}
        fill="none"
        stroke={`url(#contentBorderGradient-${nextSectionId})`}
        strokeWidth="2"
        strokeDasharray="2000"
        strokeDashoffset="2000"
        filter={`url(#contentGlow-${nextSectionId})`}
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
          r="6"
          fill="#065f46"
          opacity="0.4"
          filter={`url(#contentGlow-${nextSectionId})`}
        />
        <path
          d="M 0 -10 L -6 3 L 0 0 L 6 3 Z"
          fill="#065f46"
          filter={`url(#contentGlow-${nextSectionId})`}
        />
      </g>
    </svg>
  )
}

