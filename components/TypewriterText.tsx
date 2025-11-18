'use client'

import { useEffect, useRef, useState } from 'react'

interface TypewriterTextProps {
  text: string
  className?: string
  delay?: number
  speed?: number // milliseconds per character
  highlightWord?: string
  highlightColor?: string
}

export default function TypewriterText({
  text,
  className = '',
  delay = 0,
  speed = 50,
  highlightWord,
  highlightColor = 'text-green-600',
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const currentIndexRef = useRef(0)

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('')
    currentIndexRef.current = 0
    setIsTyping(false)

    // Start typing after delay
    const startDelay = setTimeout(() => {
      setIsTyping(true)
      currentIndexRef.current = 0

      const interval = setInterval(() => {
        currentIndexRef.current += 1
        if (currentIndexRef.current <= text.length) {
          setDisplayedText(text.slice(0, currentIndexRef.current))
        } else {
          setIsTyping(false)
          clearInterval(interval)
        }
      }, speed)

      intervalRef.current = interval
    }, delay)

    return () => {
      clearTimeout(startDelay)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [text, delay, speed])

  // Render text with highlighted word if specified
  const renderText = () => {
    if (!highlightWord) {
      return displayedText
    }

    const wordIndex = displayedText.indexOf(highlightWord)
    if (wordIndex === -1) {
      return displayedText
    }

    const beforeWord = displayedText.slice(0, wordIndex)
    const word = displayedText.slice(wordIndex, wordIndex + highlightWord.length)
    const afterWord = displayedText.slice(wordIndex + highlightWord.length)

    return (
      <>
        {beforeWord}
        <span className={highlightColor}>{word}</span>
        {afterWord}
      </>
    )
  }

  return (
    <div className={className}>
      {renderText()}
      {isTyping && <span className="animate-pulse">|</span>}
    </div>
  )
}

