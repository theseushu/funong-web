import _isEmpty from 'lodash/isEmpty';
import _reduce from 'lodash/reduce';
import _uniq from 'lodash/uniq';
import { productTypes } from 'appConstants';
import { briefAddress } from './displayUtils';
const debug = require('debug')('fonongweb:utils:productUtils');

const categoryToKeywords = (category) => (!category || !category.name) ? [] : [category.name];

const speciesToKeywords = (species) => (!species || !species.name) ? [] : [species.name];

const nameToKeywords = (name) => name ? [name] : [];

const specsToKeywords = (specs) => _isEmpty(specs) ? [] : _reduce(specs, (result, { params }) => _isEmpty(params) ? result : _uniq([...result, ...params]), []);

const locationToKeywords = (location) => !location || _isEmpty(location.address) ? [] : [briefAddress(location.address)];

const capacityToKeywords = (capacity) => capacity == null ? [] : [capacity.toString()];

const rangeToKeywords = (range) => _isEmpty(range) ? [] : range;

export const generateKeywords = (product, type) => {
  const keywords = [];
  switch (type) {
    case productTypes.supply: {
      const { category, species, name, specs, location } = product;
      keywords.push(...categoryToKeywords(category));
      keywords.push(...speciesToKeywords(species));
      keywords.push(...nameToKeywords(name));
      keywords.push(...locationToKeywords(location));
      keywords.push(...specsToKeywords(specs));
      break;
    }
    case productTypes.logistics: {
      const { capacity, name, range, location } = product;
      keywords.push(...capacityToKeywords(capacity));
      keywords.push(...nameToKeywords(name));
      keywords.push(...locationToKeywords(location));
      keywords.push(...rangeToKeywords(range));
      break;
    }
    case productTypes.trip: {
      const { name, location } = product;
      keywords.push(...nameToKeywords(name));
      keywords.push(...locationToKeywords(location));
      break;
    }
    case productTypes.shop: {
      const { category, species, name, specs } = product;
      keywords.push(...categoryToKeywords(category));
      keywords.push(...speciesToKeywords(species));
      keywords.push(...nameToKeywords(name));
      keywords.push(...specsToKeywords(specs));
      break;
    }
    default: {
      const { category, species, name, specs, range, capacity, location } = product;
      keywords.push(...categoryToKeywords(category));
      keywords.push(...speciesToKeywords(species));
      keywords.push(...capacityToKeywords(capacity));
      keywords.push(...nameToKeywords(name));
      keywords.push(...locationToKeywords(location));
      keywords.push(...rangeToKeywords(range));
      keywords.push(...specsToKeywords(specs));
    }
  }
  return keywords.join(' ');
};
