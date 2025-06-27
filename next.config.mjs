/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "c8.alamy.com",
      "images.adsttc.com",
      "nypost.com",
      "competition.adesignaward.com",
      "api.mapbox.com",
      "lh3.googleusercontent.com",
      "maps.googleapis.com",
      // add others you're using
    ],
  },
}

export default nextConfig
