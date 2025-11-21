'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'
import TypewriterText from '@/components/TypewriterText'
import SectionCover from '@/components/SectionCover'

const skills = [
  { name: 'Docker', icon: '🐳' },
  { name: 'Kubernetes', icon: '☸️' },
  { name: 'AWS', icon: '☁️' },
  { name: 'GCP', icon: '🌐' },
  { name: 'Terraform', icon: '🏗️' },
  { name: 'Git', icon: '📦' },
  { name: 'CI/CD', icon: '🔄' },
  { name: 'Python', icon: '🐍' },
  { name: 'Go', icon: '🐹' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'React', icon: '⚛️' },
  { name: 'LangGraph', icon: '🔗' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Linux', icon: '🐧' },
  { name: 'Bash', icon: '💻' },
  { name: 'Ansible', icon: '🔧' },
  { name: 'Jenkins', icon: '🎯' },
]

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const skillsGridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !skillsGridRef.current) return
    
    const skillsAnimationDelay = 1000

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate skill chips after text animations complete
            setTimeout(() => {
              const chips = skillsGridRef.current?.querySelectorAll('.skill-chip')
              if (chips) {
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
              }
            }, skillsAnimationDelay)
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
    <SectionCover id="skills">
      <section
        ref={sectionRef}
        className="flex flex-col items-center justify-center px-6 pt-20"
      >
      <div className="flex flex-col max-w-6xl mx-auto w-full gap-6">
        <div className="mb-4 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 relative inline-block">
            Skills / Tools
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-accent animate-[underline_1s_ease-out_forwards]" />
          </h2>
        </div>
        <div className="text-lg md:text-xl font-body text-white/70 leading-relaxed mb-6 gap-4">
          <div className="mb-4">
            <TypewriterText
              text="I use a tight, reliable stack of tools to build systems that scale smoothly, stay stable, and deploy without noise engineering made clean."
              className="text-lg md:text-xl font-body text-white/70 leading-relaxed"
              delay={50}
              speed={1}
            />
          </div>
        </div>
        <div ref={skillsGridRef} className="grid grid-cols-2 md:grid-cols-8 lg:grid-cols-8 gap-6 lg:gap-8 w-full">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-chip rounded-lg p-8 text-center hover:border-blue-accent hover:shadow-[0_0_20px_rgba(0,122,255,0.3)] transition-all duration-300 cursor-pointer"
              style={{ opacity: 0 }}
            >
              <div className="text-4xl mb-3">{skill.icon}</div>
              <div className="text-white font-body font-semibold">{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </SectionCover>
  )
}

