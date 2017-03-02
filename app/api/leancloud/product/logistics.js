/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import { objectId, status, capacity, price, range, count, name, images, thumbnail,
  desc, location, labels, owner, createdAt, updatedAt } from './schemas';
import { create, update, fetch, search, count as methodCount } from './methods';

export default ({ AV, context }) => {
  const table = 'LogisticsProduct';
  class LogisticsProduct extends AV.Object {}
  AV.Object.register(LogisticsProduct);

  const schema = {
    Type: LogisticsProduct,
    table,
    attributes: {
      objectId,
      status,
      capacity,
      price,
      range,
      count,
      name,
      images,
      thumbnail,
      desc,
      location,
      labels,
      owner,
      createdAt,
      updatedAt,
    },
  };

  const createLogisticsProduct = async (params) => await create(AV, schema, params, context);

  const updateLogisticsProduct = async (params) => await update(AV, schema, params, context);

  const fetchLogisticsProduct = async (params) => await fetch(AV, schema, params, context);

  const searchLogisticsProducts = async (params) => await search(AV, schema, params, context);

  const countLogisticsProducts = async (params) => await methodCount(AV, schema, params, context);

  return {
    createLogisticsProduct,
    updateLogisticsProduct,
    fetchLogisticsProduct,
    searchLogisticsProducts,
    countLogisticsProducts,
  };
};
