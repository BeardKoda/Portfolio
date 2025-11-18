'use client'

import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'
import Image from 'next/image'
import SectionCover from '@/components/SectionCover'

export default function About() {
  const [counters, setCounters] = useState({ experience: 0, projects: 0, certified: 0 })
  const [imageError, setImageError] = useState(true) // Start as true since image doesn't exist
  const sectionRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!sectionRef.current || hasAnimated.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            const counterValues = { experience: 0, projects: 0, certified: 0 }
            
            anime({
              targets: counterValues,
              experience: 7,
              projects: 50,
              certified: 1,
              duration: 2000,
              easing: 'easeOutExpo',
              update: () => {
                setCounters({
                  experience: Math.floor(counterValues.experience),
                  projects: Math.floor(counterValues.projects),
                  certified: Math.floor(counterValues.certified),
                })
              },
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <SectionCover id="about" className="min-h-screen">
      <section
        ref={sectionRef}
        className="min-h-screen py-20 px-6 flex items-center"
      >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 relative inline-block">
            About Me
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-accent animate-[underline_1s_ease-out_forwards]" />
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-blue-accent/20 rounded-full blur-3xl" />
              <div className="relative w-full h-full rounded-full overflow-hidden glass border-4 border-blue-accent/30 flex items-center justify-center bg-charcoal">
                {!imageError && (
                  <Image
                    src="/avatar.jpg"
                    alt="Beardkoda"
                    fill
                    className="object-cover"
                    onError={() => {
                      setImageError(true)
                    }}
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="text-6xl font-heading font-bold text-blue-accent">BK</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-white/80 font-body text-lg mb-8 leading-relaxed">
              I'm a Senior DevOps & Software Engineer with a passion for building scalable,
              reliable systems. With expertise in cloud architecture, containerization, and
              automation, I help teams deliver high-quality software faster and more efficiently.
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div className="glass rounded-lg p-6 text-center">
                <div className="text-4xl font-heading font-bold text-blue-accent mb-2">
                  {counters.experience}+
                </div>
                <div className="text-white/70 font-body text-sm">Years Experience</div>
              </div>
              <div className="glass rounded-lg p-6 text-center">
                <div className="text-4xl font-heading font-bold text-green-highlight mb-2">
                  {counters.projects}+
                </div>
                <div className="text-white/70 font-body text-sm">Projects Delivered</div>
              </div>
              <div className="glass rounded-lg p-6 text-center">
                <div className="text-4xl font-heading font-bold text-blue-accent mb-2">
                  {counters.certified}
                </div>
                <div className="text-white/70 font-body text-sm">Cloud & DevOps Certified</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </SectionCover>
  )
}

