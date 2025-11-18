'use client'

import { useState, useEffect, useCallback } from 'react'
import Hero from '@/app/(sections)/Hero'
import Skills from '@/app/(sections)/Skills'
import Projects from '@/app/(sections)/Projects'
import Experience from '@/app/(sections)/Experience'

export default function Home() {
  const [activeTab, setActiveTab] = useState('hero')

  // Initialize active section on mount and sync whenever activeTab changes
  useEffect(() => {
    ;(window as any).activeSectionId = activeTab
    ;(window as any).scrollDirection = 'forward'
    window.dispatchEvent(new CustomEvent('activeSectionChange'))
  }, [activeTab])

  const sections = {
    hero: <Hero />,
    skills: <Skills />,
    projects: <Projects />,
    experience: <Experience />,
  }

  const handleTabChange = useCallback((tabId: string) => {
    // Set scroll direction based on tab order
    const tabOrder = ['hero', 'skills', 'projects', 'experience']
    const currentIndex = tabOrder.indexOf(activeTab)
    const newIndex = tabOrder.indexOf(tabId)
    const direction = newIndex > currentIndex ? 'forward' : 'backward'
    
    // Set global variables for SectionCover to access
    ;(window as any).scrollDirection = direction
    ;(window as any).activeSectionId = tabId
    
    // Trigger event for SectionCover to react
    window.dispatchEvent(new CustomEvent('activeSectionChange'))
    
    setActiveTab(tabId)
  }, [activeTab])

  // Expose handleTabChange globally for Navbar
  useEffect(() => {
    ;(window as any).handleTabChange = handleTabChange
  }, [handleTabChange])

  return (
    <div className="h-screen overflow-hidden !p-10">
      {sections[activeTab as keyof typeof sections]}
    </div>
  )
}

