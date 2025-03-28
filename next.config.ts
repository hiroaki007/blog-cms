import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    domains: ["res.cloudinary.com"], // ✅ Cloudinary のドメインを許可
  },
};


export default nextConfig;
