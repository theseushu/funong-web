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
import createMethods from './methods';

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

  return {
    trip: createMethods(AV, schema, context),
  };
};
