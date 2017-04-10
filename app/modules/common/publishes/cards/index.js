import { publishTypes } from 'appConstants';
import Supply from './supply';
import SupplyBrief from './supplyBrief';
import Logistics from './logistics';
import LogisticsBrief from './logisticsBrief';
import Trip from './trip';
import TripBrief from './tripBrief';
import Product from './product';
import ProductBrief from './productBrief';
import FlashSale from './flashSale';
import FlashSaleBrief from './flashSaleBrief';


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
