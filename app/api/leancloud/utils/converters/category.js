import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';

export default (category) => {
  if (!category) {
    return undefined;
  }
  const { objectId, name, group, catalog, pinyin } = category.toJSON();
  return _omitBy({ objectId, name, group, catalog, pinyin }, _isUndefined);
};
