import { Schema, arrayOf } from 'normalizr';

export const UserSchema = new Schema('users', {
  idAttribute: 'objectId',
});

export const CatalogSchema = new Schema('catalogs', {
  idAttribute: 'objectId',
});

export const CatalogsSchema = arrayOf(CatalogSchema);
