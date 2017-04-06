import _reduce from 'lodash/reduce';
import AV from 'leancloud-storage';
import { productTypes } from 'appConstants';
import { productTables } from '../../constants';
import { attributes as attrConverters } from '../converters/product';

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
  search: (query, value) => {
    if (value && value.address && value.address.provinces) {
      query.containedIn('address.province', value.address.provinces);
    }
  },
  converter: attrConverters.location,
};

export const shopLocation = {
  search: (query, value) => {
    if (value && value.address && value.address.provinces) {
      const innerQuery = new AV.Query('Shop');
      innerQuery.containedIn('address.province', value.address.provinces);
      query.matchesQuery('shop', innerQuery);
    }
  },
  converter: attrConverters.shopLocation,
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

class SupplyProduct extends AV.Object {}
AV.Object.register(SupplyProduct);
class TripProduct extends AV.Object {}
AV.Object.register(TripProduct);
class ShopProduct extends AV.Object {}
AV.Object.register(ShopProduct);
class LogisticsProduct extends AV.Object {}
AV.Object.register(LogisticsProduct);

export default {
  [productTypes.supply]: {
    type: productTypes.supply,
    table: productTables[productTypes.supply],
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
      specs,
      minPrice,
      labels,
      owner,
      createdAt,
      updatedAt,
    },
  },
  [productTypes.trip]: {
    type: productTypes.trip,
    table: productTables[productTypes.trip],
    Class: TripProduct,
    attributes: {
      objectId,
      status,
      name,
      images,
      thumbnail,
      desc,
      location,
      specs,
      minPrice,
      labels,
      owner,
      createdAt,
      updatedAt,
    },
  },
  [productTypes.logistics]: {
    type: productTypes.logistics,
    table: productTables[productTypes.logistics],
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
      labels,
      owner,
      createdAt,
      updatedAt,
    },
  },
  [productTypes.shop]: {
    type: productTypes.shop,
    table: productTables[productTypes.shop],
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
      location: shopLocation,
    },
  },
};
