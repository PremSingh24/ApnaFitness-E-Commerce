/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["common"],
  trailingSlash: true,

  async rewrites() {
    return [
      {
        source: "/home",
        destination: "/",
      },
      {
        source: "/homepage",
        destination: "/",
      },
      {
        source: "/allProducts",
        destination: "/products",
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/user",
        destination: "/user/profile",
        permanent: true,
      },
      {
        source: "/user/myOrders/",
        destination: "/user/orders",
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
