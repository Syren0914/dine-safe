/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['maps.googleapis.com', 'nypost.com', 'images.adsttc.com', 'competition.adesignaward.com'],
  },
}
export default nextConfig
