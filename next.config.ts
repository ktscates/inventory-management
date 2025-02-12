import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enables static export
  trailingSlash: true, // Ensures proper file paths in Netlify
};

export default nextConfig;
