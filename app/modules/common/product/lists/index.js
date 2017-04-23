const productTypes = require('appConstants').productTypes;
const SupplyList = require('./supply').default;

module.exports = {
  [productTypes.supply]: SupplyList,
};
