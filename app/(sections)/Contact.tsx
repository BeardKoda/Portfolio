'use client'

import { useState, FormEvent } from 'react'
import anime from 'animejs'
import SectionCover from '@/components/SectionCover'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        
        // Success animation
        anime({
          targets: '.success-message',
          scale: [0.8, 1],
          opacity: [0, 1],
          duration: 500,
          easing: 'easeOutExpo',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SectionCover id="contact" className="min-h-screen">
      <section
        className="min-h-screen py-20 px-6"
      >
      <div className="max-w-2xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 relative inline-block">
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-accent animate-[underline_1s_ease-out_forwards]" />
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="glass rounded-lg p-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-white font-body font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 bg-charcoal border border-white/20 rounded-lg text-white font-body focus:outline-none focus:border-blue-accent transition-colors"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white font-body font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 bg-charcoal border border-white/20 rounded-lg text-white font-body focus:outline-none focus:border-blue-accent transition-colors"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-white font-body font-semibold mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={6}
              className="w-full px-4 py-3 bg-charcoal border border-white/20 rounded-lg text-white font-body focus:outline-none focus:border-blue-accent transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 bg-blue-accent text-white font-body font-semibold rounded-lg hover:bg-blue-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          {submitStatus === 'success' && (
            <div className="success-message text-green-highlight font-body text-center">
              Message sent successfully!
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="text-red-500 font-body text-center">
              Failed to send message. Please try again.
            </div>
          )}
        </form>
      </div>
    </section>
    </SectionCover>
  )
}

