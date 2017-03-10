/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import { categoryToJSON, speciesToJSON } from '../utils/converters';
const debug = require('debug')('app:api:catalogCategorySpecies');

export default ({ AV, context }) => {
  class Species extends AV.Object {}
  AV.Object.register(Species);

  const fetchCategory = ({ objectId }) => AV.Object.createWithoutData('Category', objectId)
    .fetch()
    .then((result) => result ? categoryToJSON(result) : null);

  const fetchCategories = (catalogs) => new AV.Query('Category')
    .containedIn('catalog', catalogs)
    .addAscending('ordinal')
    .limit(1000)
    .find()
    .then((results) => results.map(categoryToJSON));

  const fetchSpeciesById = (objectId) => AV.Object.createWithoutData('Species', objectId)
    .fetch({
      include: ['category'],
    })
    .then(speciesToJSON);

  const fetchSpecies = (category) => new AV.Query('Species')
    .equalTo('category', AV.Object.createWithoutData('Category', category.objectId))
    .include(['category'])
    .limit(1000)
    .find()
    .then((results) => results.map(speciesToJSON));

  const createSpecies = async ({ category, name }) => {
    const { token: { sessionToken }, profile } = context;
    try {
      const species = new Species();
      species.set('category', AV.Object.createWithoutData('Category', category.objectId));
      species.set('name', name);
      species.set('creator', AV.Object.createWithoutData('Profile', profile.objectId));
      const savedSpecies = await species.save(null, {
        fetchWhenSave: true,
        sessionToken,
      });
      return speciesToJSON({ ...savedSpecies, category });
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  return {
    fetchCategory,
    fetchCategories,
    fetchSpeciesById,
    fetchSpecies,
    createSpecies,
  };
};
