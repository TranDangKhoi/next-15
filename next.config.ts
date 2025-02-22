import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
        port: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
        port: "4000",
      },
    ],
  },
};

export default nextConfig;
