import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Background from '@/components/Background'
import CustomCursor from '@/components/CustomCursor'
import LoadingWrapper from '@/components/LoadingWrapper'

export const metadata: Metadata = {
  title: 'Beardkoda — Senior DevOps & Software Engineer',
  description: 'Engineering clean systems with precision. DevOps, Backend, Cloud Architect.',
  keywords: ['DevOps', 'Software Engineering', 'Cloud Architecture', 'Backend Development'],
  authors: [{ name: 'Beardkoda' }],
  openGraph: {
    title: 'Beardkoda — Senior DevOps & Software Engineer',
    description: 'Engineering clean systems with precision.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LoadingWrapper>
          <CustomCursor />
          <Background />
          <Navbar />
          <main>{children}</main>
        </LoadingWrapper>
      </body>
    </html>
  )
}

