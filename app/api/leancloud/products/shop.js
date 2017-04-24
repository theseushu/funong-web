/*
 * important! do not deconstruct context. eg:
 * export default ({ { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import { productTypes } from 'funong-common/lib/appConstants';
import createMethods from './methods';

const type = productTypes.shop;

export default ({ context }) => ({
  [type]: createMethods(type, context),
});
