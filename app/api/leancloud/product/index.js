import createShopProductApis from './shop';
import createSupplyProductApis from './supply';
import createLogisticsApis from './logistics';
import createTripApis from './trip';

export default ({ AV, context }) => ({
  ...createSupplyProductApis({ AV, context }),
  ...createShopProductApis({ AV, context }),
  ...createLogisticsApis({ AV, context }),
  ...createTripApis({ AV, context }),
});
