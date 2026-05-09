import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
     remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.yandexcloud.net",
      },
      {
        protocol: "http",
        hostname: "storage.yandexcloud.net",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "http",
        hostname: "84.252.132.83",
      },
      {
        protocol: "https",
        hostname: "84.252.132.83",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
    ],
  },
};

export default nextConfig;
