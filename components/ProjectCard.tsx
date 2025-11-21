'use client'

import { useEffect, useRef, useState } from 'react'
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
  title, description, techStack, githubUrl, demoUrl, imageUrl, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

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

  // Generate a gradient background based on title for preview if no image
  const getPreviewGradient = () => {
    const colors = [
      'from-blue-accent/30 to-green-600/30',
      'from-green-600/30 to-blue-accent/30',
      'from-purple-600/30 to-blue-accent/30',
      'from-blue-accent/30 to-purple-600/30',
      'from-green-600/30 to-purple-600/30',
      'from-purple-600/30 to-green-600/30',
    ]
    return colors[index % colors.length]
  }

  return (
    <div
      ref={cardRef}
      className="glass rounded-lg overflow-hidden hover:border-blue-accent/50 transition-all duration-300 opacity-0 group cursor-pointer p-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Preview Image/Visual */}
      <div className="relative w-full h-76 aspect-video overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${getPreviewGradient()} flex items-center justify-center`}>
            <div className="text-6xl font-bold text-white/20">{title.charAt(0)}</div>
          </div>
        )}
        
        {/* Hover Overlay - Content slides up from bottom */}
        <div
          className={`flex flex-col absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent justify-end transition-all duration-500 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Content Container with Padding */}
          <div className="flex flex-col !p-8 gap-4">
            {/* Title and Description */}
            <div className={`flex flex-col gap-2 transition-all duration-500 delay-100 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <h3 className="text-2xl font-heading font-bold text-white">{title}</h3>
              <p className="text-white/90 font-body text-sm line-clamp-2">
                {description}
              </p>
            </div>

            {/* Live Preview Button */}
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3 rounded-lg text-white font-body font-semibold text-base hover:bg-green-600/20 hover:border-green-600/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 w-full ${
                  isHovered ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-4 opacity-0'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <span>View</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

