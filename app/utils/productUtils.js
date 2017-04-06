import _isEmpty from 'lodash/isEmpty';
import _reduce from 'lodash/reduce';
import _uniq from 'lodash/uniq';
import { productTypes } from 'appConstants';
import { briefAddress } from './displayUtils';
// const debug = require('debug')('fonongweb:utils:productUtils');

const categoryToKeywords = (category) => (!category || !category.objectId) ? [] : [category.objectId];

const speciesToKeywords = (species) => (!species || !species.objectId) ? [] : [species.objectId];

const nameToKeywords = (name) => name ? [name] : [];

const specsToKeywords = (specs) => _isEmpty(specs) ? [] : _reduce(specs, (result, { params }) => _isEmpty(params) ? result : _uniq([...result, ...params]), []);

const locationToKeywords = (location) => !location || _isEmpty(location.address) ? [] : [location.address.province || '', location.address.city || '', location.address.district || ''];

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

const categoryToDisplayName = (category) => (!category || !category.name) ? [] : [category.name];

const speciesToDisplayName = (species) => (!species || !species.name) ? [] : [species.name];

const nameToDisplayName = (name) => name ? [name] : [];

const specsToDisplayName = (specs) => _isEmpty(specs) ? [] : _reduce(specs, (result, { params }) => _isEmpty(params) ? result : _uniq([...result, ...params]), []);

const locationToDisplayName = (location) => !location || _isEmpty(location.address) ? [] : [briefAddress(location.address)];

const capacityToDisplayName = (capacity) => capacity == null ? [] : [capacity.toString()];

const rangeToDisplayName = (range) => _isEmpty(range) ? [] : range;

export const generateDisplayName = (product, type) => {
  const keywords = [];
  switch (type) {
    case productTypes.supply: {
      const { category, species, name, specs, location } = product;
      keywords.push(...categoryToDisplayName(category));
      keywords.push(...speciesToDisplayName(species));
      keywords.push(...nameToDisplayName(name));
      keywords.push(...locationToDisplayName(location));
      keywords.push(...specsToDisplayName(specs));
      break;
    }
    case productTypes.logistics: {
      const { capacity, name, range, location } = product;
      keywords.push(...capacityToDisplayName(capacity));
      keywords.push(...nameToDisplayName(name));
      keywords.push(...locationToDisplayName(location));
      keywords.push(...rangeToDisplayName(range));
      break;
    }
    case productTypes.trip: {
      const { name, location } = product;
      keywords.push(...nameToDisplayName(name));
      keywords.push(...locationToDisplayName(location));
      break;
    }
    case productTypes.shop: {
      const { category, species, name, specs } = product;
      keywords.push(...categoryToDisplayName(category));
      keywords.push(...speciesToDisplayName(species));
      keywords.push(...nameToDisplayName(name));
      keywords.push(...specsToDisplayName(specs));
      break;
    }
    default: {
      const { category, species, name, specs, range, capacity, location } = product;
      keywords.push(...categoryToDisplayName(category));
      keywords.push(...speciesToDisplayName(species));
      keywords.push(...capacityToDisplayName(capacity));
      keywords.push(...nameToDisplayName(name));
      keywords.push(...locationToDisplayName(location));
      keywords.push(...rangeToDisplayName(range));
      keywords.push(...specsToDisplayName(specs));
    }
  }
  return keywords.join(' ');
};
