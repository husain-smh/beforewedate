/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Allow cross-origin requests from network IP for mobile access
  allowedDevOrigins: ['192.168.31.223:3000'],
}

module.exports = nextConfig

