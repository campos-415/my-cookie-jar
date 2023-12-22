/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rb.gy",
        port: "",
        pathname: "/vsvv2o",
      },
    ],
  },
  // images.remotePatterns
};

module.exports = nextConfig
