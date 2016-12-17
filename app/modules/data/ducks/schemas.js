import { Schema, arrayOf } from 'normalizr';

export const UserSchema = new Schema('users', {
  idAttribute: 'objectId',
});

export const CatalogTypeSchema = new Schema('catalogTypes', {
  idAttribute: 'objectId',
});

export const CatalogTypesSchema = arrayOf(CatalogTypeSchema);
