'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import * as THREE from 'three'

export default function Background() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const lineRef = useRef<THREE.Mesh | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const scrollYRef = useRef(0)
  const targetScrollYRef = useRef(0)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize Three.js scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create particle system
    const particleCount = 20000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const velocities = new Float32Array(particleCount * 3)

    const colorPalette = [
      new THREE.Color(0x007aff), // Blue accent
      new THREE.Color(0x00ff88), // Green highlight
      new THREE.Color(0xffffff), // White
    ]

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Random position
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20

      // Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i3] = color.r * (0.1 + Math.random() * 0.1)
      colors[i3 + 1] = color.g * (0.1 + Math.random() * 0.1)
      colors[i3 + 2] = color.b * (0.1 + Math.random() * 0.1)

      // Random size
      sizes[i] = Math.random() * 2 + 1

      // Initialize all velocities to 0 - only one particle will move
      velocities[i3] = 0
      velocities[i3 + 1] = 0
      velocities[i3 + 2] = 0
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: false,
    })

    const particles = new THREE.Points(geometry, material)
    particles.userData.velocities = velocities
    // Select one random particle to animate
    particles.userData.activeParticleIndex = Math.floor(Math.random() * particleCount)
    scene.add(particles)
    particlesRef.current = particles

    // Create animated line (glowing orb)
    const lineGeometry = new THREE.SphereGeometry(0.05, 16, 16)
    const lineMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.8,
    })
    const line = new THREE.Mesh(lineGeometry, lineMaterial)
    line.position.set(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      0
    )
    scene.add(line)
    lineRef.current = line

    // Add glow effect to line
    const glowGeometry = new THREE.SphereGeometry(0.15, 16, 16)
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.3,
    })
    const glow = new THREE.Mesh(glowGeometry, glowMaterial)
    line.add(glow)

    // GSAP animation for line movement
    const gridSize = 60
    const getRandomGridPosition = () => {
      const cols = Math.floor(window.innerWidth / gridSize)
      const rows = Math.floor(window.innerHeight / gridSize)
      const randomCol = Math.floor(Math.random() * cols)
      const randomRow = Math.floor(Math.random() * rows)
      return {
        x: ((randomCol * gridSize) / window.innerWidth - 0.5) * 20,
        y: ((randomRow * gridSize) / window.innerHeight - 0.5) * 20,
      }
    }

    const animateLine = () => {
      const targetPos = getRandomGridPosition()
      const duration = Math.random() * 2 + 1

      // Create trail
      const trailGeometry = new THREE.SphereGeometry(0.03, 8, 8)
      const trailMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.4,
      })
      const trail = new THREE.Mesh(trailGeometry, trailMaterial)
      trail.position.copy(line.position)
      scene.add(trail)

      // Fade out trail
      gsap.to(trail.material, {
        opacity: 0,
        duration: 3,
        ease: 'power2.out',
        onComplete: () => {
          scene.remove(trail)
          trail.geometry.dispose()
          trail.material.dispose()
        },
      })

      gsap.to(trail.scale, {
        x: 2,
        y: 2,
        z: 2,
        duration: 3,
        ease: 'power2.out',
      })

      // Animate line to new position
      gsap.to(line.position, {
        x: targetPos.x,
        y: targetPos.y,
        duration: duration,
        ease: 'power1.inOut',
        onComplete: animateLine,
      })

      // Pulse animation
      gsap.to(line.scale, {
        x: 1.5,
        y: 1.5,
        z: 1.5,
        duration: duration / 2,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut',
      })
    }

    // Start line animation
    setTimeout(() => {
      animateLine()
    }, 500)

    // Parallax scroll handler
    const handleScroll = () => {
      targetScrollYRef.current = window.scrollY || window.pageYOffset
    }

    // Smooth parallax update
    const updateParallax = () => {
      // Smooth interpolation for parallax effect (easing for smoother movement)
      const scrollDelta = targetScrollYRef.current - scrollYRef.current
      scrollYRef.current += scrollDelta * 0.08

      if (cameraRef.current) {
        // Parallax effect: camera moves slightly based on scroll
        const parallaxIntensity = 0.8
        const normalizedScroll = scrollYRef.current / (window.innerHeight || 1)
        cameraRef.current.position.y = 5 + normalizedScroll * parallaxIntensity * 2
        // Subtle rotation based on scroll
        cameraRef.current.rotation.z = normalizedScroll * 0.05
      }

      if (particlesRef.current) {
        // Parallax effect: particles move at different speed (slower)
        const particlesParallax = 0.4
        const normalizedScroll = scrollYRef.current / (window.innerHeight || 1)
        particlesRef.current.position.y = normalizedScroll * particlesParallax * 2
        // Add rotation parallax
        particlesRef.current.rotation.z = normalizedScroll * 0.1
      }

      if (lineRef.current) {
        // Parallax effect: line moves at different speed (faster)
        const lineParallax = 1.2
        const baseY = lineRef.current.userData.baseY || 0
        const normalizedScroll = scrollYRef.current / (window.innerHeight || 1)
        lineRef.current.position.y = baseY + normalizedScroll * lineParallax * 2
        // Add subtle rotation
        lineRef.current.rotation.z = normalizedScroll * 0.15
      }
    }

    // Store base Y position for line
    if (lineRef.current) {
      lineRef.current.userData.baseY = line.position.y
    }

    // Animation loop - start immediately
    let frameCount = 0
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)
      frameCount++

      // Update parallax effect
      updateParallax()

      // Always update particles
      if (particlesRef.current) {
        const particles = particlesRef.current
        particles.rotation.y += 0.0002
        particles.rotation.x += 0.0001

        // Update only one particle position with random movement
        const positions = particles.geometry.attributes.position as THREE.BufferAttribute
        const velocities = particles.userData.velocities as Float32Array
        const activeIndex = particles.userData.activeParticleIndex as number

        if (velocities && positions && activeIndex !== undefined) {
          const posArray = positions.array as Float32Array
          const i3 = activeIndex * 3
          
          // Randomly change velocity direction more frequently for immediate visible movement
          if (frameCount % 30 === 0 || Math.random() < 0.02) {
            velocities[i3] = (Math.random() - 0.5) * 0.05
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.05
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.05
          }

          // Add continuous random drift for organic movement
          const drift = 0.005
          velocities[i3] += (Math.random() - 0.5) * drift
          velocities[i3 + 1] += (Math.random() - 0.5) * drift
          velocities[i3 + 2] += (Math.random() - 0.5) * drift

          // Clamp velocity to prevent particle from moving too fast
          const maxSpeed = 0.06
          velocities[i3] = Math.max(-maxSpeed, Math.min(maxSpeed, velocities[i3]))
          velocities[i3 + 1] = Math.max(-maxSpeed, Math.min(maxSpeed, velocities[i3 + 1]))
          velocities[i3 + 2] = Math.max(-maxSpeed, Math.min(maxSpeed, velocities[i3 + 2]))

          // Update position immediately
          posArray[i3] += velocities[i3]
          posArray[i3 + 1] += velocities[i3 + 1]
          posArray[i3 + 2] += velocities[i3 + 2]

          // Wrap around boundaries with some randomness
          if (Math.abs(posArray[i3]) > 10) {
            posArray[i3] = (Math.random() - 0.5) * 20
          }
          if (Math.abs(posArray[i3 + 1]) > 10) {
            posArray[i3 + 1] = (Math.random() - 0.5) * 20
          }
          if (Math.abs(posArray[i3 + 2]) > 10) {
            posArray[i3 + 2] = (Math.random() - 0.5) * 20
          }
          
          // Mark positions as needing update
          positions.needsUpdate = true
        }
      }

      // Always render
      if (renderer && scene && camera) {
        renderer.render(scene, camera)
      }
    }

    // Start animation immediately - no delay
    animate()

    // Add scroll event listener
    handleScroll() // Initialize scroll position
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', handleScroll, { passive: true })

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return
      
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleScroll)
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose of Three.js resources
      particles.geometry.dispose()
      particles.material.dispose()
      line.geometry.dispose()
      line.material.dispose()
      glow.geometry.dispose()
      glow.material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          width: '100vw',
          height: '100vh',
        }}
      />
  )
}
