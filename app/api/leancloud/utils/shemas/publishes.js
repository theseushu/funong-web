import _reduce from 'lodash/reduce';
import AV from 'leancloud-storage';
import { publishTypes } from 'funong-common/lib/appConstants';
import { attributes as attrConverters } from '../converters/publish';
const debug = require('debug')('funongweb:api:leancloud:utils:schema:publishes');

const setRequiredAttr = (product, attrName, value) => {
  if (value == null) {
    throw new Error('Required!');
  }
  product.set(attrName, value);
};

export const objectId = {
  converter: attrConverters.objectId,
};

export const createdAt = {
  converter: attrConverters.createdAt,
};

export const updatedAt = {
  converter: attrConverters.updatedAt,
};

export const status = {
  create: (product, value) => setRequiredAttr(product, 'status', value),
  update: (product, value) => setRequiredAttr(product, 'status', value),
  search: (query, value) => {
    if (value && value.length > 0) {
      query.containedIn('status', value);
    }
  },
  converter: attrConverters.status,
};

export const images = {
  create: (product, value) => {
    setRequiredAttr(product, 'images', value.map((image) => AV.Object.createWithoutData('_File', image.id)));
    setRequiredAttr(product, 'thumbnail', AV.Object.createWithoutData('_File', value[0].id));
  },
  update: (product, value) => {
    setRequiredAttr(product, 'images', value.map((image) => AV.Object.createWithoutData('_File', image.id)));
    setRequiredAttr(product, 'thumbnail', AV.Object.createWithoutData('_File', value[0].id));
  },
  include: ['images'],
  search: undefined,
  converter: attrConverters.images,
};

export const thumbnail = {
  create: null,
  update: null,
  include: ['thumbnail'],
  search: undefined,
  converter: attrConverters.thumbnail,
};

export const category = {
  create: (product, value) => setRequiredAttr(product, 'category', AV.Object.createWithoutData('Category', value.objectId)),
  update: (product, value) => {
    setRequiredAttr(product, 'category', AV.Object.createWithoutData('Category', value.objectId));
  },
  include: ['category'],
  search: (query, value) => {
    if (value) {
      query.equalTo('category', AV.Object.createWithoutData('Category', value.objectId));
    }
  },
  converter: attrConverters.category,
};

export const species = {
  create: (product, value) => setRequiredAttr(product, 'species', AV.Object.createWithoutData('Species', value.objectId)),
  update: (product, value) => {
    setRequiredAttr(product, 'species', AV.Object.createWithoutData('Species', value.objectId));
  },
  include: ['species'],
  search: (query, value) => {
    if (value) {
      query.containedIn('species', value.map((s) => AV.Object.createWithoutData('Species', s.objectId)));
    }
  },
  converter: attrConverters.species,
};

export const name = {
  create: (product, value) => setRequiredAttr(product, 'name', value),
  update: (product, value) => setRequiredAttr(product, 'name', value),
  search: undefined,
  converter: attrConverters.name,
};

export const specs = {
  create: (product, value) => {
    setRequiredAttr(product, 'specs', value);
    setRequiredAttr(product, 'minPrice', _reduce(value, (min, { price }) => Math.min(min, price), 999999));
  },
  update: (product, value) => {
    setRequiredAttr(product, 'specs', value);
    setRequiredAttr(product, 'minPrice', _reduce(value, (min, { price }) => Math.min(min, price), 999999));
  },
  search: undefined,
  converter: attrConverters.specs,
};

export const minPrice = {
  converter: attrConverters.minPrice,
};

export const capacity = {
  create: (product, value) => setRequiredAttr(product, 'capacity', value),
  update: (product, value) => setRequiredAttr(product, 'capacity', value),
  search: undefined,
  converter: attrConverters.capacity,
};

export const count = {
  create: (product, value) => setRequiredAttr(product, 'count', value),
  update: (product, value) => setRequiredAttr(product, 'count', value),
  search: undefined,
  converter: attrConverters.count,
};

export const price = {
  create: (product, value) => setRequiredAttr(product, 'price', value),
  update: (product, value) => setRequiredAttr(product, 'price', value),
  search: undefined,
  converter: attrConverters.price,
};

export const quantity = {
  create: (product, value) => setRequiredAttr(product, 'quantity', value),
  update: (product, value) => setRequiredAttr(product, 'quantity', value),
  search: undefined,
  converter: attrConverters.quantity,
};

export const startAt = {
  create: (product, value) => setRequiredAttr(product, 'startAt', new Date(value)),
  update: (product, value) => setRequiredAttr(product, 'startAt', new Date(value)),
  search: undefined,
  converter: attrConverters.startAt,
};

export const endAt = {
  create: (product, value) => setRequiredAttr(product, 'endAt', new Date(value)),
  update: (product, value) => setRequiredAttr(product, 'endAt', new Date(value)),
  search: undefined,
  converter: attrConverters.endAt,
};

export const range = {
  create: (product, value) => setRequiredAttr(product, 'range', value),
  update: (product, value) => setRequiredAttr(product, 'range', value),
  search: undefined,
  converter: attrConverters.range,
};

