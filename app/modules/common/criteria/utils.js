import queryString from 'querystring';
import _isEmpty from 'lodash/isEmpty';
import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';

export const criteriaToQuery = ({ category, species, provinces, sort = {}, page, pageSize }) => {
  const query = {
    category: category ? category.objectId : undefined,
    species: _isEmpty(species) ? undefined : species,
    provinces: _isEmpty(provinces) ? undefined : provinces,
    sort: sort.sort ? sort.sort : undefined,
    order: sort.sort && sort.order ? sort.order : undefined,
    page: page || undefined,
    pageSize: pageSize || undefined,
  };
  return queryString.stringify(_omitBy(query, _isUndefined));
};

export const queryToCriteria = (query) => {
  if (!query) {
    return {};
  }
  const { category, species, provinces, sort, order, page, pageSize } = query;
  const criteria = {};
  if (category) {
    criteria.category = category; // _find(categoriesSelector(store.getState()), (c) => c.objectId === category);
  }
  if (species) {
    criteria.species = typeof species === 'string' ? [species] : species; // _find(speciesSelector(store.getState()), (s) => s.objectId === species);
  }
  if (provinces) {
    criteria.provinces = typeof provinces === 'string' ? [provinces] : provinces; // _find(speciesSelector(store.getState()), (s) => s.objectId === species);
  }
  if (provinces) {
    criteria.provinces = typeof provinces === 'string' ? [provinces] : provinces; // _find(speciesSelector(store.getState()), (s) => s.objectId === species);
  }
  if (sort) {
    criteria.sort = { sort, order };
  }
  criteria.page = page != null ? Number(page) : 1;
  criteria.pageSize = pageSize != null ? Number(pageSize) : 24;
  return criteria;
};

export const criteriaToApiParams = ({ category, species, provinces, sort = {}, page, pageSize }) => {
  const query = {
    category: category ? { objectId: category } : undefined,
    species: species ? species.map((s) => ({ objectId: s })) : undefined,
    location: { address: { provinces } },
    sort,
    page: page || undefined,
    pageSize: pageSize || undefined,
  };
  return _omitBy(query, _isUndefined);
};
