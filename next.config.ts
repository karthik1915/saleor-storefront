import type { NextConfig } from "next";
import { configData } from "@/lib/data";

const nextConfig: NextConfig = {
  /* config options here */
  // configuration options from application config
  ...configData,
};

export default nextConfig;
