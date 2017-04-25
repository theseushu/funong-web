const publishTypes = require('funong-common/lib/appConstants').publishTypes;
const SupplyList = require('./supply').default;

module.exports = {
  [publishTypes.supply]: SupplyList,
};
