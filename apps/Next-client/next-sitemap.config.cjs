/** @type {import('next-sitemap').IConfig} */

const { userAgent } = require("next/server");

module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/user*" },
      { userAgent: "*", disallow: "/wishlist" },
      { userAgent: "*", disallow: "/cart" },
      { userAgent: "*", allow: "/" },
    ],
  },
  exclude: ["/user*", "/wishlist", "/cart"],
};
