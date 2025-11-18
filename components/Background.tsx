'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'

export default function Background() {
  const backgroundRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!backgroundRef.current) return

    // Create the grid pattern using CSS
    const gridSize = 60
    const lineColor = 'rgba(255, 255, 255, 0.08)'
    
    // Set the background pattern
    backgroundRef.current.style.backgroundImage = `
      linear-gradient(to right, ${lineColor} 1px, transparent 1px),
      linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)
    `
    backgroundRef.current.style.backgroundSize = `${gridSize}px ${gridSize}px`
    backgroundRef.current.style.backgroundPosition = '0px 0px'

    // Animate the background position
    const animTarget = { x: 0, y: 0 }

    anime({
      targets: animTarget,
      x: gridSize,
      y: gridSize,
      duration: 8000,
      easing: 'linear',
      loop: true,
      update: () => {
        if (backgroundRef.current) {
          backgroundRef.current.style.backgroundPosition = `${animTarget.x}px ${animTarget.y}px`
        }
      },
    })
  }, [])

  useEffect(() => {
    if (!particlesRef.current) return

    // Create floating particles
    const particleCount = 250
    const particles: HTMLElement[] = []
    
    // Color palette matching the theme
    const colors = [
      'rgba(0, 122, 255, 0.2)',    // Blue accent
      'rgba(0, 255, 136, 0.2)',    // Green highlight
      'rgba(255, 255, 255, 0.15)', // White
      'rgba(0, 122, 255, 0.15)',   // Lighter blue
      'rgba(0, 255, 136, 0.15)',   // Lighter green
      'rgba(255, 255, 255, 0.1)',  // Dimmer white
    ]

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'floating-particle'
      
      // Random size between 2-4px
      const size = Math.random() * 2 + 2
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.borderRadius = '50%'
      
      // Random color from palette
      const color = colors[Math.floor(Math.random() * colors.length)]
      particle.style.backgroundColor = color
      particle.style.boxShadow = `0 0 ${size * 2}px ${color}`
      
      particle.style.position = 'absolute'
      
      // Random starting position
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      
      particlesRef.current.appendChild(particle)
      particles.push(particle)
    }

    // Animate each particle
    particles.forEach((particle, index) => {
      // Random movement distance (30-50% of viewport)
      const moveX = (Math.random() - 0.5) * (window.innerWidth * 0.4)
      const moveY = (Math.random() - 0.5) * (window.innerHeight * 0.4)
      
      // Random duration between 15-25 seconds
      const duration = Math.random() * 10000 + 15000
      
      // Random delay to stagger animations
      const delay = index * 150

      // Create smooth floating animation
      anime({
        targets: particle,
        translateX: [0, moveX, -moveX, 0],
        translateY: [0, moveY, -moveY, 0],
        opacity: [0.1, 0.25, 0.25, 0.1],
        scale: [0.9, 1.1, 1.1, 0.9],
        duration: duration,
        delay: delay,
        easing: 'easeInOutSine',
        loop: true,
      })
    })

    // Cleanup function
    return () => {
      particles.forEach((particle) => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      })
    }
  }, [])

  return (
    <>
      {/* Grid Background */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          width: '100vw',
          height: '100vh',
        }}
      />
      {/* Floating Particles */}
      <div
        ref={particlesRef}
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          width: '100vw',
          height: '100vh',
        }}
      />
    </>
  )
}

