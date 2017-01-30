import createShopProductApis from './shop';
import createSupplyProductApis from './supply';

export default ({ AV, userId, sessionToken }) => ({
  ...createSupplyProductApis({ AV, userId, sessionToken }),
  ...createShopProductApis({ AV, userId, sessionToken }),
});
