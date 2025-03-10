import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["openweathermap.org"], // 外部画像ホストを許可
  },
};

export default nextConfig;
