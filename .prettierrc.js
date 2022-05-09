/** @type {import('prettier').Options} */
const config = {
  printWidth: 120,
  importOrder: ["^[./]", "^~/(.*)$"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

module.exports = config;
