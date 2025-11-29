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
    <div ref={timelineRef} className="flex flex-col">
      <div className="flex flex-col space-y-16 lg:space-y-20 gap-2 !px-6">
        {items.map((item, index) => (
          <div key={index} className="flex timeline-node opacity-0 !gap-1">
            {/* Timeline line and dot container */}
            <div className="flex flex-col items-center mr-8">
              <div className="w-4 h-4 bg-blue-accent rounded-full border-4 border-charcoal flex-shrink-0" />
              {/* {index < items.length - 1 && ( */}
                <div className="w-0.5 bg-blue-accent/30 flex-1 min-h-[4rem] border-l border-blue-accent/30" />
              {/* )} */}
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <h3 className="text-xl font-heading font-bold text-blue-accent">
                  {item.company}
                </h3>
                <span className="text-green-highlight font-code text-sm">{item.years}</span>
              </div>
              <p className="text-lg font-body font-semibold text-white mb-4">{item.role}</p>
              <ul className="flex flex-col space-y-3">
                {item.responsibilities.map((resp, i) => (
                  <li key={i} className="gap-2 text-white/70 font-body text-sm flex items-start">
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

