/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    //平常開發使用本端
    API_SERVER: 'http://localhost:3002',
    WEB: 'http://localhost:3000',
    //發表時使用
    // SHUYI
    // API_SERVER: 'http://192.168.24.183:3002',
    // WEB: 'http://192.168.24.183:3000',
    // WS: 'ws://192.168.24.183:3002',
    // SHUYI HOME
    // API_SERVER: 'http://192.168.1.107:3002',
    // WEB: 'http://192.168.1.107:3000',
    // WS: 'ws://192.168.1.107:3002',
    //JILL
    // API_SERVER: 'http://192.168.24.19:3002',
    // WEB: 'http://192.168.24.19:3000',
    //LILY
    // API_SERVER: 'http://192.168.24.68:3002',
    // WEB: 'http://192.168.24.68:3000',
    //發表時要再後端.env檔使用
    // EMAIL_USER= gowithmeispan@gmail.com
    // EMAIL_PASSWORD= vjpthtohtzqvjbjy
  },
  images: {
    domains: ['via.placeholder.com', 'localhost'],
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
