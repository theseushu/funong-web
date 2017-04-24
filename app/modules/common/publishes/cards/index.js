const publishTypes = require('funong-common/lib/appConstants').publishTypes;
const Supply = require('./supply').default;
const SupplyBrief = require('./supplyBrief').default;
const Logistics = require('./logistics').default;
const LogisticsBrief = require('./logisticsBrief').default;
const Trip = require('./trip').default;
const TripBrief = require('./tripBrief').default;
const Product = require('./product').default;
const ProductBrief = require('./productBrief').default;
const FlashSale = require('./flashSale').default;
const FlashSaleBrief = require('./flashSaleBrief').default;


module.exports = {
  [publishTypes.supply]: {
    card: Supply,
    briefCard: SupplyBrief,
  },
  [publishTypes.logistics]: {
    card: Logistics,
    briefCard: LogisticsBrief,
  },
  [publishTypes.trip]: {
    card: Trip,
    briefCard: TripBrief,
  },
  [publishTypes.product]: {
    card: Product,
    briefCard: ProductBrief,
  },
  [publishTypes.flashSale]: {
    card: FlashSale,
    briefCard: FlashSaleBrief,
  },
};
