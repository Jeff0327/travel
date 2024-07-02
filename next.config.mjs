/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NAVER_MAP_CLIENT_ID: process.env.NAVER_CLIENT_ID,
  },
};

export default nextConfig;
