'use client'

import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
}

export default function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!textRef.current || isAnimating) return

    setIsAnimating(true)
    // Use Array.from() to properly handle emojis and Unicode characters
    const chars = Array.from(text).map((char) => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.display = 'inline-block'
      span.style.opacity = '0'
      return span
    })

    textRef.current.innerHTML = ''
    chars.forEach((char) => textRef.current?.appendChild(char))

    anime({
      targets: chars,
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(50, { start: delay }),
      duration: 800,
      easing: 'easeOutExpo',
      complete: () => {
        // Ensure all characters are visible after animation
        chars.forEach((char) => {
          char.style.opacity = '1'
        })
      },
    })
  }, [text, delay, isAnimating])

  return <div ref={textRef} className={className} />
}

