/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
const debug = require('debug')('app:api:catalogCategorySpecies');

export default ({ AV, context }) => {
  class Species extends AV.Object {}
  AV.Object.register(Species);

// TODO deal with empty catalogType
  const fetchCatalogs = () => new AV.Query('Catalog').find()
    .then((results) => results.map((result) => Object.assign({}, result.toJSON())));

  const fetchCategories = (catalog) => new AV.Query('Category')
    .equalTo('catalog', AV.Object.createWithoutData('Catalog', catalog.objectId))
    .addAscending('name')
    .limit(1000)
    .find()
    .then((results) => results.map((result) => {
      const json = result.toJSON();
      return ({ ...json, catalog: { objectId: json.catalog.objectId } });
    }));

  const fetchSpecies = (category) => new AV.Query('Species')
    .equalTo('category', AV.Object.createWithoutData('Category', category.objectId))
    .limit(1000)
    .find()
    .then((results) => results.map((result) => {
      const json = result.toJSON();
      return ({ ...json, category: { objectId: json.category.objectId } });
    }));

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
      return { ...savedSpecies.toJSON(), category };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  return {
    fetchCatalogs,
    fetchCategories,
    fetchSpecies,
    createSpecies,
  };
};
