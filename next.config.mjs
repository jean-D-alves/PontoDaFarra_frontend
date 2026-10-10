/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5111",
        pathname: "/imagens/**",
      },
    ],
  },
};

export default nextConfig;
