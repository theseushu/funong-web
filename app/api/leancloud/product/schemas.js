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

const objectId = {
  converter: createConverter('objectId'),
};

const createdAt = {
  converter: createConverter('createdAt', (date) => date.getTime()),
};

const updatedAt = {
  converter: createConverter('updatedAt', (date) => date.getTime()),
};

const status = {
  converter: createConverter('status'),
};

const images = {
  create: (AV, product, value) => {
    setRequiredAttr(product, 'images', value.map((image) => AV.Object.createWithoutData('_File', image.id)));
    setRequiredAttr(product, 'thumbnail', AV.Object.createWithoutData('_File', value[0].id));
  },
  update: (AV, product, value) => {
    setRequiredAttr(product, 'images', value.map((image) => AV.Object.createWithoutData('_File', image.id)));
    setRequiredAttr(product, 'thumbnail', AV.Object.createWithoutData('_File', value[0].id));
  },
  search: undefined,
  converter: createConverter('images', imagesToJSON),
};

const thumbnail = {
  create: null,
  update: null,
  search: undefined,
  converter: createConverter('thumbnail', fileToJSON),
};

const category = {
  create: (AV, product, value) => setRequiredAttr(product, 'category', AV.Object.createWithoutData('Category', value.objectId)),
  update: (AV, product, value) => {
    setRequiredAttr(product, 'category', AV.Object.createWithoutData('Category', value.objectId));
  },
  search: (AV, query, value) => {
    if (value) {
      query.equalTo('category', AV.Object.createWithoutData('Category', value.objectId));
    }
  },
  converter: createConverter('category', categoryToJSON),
};

const species = {
  create: (AV, product, value) => setRequiredAttr(product, 'species', AV.Object.createWithoutData('Species', value.objectId)),
  update: (AV, product, value) => {
    setRequiredAttr(product, 'species', AV.Object.createWithoutData('Species', value.objectId));
  },
  search: (AV, query, value) => {
    if (value) {
      query.equalTo('species', AV.Object.createWithoutData('Species', value.objectId));
    }
  },
  converter: createConverter('species', speciesToJSON),
};

const name = {
  create: (AV, product, value) => setRequiredAttr(product, 'name', value),
  update: (AV, product, value) => setRequiredAttr(product, 'name', value),
  search: undefined,
  converter: createConverter('name'),
};

const specs = {
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

const minPrice = {
  converter: createConverter('minPrice'),
};

const desc = {
  create: (AV, product, value) => setRequiredAttr(product, 'desc', value),
  update: (AV, product, value) => setRequiredAttr(product, 'desc', value),
  search: undefined,
  converter: createConverter('desc'),
};

const labels = {
  create: (AV, product, value) => setRequiredAttr(product, 'labels', value),
  update: (AV, product, value) => setRequiredAttr(product, 'labels', value),
  search: undefined,
  converter: createConverter('labels'),
};

const addressConverter = createConverter('address');

const lnglatConverter = createConverter('lnglat', lnglatToJSON);

const location = {
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
  search: undefined,
  converter: (product) => {
    const address = addressConverter(product);
    const lnglat = lnglatConverter(product);
    return { address, lnglat };
  },
};

const shop = {
  create: (AV, product, value) => setRequiredAttr(product, 'shop', AV.Object.createWithoutData('Shop', value.objectId)),
  converter: (value) => ({ location: createConverter('shop', embeddedShopToJSON)(value) }),
};

const owner = {
  create: (AV, product, value) => setRequiredAttr(product, 'owner', AV.Object.createWithoutData('Profile', value.objectId)),
  converter: (value) => ({ location: createConverter('owner', embeddedUserToJSON)(value) }),
};

export const supplySchema = {
  objectId, status, category, species, name, images, thumbnail, desc, location, specs, minPrice, labels, owner, createdAt, updatedAt,
};

export const shopSchema = {
  objectId, status, category, species, name, images, thumbnail, desc, location, specs, minPrice, labels, shop,
};
