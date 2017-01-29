import createShopProductApis from './shop';
import createSupplyProductApis from './supply';

export default ({ AV, userId, sessionToken }) => {
  return {
    ...createSupplyProductApis({ AV, userId, sessionToken }),
    ...createShopProductApis({ AV, userId, sessionToken }),
  };
};
