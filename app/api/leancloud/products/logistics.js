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
import createMethods from './methods';

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

  return {
    logistics: createMethods(AV, schema, context),
  };
};
