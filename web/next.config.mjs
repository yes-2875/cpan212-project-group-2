/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  agentRules: false,
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'cdn.myanimelist.net',
      port: '',
      
    }]
  },
  turbopack: {root: import.meta.dirname},
  
  async rewrites() {
    return [
      {
       source: '/api/:path*',
       destination: `${process.env.API_ORIGIN}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
