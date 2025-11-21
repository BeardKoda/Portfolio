'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Hero from '@/app/(sections)/Hero'
import Skills from '@/app/(sections)/Skills'
import Projects from '@/app/(sections)/Projects'
import Experience from '@/app/(sections)/Experience'

export default function Home() {
  const [activeTab, setActiveTab] = useState('hero')
  const isScrollingRef = useRef(false)

  const tabOrder = ['hero', 'skills', 'projects', 'experience']

  // Initialize active section on mount and sync whenever activeTab changes
  useEffect(() => {
    ;(window as any).activeSectionId = activeTab
    ;(window as any).scrollDirection = 'forward'
    window.dispatchEvent(new CustomEvent('activeSectionChange'))
  }, [activeTab])

  // Handle scroll events to detect which section is in view using IntersectionObserver
  useEffect(() => {
    let observer: IntersectionObserver | null = null

    // Wait for sections to be mounted
    const setupObserver = () => {
      const sections = tabOrder.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
      if (sections.length === 0) {
        // Retry after a short delay if sections aren't ready
        setTimeout(setupObserver, 100)
        return
      }

      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px', // Section must be in the middle 60% of viewport
        threshold: 0.5,
      }

      observer = new IntersectionObserver((entries) => {
        // Ignore if we're programmatically scrolling
        if (isScrollingRef.current) return

        // Find the entry with the highest intersection ratio
        let maxRatio = 0
        let bestEntry: IntersectionObserverEntry | null = null

        for (const entry of entries) {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            bestEntry = entry
          }
        }

        if (bestEntry && bestEntry.isIntersecting) {
          const targetElement = bestEntry.target as HTMLElement
          if (targetElement) {
            const sectionId = targetElement.getAttribute('id')
            if (sectionId) {
              // Use functional update to get latest activeTab value
              setActiveTab((currentActiveTab) => {
                if (sectionId !== currentActiveTab) {
                  const currentIndex = tabOrder.indexOf(currentActiveTab)
                  const newIndex = tabOrder.indexOf(sectionId)
                  const direction = newIndex > currentIndex ? 'forward' : 'backward'

                  // Set global variables for SectionCover to access
                  ;(window as any).scrollDirection = direction
                  ;(window as any).activeSectionId = sectionId

                  // Trigger event for SectionCover to react
                  window.dispatchEvent(new CustomEvent('activeSectionChange'))

                  return sectionId
                }
                return currentActiveTab
              })
            }
          }
        }
      }, observerOptions)

      // Observe all sections
      sections.forEach((section) => {
        observer!.observe(section)
      })
    }

    setupObserver()
    
    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, []) // Run only once on mount

  const handleTabChange = useCallback((tabId: string) => {
    // Prevent observer from triggering during programmatic scroll
    isScrollingRef.current = true

    // Set scroll direction based on tab order
    const currentIndex = tabOrder.indexOf(activeTab)
    const newIndex = tabOrder.indexOf(tabId)
    const direction = newIndex > currentIndex ? 'forward' : 'backward'

    // Set global variables for SectionCover to access
    ;(window as any).scrollDirection = direction
    ;(window as any).activeSectionId = tabId

    // Trigger event for SectionCover to react
    window.dispatchEvent(new CustomEvent('activeSectionChange'))

    setActiveTab(tabId)

    // Scroll to the section with smooth animation
    const scrollToSection = () => {
      const section = document.getElementById(tabId)
      if (!section) {
        isScrollingRef.current = false
        return
      }

      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        const startPosition = window.pageYOffset || window.scrollY || 0
        const rect = section.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0
        const targetPosition = rect.top + scrollTop - 40 // Account for page padding (p-10 = 40px)
        const distance = targetPosition - startPosition
        const duration = 800 // milliseconds
        let start: number | null = null

        const easeInOutCubic = (t: number): number => {
          return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2
        }

        const animateScroll = (currentTime: number) => {
          if (start === null) start = currentTime
          const timeElapsed = currentTime - start
          const progress = Math.min(timeElapsed / duration, 1)

          const currentScroll = startPosition + distance * easeInOutCubic(progress)
          window.scrollTo({
            top: Math.max(0, currentScroll),
            behavior: 'auto' as ScrollBehavior,
          })

          if (progress < 1) {
            requestAnimationFrame(animateScroll)
          } else {
            // Ensure we're exactly at the target position
            const finalPosition = Math.max(0, targetPosition)
            window.scrollTo({
              top: finalPosition,
              behavior: 'auto' as ScrollBehavior,
            })
            // Reset scrolling flag after animation completes
            setTimeout(() => {
              isScrollingRef.current = false
            }, 100)
          }
        }

        requestAnimationFrame(animateScroll)
      })
    }

    // Small delay to ensure DOM is ready, then scroll
    setTimeout(scrollToSection, 50)
  }, [activeTab])

  // Expose handleTabChange globally for Navbar
  useEffect(() => {
    ;(window as any).handleTabChange = handleTabChange
  }, [handleTabChange])

  return (
    <div className="!p-20">
      <Hero />
      {/* <Skills /> */}
      <Projects />
      <Experience />
    </div>
  )
}

