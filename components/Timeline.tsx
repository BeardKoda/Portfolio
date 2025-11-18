'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'

interface TimelineItem {
  company: string
  role: string
  years: string
  responsibilities: string[]
}

interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!timelineRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const nodes = entry.target.querySelectorAll('.timeline-node')
            anime({
              targets: nodes,
              opacity: [0, 1],
              translateX: [-50, 0],
              duration: 800,
              delay: anime.stagger(200),
              easing: 'easeOutExpo',
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(timelineRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={timelineRef} className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-accent/30" />
      <div className="space-y-12">
        {items.map((item, index) => (
          <div key={index} className="relative timeline-node opacity-0">
            <div className="absolute left-6 w-4 h-4 bg-blue-accent rounded-full border-4 border-charcoal" />
            <div className="ml-20">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className="text-xl font-heading font-bold text-blue-accent">
                  {item.company}
                </h3>
                <span className="text-green-highlight font-code text-sm">{item.years}</span>
              </div>
              <p className="text-lg font-body font-semibold text-white mb-3">{item.role}</p>
              <ul className="space-y-2">
                {item.responsibilities.map((resp, i) => (
                  <li key={i} className="text-white/70 font-body text-sm flex items-start">
                    <span className="text-green-highlight mr-2">▹</span>
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

