const apiUrl = new URL(
  process.env.NEXT_PUBLIC_API_URL
);

const imageHosts = Array.from(
  new Set([apiUrl.hostname, "pontodafarra.onrender.com"])
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: imageHosts.flatMap((hostname) =>
      ["http", "https"].map((protocol) => ({
        protocol,
        hostname,
        pathname: "/imagens/**",
      }))
    ),
  },
};

export default nextConfig;