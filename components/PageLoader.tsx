'use client'

import { useEffect, useState, useRef } from 'react'
import anime from 'animejs'

interface PageLoaderProps {
  onComplete?: () => void
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [isVisible, setIsVisible] = useState(true)
  const loaderRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const spinnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate text letters on mount
    if (textRef.current) {
      const letters = textRef.current.querySelectorAll('span')
      anime({
        targets: letters,
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100),
        duration: 600,
        easing: 'easeOutCubic',
      })
    }

    // Animate spinner
    if (spinnerRef.current) {
      anime({
        targets: spinnerRef.current,
        rotate: 360,
        duration: 2000,
        easing: 'linear',
        loop: true,
      })
    }

    // Wait for page to load and then fade out
    const handleLoad = () => {
      setTimeout(() => {
        if (loaderRef.current) {
          anime({
            targets: loaderRef.current,
            opacity: [1, 0],
            scale: [1, 0.95],
            duration: 600,
            easing: 'easeOutCubic',
            complete: () => {
              setIsVisible(false)
              // Notify that loader is complete
              if (onComplete) {
                onComplete()
              }
            },
          })
        }
      }, 800) // Minimum display time
    }

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      // Fallback timeout
      setTimeout(handleLoad, 2000)
    }

    return () => {
      window.removeEventListener('load', handleLoad)
    }
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div
      ref={loaderRef}
      className="page-loader fixed inset-0 z-[100] bg-charcoal flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-8">
        {/* Loading Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
          <div
            ref={spinnerRef}
            className="absolute inset-0 border-4 border-green-600 border-t-transparent rounded-full"
          ></div>
        </div>
      </div>
    </div>
  )
}

