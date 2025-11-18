'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'

interface NavigationButtonProps {
  onClick: () => void
  direction: 'forward' | 'backward'
  delay?: number
  className?: string
}

export default function NavigationButton({
  onClick,
  direction,
  delay = 1000,
  className = '',
}: NavigationButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.style.visibility = 'visible'
        anime({
          targets: buttonRef.current,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
          easing: 'easeOutExpo',
        })
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const isForward = direction === 'forward'
  const buttonText = isForward ? 'Continue' : 'Back'
  const arrow = isForward ? '→' : '←'
  const arrowPosition = isForward ? 'after' : 'before'

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`flex items-center justify-center !p-2 rounded-lg text-white font-body font-semibold text-lg hover:bg-green-600/20 hover:border-green-600/50 transition-all duration-300 hover:scale-105 ${className}`}
      style={{ opacity: 0, visibility: 'hidden' }}
    >
      <span className="flex items-center gap-3 m-10">
        {arrowPosition === 'before' && <span className="text-xl">{arrow}</span>}
        <span>{buttonText}</span>
        {arrowPosition === 'after' && <span className="text-xl">{arrow}</span>}
      </span>
    </button>
  )
}

