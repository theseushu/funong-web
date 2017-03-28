import { setProducts } from 'modules/data/ducks/actions';
import { currentUserSelector, createUserProductsSelector } from 'modules/data/ducks/selectors';

const type = 'supply'

export const path = type;
export const name = 'me_supplies_page';
export const SLICE_NAME = `page_me_published_${type}`;
export const apiName = `products.${type}.search`;
export const setData = (products) => setProducts(type, products);

export const selector = (state) => {
  const user = currentUserSelector(state);
  return { products: createUserProductsSelector(type, user.objectId)(state) };
}

export const editPath = type;

export Card from 'modules/common/product/cards/supply';
