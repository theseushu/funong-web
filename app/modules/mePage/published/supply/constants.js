import _find from 'lodash/find';
import { setProducts } from 'modules/data/ducks/actions';
import { createProductsSelector } from 'modules/data/ducks/selectors';
import { productTypes } from 'appConstants';

const type = productTypes.supply;

export default type;

export const path = type;
export const name = 'me_supplies_page';
export const SLICE_NAME = `page_me_published_${type}`;
export const apiName = `products.${type}.page`;
export const setData = (products) => setProducts(type, products);
export const selectFromData = (state, ids) => {
  const products = createProductsSelector(type)(state);
  return ids.map((id) => _find(products, (p) => p.objectId === id));
};

export const editPath = type;

export Card from 'modules/common/product/cards/supply';
