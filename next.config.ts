import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // configuration options from application config
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
