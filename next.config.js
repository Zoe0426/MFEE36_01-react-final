/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_SERVER: 'http://localhost:3002',
  },
  images: {
    domains: ['via.placeholder.com', 'localhost'],
  },
<<<<<<<<< Temporary merge branch 1
  env: {
    API_SERVER: 'http://localhost:3002',
  },
  // avoid cors with proxy
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:3005/:path*', // Proxy to Backend
  //     },
  //   ]
  // },
};

module.exports = nextConfig;
