/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import { objectId, status, category, species, name, images, thumbnail,
  desc, specs, minPrice, labels, shop, createdAt, updatedAt } from './schemas';
import { create, update, fetch, search, count } from './methods';

export default ({ AV, context }) => {
  const table = 'ShopProduct';
  class ShopProduct extends AV.Object {}
  AV.Object.register(ShopProduct);

  const schema = {
    Type: ShopProduct,
    table,
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
    },
  };

  const createShopProduct = async (params) => await create(AV, schema, params, context);

  const updateShopProduct = async (params) => await update(AV, schema, params, context);

  const fetchShopProduct = async (params) => await fetch(AV, schema, params, context);

  const searchShopProducts = async (params) => await search(AV, schema, params, context);

  const countShopProducts = async (params) => await count(AV, schema, params, context);

  return {
    createShopProduct,
    updateShopProduct,
    fetchShopProduct,
    searchShopProducts,
    countShopProducts,
  };
};
