const productTypes = require('funong-common/lib/appConstants').productTypes;
const SupplyList = require('./supply').default;

module.exports = {
  [productTypes.supply]: SupplyList,
};
