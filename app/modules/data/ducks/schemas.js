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
});

export const SpeciesSchema = new Schema('species', {
  idAttribute: 'objectId',
});
SpeciesSchema.define({
  category: CategorySchema,
});

export const SpecificationSchema = new Schema('specifications', {
  idAttribute: 'objectId',
});
SpecificationSchema.define({
  species: SpeciesSchema,
});

export const ProductSchema = new Schema('products', {
  idAttribute: 'objectId',
});
ProductSchema.define({
  owner: UserSchema,
  species: SpeciesSchema,
  specifications: SpecificationsSchema,
});

export const CertSchema = new Schema('certs', {
  idAttribute: 'objectId',
});
CertSchema.define({
  user: UserSchema,
});

export const CatalogsSchema = arrayOf(CatalogSchema);

export const CategoriesSchema = arrayOf(CategorySchema);

export const SpeciesArraySchema = arrayOf(SpeciesSchema);

export const SpecificationsSchema = arrayOf(SpecificationSchema);

export const ProductsSchema = arrayOf(ProductSchema);

export const CertsSchema = arrayOf(CertSchema);
