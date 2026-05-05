import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    localPatterns: [
      { pathname: "/api/portrait/**" },
      { pathname: "/me*.jpg" },
      { pathname: "/me*.png" },
    ],
  },
};

export default nextConfig;
