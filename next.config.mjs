const apiUrl = new URL(
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5111/api"
);

const imageHosts = Array.from(
  new Set([apiUrl.hostname, "localhost"])
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
