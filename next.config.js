/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  output: 'standalone',
  trailingSlash: true,
  // Use this app as Turbopack root when a parent directory has another lockfile (e.g. ~/package-lock.json).
  turbopack: {
    root: __dirname
  }
}

module.exports = nextConfig
