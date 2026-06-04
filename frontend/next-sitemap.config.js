/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.carewellmedicalcentre.com",
  generateRobotsTxt: true,
  exclude: ["/studio/*"],
};
