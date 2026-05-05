import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  //images: {
  //  unoptimized: true, // Disable default image optimization
  //},
  //assetPrefix: isProd ? '/cogs-125-nodejs/' : '',
  //basePath: isProd ? '/cogs-125-nodejs' : '',
  //output: 'export',
  //trailingSlash: true,
};

export default nextConfig;