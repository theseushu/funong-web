import queryString from 'querystring';
import _isEmpty from 'lodash/isEmpty';
import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';

export const criteriaToQuery = ({ category, species, provinces, sort }) => {
  const query = {
    category: category ? category.objectId : undefined,
    species: _isEmpty(species) ? undefined : species,
    provinces: _isEmpty(provinces) ? undefined : provinces,
    sort: _isEmpty(sort) ? undefined : sort,
  };
  return queryString.stringify(_omitBy(query, _isUndefined));
};
