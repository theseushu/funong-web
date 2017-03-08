import _reduce from 'lodash/reduce';
import { categoryToJSON, speciesToJSON, imagesToJSON, embeddedShopToJSON, embeddedUserToJSON, lnglatToJSON, fileToJSON } from '../converters';

const setRequiredAttr = (product, attrName, value) => {
  if (value == null) {
    throw new Error('Required!');
  }
  product.set(attrName, value);
};
const createConverter = (attrName, converter) => (product) => {
  const value = product.get(attrName);
  return converter ? converter(value) : value;
};

export const objectId = {
  converter: createConverter('objectId'),
};

export const createdAt = {
  converter: createConverter('createdAt', (date) => date.getTime()),
};

export const updatedAt = {
  converter: createConverter('updatedAt', (date) => date.getTime()),
};

export const status = {
  converter: createConverter('status'),
};

export const images = {
  create: (AV, product, value) => {
    setRequiredAttr(product, 'images', value.map((image) => AV.Object.createWithoutData('_File', image.id)));
    setRequiredAttr(product, 'thumbnail', AV.Object.createWithoutData('_File', value[0].id));
  },
  update: (AV, product, value) => {
    setRequiredAttr(product, 'images', value.map((image) => AV.Object.createWithoutData('_File', image.id)));
    setRequiredAttr(product, 'thumbnail', AV.Object.createWithoutData('_File', value[0].id));
  },
  include: ['images'],
  search: undefined,
  converter: createConverter('images', imagesToJSON),
};

export const thumbnail = {
  create: null,
  update: null,
  include: ['thumbnail'],
  search: undefined,
  converter: createConverter('thumbnail', fileToJSON),
};

export const category = {
  create: (AV, product, value) => setRequiredAttr(product, 'category', AV.Object.createWithoutData('Category', value.objectId)),
  update: (AV, product, value) => {
    setRequiredAttr(product, 'category', AV.Object.createWithoutData('Category', value.objectId));
  },
  include: ['category'],
  search: (AV, query, value) => {
    if (value) {
      query.equalTo('category', AV.Object.createWithoutData('Category', value.objectId));
    }
  },
  converter: createConverter('category', categoryToJSON),
};

export const species = {
  create: (AV, product, value) => setRequiredAttr(product, 'species', AV.Object.createWithoutData('Species', value.objectId)),
  update: (AV, product, value) => {
    setRequiredAttr(product, 'species', AV.Object.createWithoutData('Species', value.objectId));
  },
  include: ['species'],
  search: (AV, query, value) => {
    if (value) {
      query.containedIn('species', value.map((s) => AV.Object.createWithoutData('Species', s.objectId)));
    }
  },
  converter: createConverter('species', speciesToJSON),
};

export const name = {
  create: (AV, product, value) => setRequiredAttr(product, 'name', value),
  update: (AV, product, value) => setRequiredAttr(product, 'name', value),
  search: undefined,
  converter: createConverter('name'),
};

export const specs = {
  create: (AV, product, value) => {
    setRequiredAttr(product, 'specs', value);
    setRequiredAttr(product, 'minPrice', _reduce(value, (min, { price }) => Math.min(min, price), 999999));
  },
  update: (AV, product, value) => {
    setRequiredAttr(product, 'specs', value);
    setRequiredAttr(product, 'minPrice', _reduce(value, (min, { price }) => Math.min(min, price), 999999));
  },
  search: undefined,
  converter: createConverter('specs'),
};

export const minPrice = {
  converter: createConverter('minPrice'),
};

export const capacity = {
  create: (AV, product, value) => setRequiredAttr(product, 'capacity', value),
  update: (AV, product, value) => setRequiredAttr(product, 'capacity', value),
  search: undefined,
  converter: createConverter('capacity'),
};

export const count = {
  create: (AV, product, value) => setRequiredAttr(product, 'count', value),
  update: (AV, product, value) => setRequiredAttr(product, 'count', value),
  search: undefined,
  converter: createConverter('count'),
};

export const price = {
  create: (AV, product, value) => setRequiredAttr(product, 'price', value),
  update: (AV, product, value) => setRequiredAttr(product, 'price', value),
  search: undefined,
  converter: createConverter('price'),
};

export const range = {
  create: (AV, product, value) => setRequiredAttr(product, 'range', value),
  update: (AV, product, value) => setRequiredAttr(product, 'range', value),
  search: undefined,
  converter: createConverter('range'),
};

export const desc = {
  create: (AV, product, value) => setRequiredAttr(product, 'desc', value),
  update: (AV, product, value) => setRequiredAttr(product, 'desc', value),
  search: undefined,
  converter: createConverter('desc'),
};

export const labels = {
  create: (AV, product, value) => setRequiredAttr(product, 'labels', value),
  update: (AV, product, value) => setRequiredAttr(product, 'labels', value),
  search: undefined,
  converter: createConverter('labels'),
};

export const addressConverter = createConverter('address');

export const lnglatConverter = createConverter('lnglat', lnglatToJSON);

export const location = {
  create: (AV, product, value) => {
    const { address, lnglat } = value;
    setRequiredAttr(product, 'address', address);
    setRequiredAttr(product, 'lnglat', new AV.GeoPoint(lnglat));
  },
  update: (AV, product, value) => {
    const { address, lnglat } = value;
    setRequiredAttr(product, 'address', address);
    setRequiredAttr(product, 'lnglat', new AV.GeoPoint(lnglat));
  },
  search: (AV, query, value) => {
    if (value && value.address && value.address.provinces) {
      query.containedIn('address.province', value.address.provinces);
    }
  },
  converter: (product) => {
    const address = addressConverter(product);
    const lnglat = lnglatConverter(product);
    return { address, lnglat };
  },
};

export const shopLocation = {
  search: (AV, query, value) => {
    if (value && value.address && value.address.provinces) {
      const innerQuery = new AV.Query('Shop');
      innerQuery.containedIn('address.province', value.address.provinces);
      query.matchesQuery('shop', innerQuery);
    }
  },
  converter: null,
};


export const shop = {
  create: (AV, product, value) => setRequiredAttr(product, 'shop', AV.Object.createWithoutData('Shop', value.objectId)),
  converter: createConverter('shop', embeddedShopToJSON),
  search: (AV, query, value) => {
    if (value) {
      query.equalTo('shop', AV.Object.createWithoutData('Shop', value.objectId));
    }
  },
  include: ['shop', 'shop.thumbnail'],
};

export const owner = {
  create: (AV, product, value) => setRequiredAttr(product, 'owner', AV.Object.createWithoutData('Profile', value.objectId)),
  converter: createConverter('owner', embeddedUserToJSON),
  search: (AV, query, value) => {
    if (value) {
      query.equalTo('owner', AV.Object.createWithoutData('_User', value.objectId));
    }
  },
  include: ['owner', 'owner.avatar'],
};
