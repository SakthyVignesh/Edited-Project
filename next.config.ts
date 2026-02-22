import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/sources',
        destination: 'http://127.0.0.1:5000/api/sources',
      },
      {
        source: '/api/visuals',
        destination: 'http://127.0.0.1:5000/api/visuals',
      },
      {
        source: '/api/status',
        destination: 'http://127.0.0.1:5000/api/status',
      },
      {
        source: '/admin-api/:path*',
        destination: 'http://127.0.0.1:5000/api/:path*',
      },
    ]
  },
};

export default nextConfig;
