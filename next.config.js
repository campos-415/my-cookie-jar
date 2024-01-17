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
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        // pathname: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        // pathname: "",
      },
      {
        protocol: "https",
        hostname: "www.gravatar.com",
        port: "",
        // pathname: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        // pathname: "",
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
        port: "",
        // pathname: "",
      },
    ],
  },
  // images.remotePatterns
};

module.exports = nextConfig
