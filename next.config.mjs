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
      "c8.alamy.com", // ← add this
      "images.adsttc.com",
      "nypost.com",
      "competition.adesignaward.com",
      "api.mapbox.com",
      // add others you're using
    ],
  },
}

export default nextConfig
