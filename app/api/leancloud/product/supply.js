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
import { create, update, fetch, search, count } from './methods';

export default ({ AV, context }) => {
  const table = 'SupplyProduct';
  class SupplyProduct extends AV.Object {}
  AV.Object.register(SupplyProduct);

  const supplySchema = {
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

  const createSupplyProduct = async (params) => await create(AV, supplySchema, params, context);

  const updateSupplyProduct = async (params) => await update(AV, supplySchema, params, context);

  const fetchSupplyProduct = async (params) => await fetch(AV, supplySchema, params, context);

  const searchSupplyProducts = async (params) => await search(AV, supplySchema, params, context);

  const countSupplyProducts = async (params) => await count(AV, supplySchema, params, context);

  return {
    createSupplyProduct,
    updateSupplyProduct,
    fetchSupplyProduct,
    searchSupplyProducts,
    countSupplyProducts,
  };
};
