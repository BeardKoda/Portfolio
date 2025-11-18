'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const cursorPosition = useRef({ x: 0, y: 0 })
  const isHoveringRef = useRef(false)

  useEffect(() => {
    if (!cursorRef.current) return

    const updateCursor = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
      
      // Check if hovering over interactive elements
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('a, button, [role="button"], .cursor-pointer') !== null
      
      if (isHoveringRef.current !== isInteractive) {
        isHoveringRef.current = isInteractive
        if (cursorRef.current) {
          cursorRef.current.classList.toggle('hover', isInteractive)
        }
      }
    }

    // Smooth cursor following animation
    const animateCursor = () => {
      if (!cursorRef.current) return

      const dx = mousePosition.current.x - cursorPosition.current.x
      const dy = mousePosition.current.y - cursorPosition.current.y

      cursorPosition.current.x += dx * 0.15
      cursorPosition.current.y += dy * 0.15

      gsap.set(cursorRef.current, {
        left: cursorPosition.current.x,
        top: cursorPosition.current.y,
      })

      requestAnimationFrame(animateCursor)
    }

    window.addEventListener('mousemove', updateCursor)
    animateCursor()

    return () => {
      window.removeEventListener('mousemove', updateCursor)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
    />
  )
}

