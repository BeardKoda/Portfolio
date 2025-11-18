'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'
import Image from 'next/image'

interface ProjectCardProps {
  title: string
  description: string
  techStack: string[]
  githubUrl?: string
  demoUrl?: string
  imageUrl?: string
  index: number
}

export default function ProjectCard({
  title,
  description,
  techStack,
  githubUrl,
  demoUrl,
  imageUrl,
  index,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: cardRef.current,
              opacity: [0, 1],
              translateY: [50, 0],
              scale: [0.9, 1],
              duration: 800,
              delay: index * 100,
              easing: 'spring(1, 80, 10, 0)',
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={cardRef}
      className="glass rounded-lg p-6 hover:border-blue-accent/50 transition-all duration-300 opacity-0"
    >
      {imageUrl && (
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <h3 className="text-xl font-heading font-bold text-blue-accent mb-2">{title}</h3>
      <p className="text-white/70 font-body text-sm mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-blue-accent/20 text-blue-accent text-xs font-code rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-highlight hover:text-green-highlight/80 font-body text-sm transition-colors"
          >
            GitHub →
          </a>
        )}
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-accent hover:text-blue-accent/80 font-body text-sm transition-colors"
          >
            Demo →
          </a>
        )}
      </div>
    </div>
  )
}

