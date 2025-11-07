import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async header() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'referrer-policy', value: 'no-referrer' }
        ]
      }
    ];
  }
};

export default nextConfig;