export const desc = {
  create: (product, value) => setRequiredAttr(product, 'desc', value),
  update: (product, value) => setRequiredAttr(product, 'desc', value),
  search: undefined,
  converter: attrConverters.desc,
};

export const labels = {
  create: (product, value) => setRequiredAttr(product, 'labels', value),
  update: (product, value) => setRequiredAttr(product, 'labels', value),
  search: (query, value) => {
    if (value && value.length > 0) {
      query.containsAll('labels', value);
    }
  },
  converter: attrConverters.labels,
};

export const location = {
  create: (product, value) => {
    const { address, lnglat } = value;
    setRequiredAttr(product, 'address', address);
    setRequiredAttr(product, 'lnglat', new AV.GeoPoint(lnglat));
  },
  update: (product, value) => {
    const { address, lnglat } = value;
    setRequiredAttr(product, 'address', address);
    setRequiredAttr(product, 'lnglat', new AV.GeoPoint(lnglat));
  },
  converter: attrConverters.location,
};

export const provinces = {
  search: (query, value) => {
    if (value && value.length > 0) {
      query.containedIn('address.province', value);
    }
  },
};

export const shopProvinces = {
  search: (query, value) => {
    if (value && value.length > 0) {
      const innerQuery = new AV.Query('Shop');
      innerQuery.containedIn('address.province', value);
      query.matchesQuery('shop', innerQuery);
    }
  },
};


export const shop = {
  create: (product, value) => setRequiredAttr(product, 'shop', AV.Object.createWithoutData('Shop', value.objectId)),
  converter: attrConverters.shop,
  search: (query, value) => {
    if (value) {
      query.equalTo('shop', AV.Object.createWithoutData('Shop', value.objectId));
    }
  },
  include: ['shop', 'shop.thumbnail'],
};

export const owner = {
  create: (product, value) => setRequiredAttr(product, 'owner', AV.Object.createWithoutData('_User', value.objectId)),
  converter: attrConverters.owner,
  search: (query, value) => {
    if (value) {
      query.equalTo('owner', AV.Object.createWithoutData('_User', value.objectId));
    }
  },
  include: ['owner', 'owner.avatar'],
};

export const original = {
  create: (product, value) => setRequiredAttr(product, 'original', AV.Object.createWithoutData('ShopProduct', value.objectId)),
  converter: attrConverters.original,
  include: [],
};

class SupplyProduct extends AV.Object {}
AV.Object.register(SupplyProduct);
class TripProduct extends AV.Object {}
AV.Object.register(TripProduct);
class ShopProduct extends AV.Object {}
AV.Object.register(ShopProduct);
class LogisticsProduct extends AV.Object {}
AV.Object.register(LogisticsProduct);
class Inquiry extends AV.Object {}
AV.Object.register(Inquiry);
class FlashSale extends AV.Object {}
AV.Object.register(FlashSale);

const schemas = {
  [publishTypes.supply]: {
    table: 'SupplyProduct',
    Class: SupplyProduct,
    attributes: {
      objectId,
      status,
      category,
      species,
      name,
      images,
      thumbnail,
      desc,
      location,
      provinces,
      specs,
      minPrice,
      labels,
      owner,
      createdAt,
      updatedAt,
    },
  },
  [publishTypes.trip]: {
    table: 'TripProduct',
    Class: TripProduct,
    attributes: {
      objectId,
      status,
      name,
      images,
      thumbnail,
      desc,
      location,
      provinces,
      specs,
      minPrice,
      labels,
      owner,
      createdAt,
      updatedAt,
    },
  },
  [publishTypes.logistics]: {
    table: 'LogisticsProduct',
    Class: LogisticsProduct,
    attributes: {
      objectId,
      status,
      capacity,
      price,
      range,
      count,
      name,
      images,
      thumbnail,
      desc,
      location,
      provinces,
      labels,
      owner,
      createdAt,
      updatedAt,
    },
  },
  [publishTypes.product]: {
    table: 'ShopProduct',
    Class: ShopProduct,
    attributes: {
      objectId,
      status,
      category,
      species,
      name,
      images,
      thumbnail,
      desc,
      specs,
      minPrice,
      labels,
      shop,
      createdAt,
      updatedAt,
      provinces: shopProvinces,
    },
  },
  [publishTypes.flashSale]: {
    table: 'FlashSale',
    Class: FlashSale,
    attributes: {
      objectId,
      status,
      category,
      species,
      name,
      images,
      thumbnail,
      desc,
      specs,
      minPrice,
      labels,
      shop,
      startAt,
      endAt,
      createdAt,
      updatedAt,
      original, // original is just an id without any information
      provinces: shopProvinces,
    },
  },
  [publishTypes.inquiry]: {
    table: 'Inquiry',
    Class: Inquiry,
    attributes: {
      objectId,
      status,
      category,
      species,
      name,
      desc,
      price,
      quantity,
      endAt,
      range,
      location,
      owner,
      createdAt,
      updatedAt,
      provinces: shopProvinces,
    },
  },
};


if (Object.keys(schemas).length !== Object.keys(publishTypes).length) {
  debug('Classes do not matches types, check it out');
}

export default schemas;
