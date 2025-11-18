'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'
import SectionCover from '@/components/SectionCover'

const skills = [
  { name: 'Docker', icon: '🐳' },
  { name: 'Kubernetes', icon: '☸️' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Terraform', icon: '🏗️' },
  { name: 'Git', icon: '📦' },
  { name: 'CI/CD', icon: '🔄' },
  { name: 'Python', icon: '🐍' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'React', icon: '⚛️' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Linux', icon: '🐧' },
  { name: 'Bash', icon: '💻' },
  { name: 'Ansible', icon: '🔧' },
  { name: 'Jenkins', icon: '🎯' },
]

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const chips = entry.target.querySelectorAll('.skill-chip')
            anime({
              targets: chips,
              opacity: [0, 1],
              scale: [0.8, 1],
              duration: 600,
              delay: anime.stagger(50),
              easing: 'easeOutExpo',
              complete: () => {
                // Ensure chips are visible after animation
                chips.forEach((chip) => {
                  (chip as HTMLElement).style.opacity = '1'
                })
              },
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <SectionCover id="skills" className="min-h-screen">
      <section
        ref={sectionRef}
        className="min-h-screen py-20 px-6"
      >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 relative inline-block">
            Skills
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-accent animate-[underline_1s_ease-out_forwards]" />
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-chip glass rounded-lg p-6 text-center hover:border-blue-accent hover:shadow-[0_0_20px_rgba(0,122,255,0.3)] transition-all duration-300 cursor-pointer"
              style={{ opacity: 0 }}
            >
              <div className="text-4xl mb-2">{skill.icon}</div>
              <div className="text-white font-body font-semibold">{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </SectionCover>
  )
}

