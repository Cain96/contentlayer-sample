const { withContentlayer } = require("next-contentlayer");

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
};

const withPlugins = require("next-compose-plugins");
module.exports = withPlugins([withContentlayer], {
  config,
});
