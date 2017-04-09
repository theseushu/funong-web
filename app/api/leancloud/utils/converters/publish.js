import _forEach from 'lodash/forEach';
import fileToJSON from './file';
import imagesToJSON from './images';
import lnglatToJSON from './lnglat';
import categoryToJSON from './category';
import speciesToJSON from './species';
import { embeddedUserToJSON, embeddedShopToJSON, originalProductToJSON } from './embedded';

const createConverter = (attrName, converter) => (product) => {
  const value = product.get(attrName);
  return converter ? converter(value) : value;
};

const addressConverter = createConverter('address');
const lnglatConverter = createConverter('lnglat', lnglatToJSON);

export const attributes = {
  objectId: createConverter('objectId'),
  startAt: createConverter('startAt', (date) => date.getTime()),
  endAt: createConverter('endAt', (date) => date.getTime()),
  createdAt: createConverter('createdAt', (date) => date.getTime()),
  updatedAt: createConverter('updatedAt', (date) => date.getTime()),
  status: createConverter('status'),
  images: createConverter('images', imagesToJSON),
  thumbnail: createConverter('thumbnail', fileToJSON),
  category: createConverter('category', categoryToJSON),
  species: createConverter('species', speciesToJSON),
  name: createConverter('name'),
  specs: createConverter('specs'),
  minPrice: createConverter('minPrice'),
  capacity: createConverter('capacity'),
  count: createConverter('count'),
  price: createConverter('price'),
  quantity: createConverter('quantity'),
  range: createConverter('range'),
  desc: createConverter('desc'),
  labels: createConverter('labels'),
  location: (product) => {
    const address = addressConverter(product);
    const lnglat = lnglatConverter(product);
    return { address, lnglat };
  },
  shop: createConverter('shop', embeddedShopToJSON),
  owner: createConverter('owner', embeddedUserToJSON),
  original: createConverter('original', originalProductToJSON),
};

export default (schema, product) => {
  const result = {};
  _forEach(schema.attributes, (attr, key) => {
    if (attr.converter != null) {
      result[key] = attr.converter(product);
    }
  });
  return result;
};
