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

const type = productTypes.trip;

export default ({ context }) => ({
  [type]: createMethods(type, context),
});
