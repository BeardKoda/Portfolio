'use client'

import { useEffect, useRef, useState } from 'react'

interface BookScrollHandlerProps {
  children: React.ReactNode
}

export default function BookScrollHandler({ children }: BookScrollHandlerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const lastWheelTime = useRef(0)
  const lockedScrollPosition = useRef(0)

  const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']

  const getCurrentSectionIndex = (): number => {
    const scrollPosition = window.scrollY + window.innerHeight / 3
    let currentIndex = 0
    let minDistance = Infinity

    sections.forEach((id, index) => {
      const element = document.getElementById(id)
      if (element) {
        const { offsetTop, offsetHeight } = element
        const sectionCenter = offsetTop + offsetHeight / 2
        const distance = Math.abs(scrollPosition - sectionCenter)

        if (distance < minDistance) {
          minDistance = distance
          currentIndex = index
        }
      }
    })

    return currentIndex
  }

  const scrollToSection = (index: number, direction: 'forward' | 'backward') => {
    if (isScrolling.current) return
    if (index < 0 || index >= sections.length) return

    isScrolling.current = true
    const sectionId = sections[index]
    const element = document.getElementById(sectionId)

    if (element) {
      // Set scroll direction for the section cover animation
      ;(window as any).scrollDirection = direction

      // Get target scroll position
      const targetScrollY = element.offsetTop
      lockedScrollPosition.current = targetScrollY

      // Smooth scroll to section
      const startY = window.scrollY
      const distance = targetScrollY - startY
      const duration = 800
      let startTime: number | null = null

      const animateScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        
        // Easing function
        const ease = 1 - Math.pow(1 - progress, 3)
        
        window.scrollTo(0, startY + distance * ease)
        lockedScrollPosition.current = window.scrollY

        if (progress < 1) {
          requestAnimationFrame(animateScroll)
        } else {
          // Reset scrolling flag after animation completes
          setTimeout(() => {
            isScrolling.current = false
            lockedScrollPosition.current = window.scrollY
          }, 200)
        }
      }

      requestAnimationFrame(animateScroll)
    }
  }

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()

      const now = Date.now()
      // Throttle scroll events - wait for animation to complete
      if (now - lastWheelTime.current < 1200) return
      lastWheelTime.current = now

      if (isScrolling.current) return

      const currentIndex = getCurrentSectionIndex()
      const direction = e.deltaY > 0 ? 'forward' : 'backward'

      if (direction === 'forward' && currentIndex < sections.length - 1) {
        scrollToSection(currentIndex + 1, 'forward')
      } else if (direction === 'backward' && currentIndex > 0) {
        scrollToSection(currentIndex - 1, 'backward')
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      // Store initial touch position
      ;(window as any).touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()

      if (!(window as any).touchStartY || isScrolling.current) return

      const touchEndY = e.touches[0].clientY
      const deltaY = (window as any).touchStartY - touchEndY

      if (Math.abs(deltaY) < 50) return // Ignore small movements

      const now = Date.now()
      if (now - lastWheelTime.current < 1200) return
      lastWheelTime.current = now

      const currentIndex = getCurrentSectionIndex()
      const direction = deltaY < 0 ? 'forward' : 'backward'

      if (direction === 'forward' && currentIndex < sections.length - 1) {
        scrollToSection(currentIndex + 1, 'forward')
      } else if (direction === 'backward' && currentIndex > 0) {
        scrollToSection(currentIndex - 1, 'backward')
      }

      ;(window as any).touchStartY = null
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling.current) return

      const currentIndex = getCurrentSectionIndex()

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        if (currentIndex < sections.length - 1) {
          scrollToSection(currentIndex + 1, 'forward')
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        if (currentIndex > 0) {
          scrollToSection(currentIndex - 1, 'backward')
        }
      }
    }

    // Lock scroll position when not actively scrolling
    const handleScroll = () => {
      if (!isScrolling.current) {
        // Lock scroll to current position
        window.scrollTo(0, lockedScrollPosition.current)
      } else {
        // Update locked position when actively scrolling
        lockedScrollPosition.current = window.scrollY
      }
    }

    // Update locked position periodically
    const updateLockedPosition = () => {
      if (!isScrolling.current) {
        lockedScrollPosition.current = window.scrollY
      }
    }

    // Add scroll direction to window for SectionCover to access
    ;(window as any).scrollDirection = 'forward'

    // Initialize locked position
    lockedScrollPosition.current = window.scrollY

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Update locked position periodically
    const positionInterval = setInterval(updateLockedPosition, 100)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', handleScroll)
      clearInterval(positionInterval)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  return <div ref={containerRef}>{children}</div>
}

