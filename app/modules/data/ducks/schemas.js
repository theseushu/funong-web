import { Schema, arrayOf } from 'normalizr';

export const UserSchema = new Schema('users', {
  idAttribute: 'objectId',
});

export const CatalogSchema = new Schema('catalogs', {
  idAttribute: 'objectId',
});

export const CategorySchema = new Schema('categories', {
  idAttribute: 'objectId',
});
CategorySchema.define({
  catalog: CatalogSchema,
})

export const SpeciesSchema = new Schema('species', {
  idAttribute: 'objectId',
});
SpeciesSchema.define({
  category: CategorySchema,
})

export const CatalogsSchema = arrayOf(CatalogSchema);

export const CategoriesSchema = arrayOf(CategorySchema);

export const SpeciesArraySchema = arrayOf(SpeciesSchema);
