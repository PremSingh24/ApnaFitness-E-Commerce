/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // Outputs a Single-Page Application (SPA).
  // distDir: "./dist", // Changes the build output directory to `./dist/`.
  images: {
    domains: ["t3.ftcdn.net"],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/api/:path*", // Proxy to Backend
      },
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
    ];
  },

  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
