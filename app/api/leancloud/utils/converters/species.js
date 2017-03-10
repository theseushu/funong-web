import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';
import categoryToJSON from './category';

export default (species) => {
  if (!species) {
    return undefined;
  }
  const { objectId, name } = species.toJSON();
  const category = categoryToJSON(species.get('category'));
  return _omitBy({ objectId, name, category }, _isUndefined);
};
