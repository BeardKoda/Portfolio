import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'beardkoda-portfolio.sfo3.cdn.digitaloceanspaces.com',
      },
    ],
  },
}

export default nextConfig

