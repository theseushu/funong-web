import _isArray from 'lodash/isArray';
import _isObject from 'lodash/isObject';
import _keys from 'lodash/keys';
import _fromPairs from 'lodash/fromPairs';

export const sortByKeys = function (obj) {
  if (_isArray(obj)) {
    return obj.map(sortByKeys);
  }
  if (_isObject(obj)) {
    return _fromPairs(_keys(obj).sort().map((key) => [key, sortByKeys(obj[key])]));
  }
  return obj;
};

export const generateKey = (obj) => JSON.stringify(sortByKeys(obj));
