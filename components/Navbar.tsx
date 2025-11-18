'use client'

import { useEffect, useState, useRef } from 'react'
import anime from 'animejs'

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isOpen, setIsOpen] = useState(false)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Listen for active section changes from tab navigation
    const handleActiveSectionChange = () => {
      const activeSectionId = (window as any).activeSectionId || 'hero'
      setActiveSection((prev) => {
        if (prev !== activeSectionId) {
          return activeSectionId
        }
        return prev
      })
    }

    // Initial check with a small delay to ensure window.activeSectionId is set
    const timeoutId = setTimeout(() => {
      handleActiveSectionChange()
    }, 100)

    // Listen for custom event
    window.addEventListener('activeSectionChange', handleActiveSectionChange)
    
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('activeSectionChange', handleActiveSectionChange)
    }
  }, [])

  useEffect(() => {
    const activeButton = document.querySelector(`[data-section="${activeSection}"]`) as HTMLElement
    if (activeButton && indicatorRef.current && containerRef.current) {
      const buttonRect = activeButton.getBoundingClientRect()
      const containerRect = containerRef.current.getBoundingClientRect()
      const relativeTop = buttonRect.top - containerRect.top
      const buttonHeight = buttonRect.height
      
      anime({
        targets: indicatorRef.current,
        top: relativeTop,
        height: buttonHeight,
        duration: 400,
        easing: 'easeOutCubic',
      })
    }
  }, [activeSection])

  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
  ]

  const scrollToSection = (id: string) => {
    // Trigger tab change event for tab navigation
    if ((window as any).handleTabChange) {
      ;(window as any).handleTabChange(id)
    }
    setIsOpen(false) // Close menu after navigation
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-6 right-6 z-50 w-12 h-12 flex flex-col items-center justify-center gap-1.5 glass rounded-lg border border-white/20 hover:border-blue-accent/50 transition-all duration-300 group"
        aria-label="Toggle navigation menu"
      >
        <span
          className={`w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Sidebar Navigation */}
      <nav
        className={`fixed right-0 top-0 z-40 h-screen transition-all duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full rounded-l-2xl p-12 pr-12 min-w-[400px] bg-transparent">
          <div ref={containerRef} className="relative !p-8 flex flex-col items-start gap-6 h-full justify-center">
            {/* Active indicator bar */}
            <div
              ref={indicatorRef}
              className="absolute left-0 w-1.5 bg-green-600 rounded-full transition-all duration-400"
              style={{ top: 0, height: 80 }}
            />
            
            {navItems.map((item, index) => (
              <button
                key={item.id}
                data-section={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative group flex items-center w-full pl-4 pr-8 py-6 transition-all duration-500 rounded-xl min-h-[80px] ${
                  activeSection === item.id 
                    ? 'text-green-600' 
                    : 'text-white/70 hover:text-green-600'
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Label with animations */}
                <span className={`text-6xl font-body font-bold whitespace-nowrap tracking-tight transition-all duration-500 ${
                  activeSection === item.id
                    ? 'scale-110 drop-shadow-[0_0_20px_rgba(22,163,74,0.5)] animate-pulse'
                    : 'group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(22,163,74,0.4)]'
                }`}>
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Overlay when menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

