/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // Outputs a Single-Page Application (SPA).

  // distDir: "./dist", // Changes the build output directory to `./dist/`.
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
