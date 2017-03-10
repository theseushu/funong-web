/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import { productTypes } from 'appConstants';
import createMethods from './methods';

const type = productTypes.logistics;

export default ({ AV, context }) => {
  class LogisticsProduct extends AV.Object {}
  AV.Object.register(LogisticsProduct);

  return {
    [type]: createMethods(AV, LogisticsProduct, type, context),
  };
};
