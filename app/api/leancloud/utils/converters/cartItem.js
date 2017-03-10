import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';
import _find from 'lodash/find';
import { productTypes } from 'appConstants';
import productToJSON from './product';
import { products as schemas } from '../shemas';

export default (cartItem) => {
  if (!cartItem) {
    return null;
  }
  const typeProductPairs = Object.values(productTypes).map((t) => ({ type: t, avProduct: cartItem.get(`${t}Product`) }));
  const { type, avProduct } = _find(typeProductPairs, (typeProductPair) => !!typeProductPair.avProduct);
  const product = productToJSON(schemas[type], avProduct);

  const avOwner = cartItem.get('owner');
  const owner = avOwner ? avOwner.toJSON() : null;

  const createdAt = cartItem.get('createdAt').getTime();
  const updatedAt = cartItem.get('updatedAt').getTime();

  return _omitBy({ ...cartItem.toJSON(), owner, [`${type}Product`]: product, createdAt, updatedAt }, _isUndefined);
};
