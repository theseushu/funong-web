/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import { objectId, status, category, species, name, images, thumbnail,
  desc, location, specs, minPrice, labels, owner, createdAt, updatedAt } from './schemas';
import createMethods from './methods';

export default ({ AV, context }) => {
  const table = 'SupplyProduct';
  class SupplyProduct extends AV.Object {}
  AV.Object.register(SupplyProduct);

  const schema = {
    Type: SupplyProduct,
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
      location,
      specs,
      minPrice,
      labels,
      owner,
      createdAt,
      updatedAt,
    },
  };

  return {
    supply: createMethods(AV, schema, context),
  };
};
