import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/data-vis',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
