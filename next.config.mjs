/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NAVER_MAP_CLIENT_ID: process.env.NAVER_CLIENT_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.localhost", // Assuming you want to capture all subdomains; adjust if needed
      },
    ],
  },
};

export default nextConfig;
