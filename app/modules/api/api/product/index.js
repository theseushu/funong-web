import createShopProductApis from './shop';
import createSupplyProductApis from './supply';
import createLogisticsApis from './logistics';

export default ({ AV, userId, sessionToken }) => ({
  ...createSupplyProductApis({ AV, userId, sessionToken }),
  ...createShopProductApis({ AV, userId, sessionToken }),
  ...createLogisticsApis({ AV, userId, sessionToken }),
});
