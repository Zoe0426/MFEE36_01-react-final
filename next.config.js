/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['via.placeholder.com', 'localhost'],
  },
}

// avoid cors with proxy
// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'http://localhost:3005/api/:path*',
//       },
//     ]
//   },
// }

module.exports = nextConfig
