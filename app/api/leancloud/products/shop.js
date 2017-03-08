/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import { objectId, status, category, species, name, images, thumbnail,
  desc, specs, minPrice, labels, shop, shopLocation, createdAt, updatedAt } from './schemas';
import createMethods from './methods';

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
      location: shopLocation,
    },
  };

  return {
    shop: createMethods(AV, schema, context),
  };
};
