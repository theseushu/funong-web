/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import { objectId, status, name, images, thumbnail,
  desc, location, specs, minPrice, labels, owner, createdAt, updatedAt } from './schemas';
import { create, update, fetch, search, count } from './methods';

export default ({ AV, context }) => {
  const table = 'TripProduct';
  class TripProduct extends AV.Object {}
  AV.Object.register(TripProduct);

  const schema = {
    Type: TripProduct,
    table,
    attributes: {
      objectId,
      status,
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

  const createTripProduct = async (params) => await create(AV, schema, params, context);

  const updateTripProduct = async (params) => await update(AV, schema, params, context);

  const fetchTripProduct = async (params) => await fetch(AV, schema, params, context);

  const searchTripProducts = async (params) => await search(AV, schema, params, context);

  const countTripProducts = async (params) => await count(AV, schema, params, context);

  return {
    createTripProduct,
    updateTripProduct,
    fetchTripProduct,
    searchTripProducts,
    countTripProducts,
  };
};
