import _reduce from 'lodash/reduce';
import { publishTypes } from 'appConstants';
import createMethods from './methods';

export default ({ context }) => ({
  publishes: _reduce(publishTypes, (result, type) => ({
    ...result,
    [type]: createMethods(type, context),
  }), {}),
});
