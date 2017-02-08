/*
 * It's important to return normal JSON objects in each api method so the app won't need to know the details of the AV library
 */

import AV from 'leancloud-storage/dist/node/index';
import createAMapApi from './amap';
import { fileToJSON } from '../utils/converters';
import createSignupOrLoginApis from './signupOrLogin';
import createCatalogCategorySpeciesApis from './catalogCategorySpecies';
import createProfileApis from './profile';
import createCertsApis from './certs';
import createProductApis from './product';

const debug = require('debug')('app:api');

// TODO put these in configuration file
const APP_ID = 'ouy08OrFpGAJNxS1T69ceUH7-gzGzoHsz';
const APP_KEY = 'JNUXol0O66lg5H24kxcmcnOt';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
  disableCurrentUser: true,
});

class Product extends AV.Object {}
AV.Object.register(Product);

class Shop extends AV.Object {}
AV.Object.register(Shop);

class Profile extends AV.Object {}
AV.Object.register(Profile);

export default (params = {}) => {
  let sessionToken = params.sessionToken;
  let userId = params.userId;
  const replaceToken = (newParams = {}) => {
    sessionToken = newParams.sessionToken;
    userId = newParams.userId;
  };

  const uploadFile = async ({ filename, file, onprogress, metaData = {} }) => {
    try {
      const fileToUpload = new AV.File(filename, file);
      Object.keys(metaData).forEach((key) => fileToUpload.metaData(key, metaData[key]));
      const requestParams = { sessionToken };
      if (onprogress) {
        requestParams.onprogress = onprogress;
      }
      const uploadedFile = await fileToUpload.save(requestParams);
      return fileToJSON(uploadedFile);
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const uploadAvatar = async ({ profileId, filename, file, onprogress }) => {
    try {
      const metaData = { owner: userId, isAvatar: true };
      const uploadedFile = await uploadFile({ filename, file, onprogress, metaData });
      await AV.Query.doCloudQuery('update Profile set avatar=pointer("_File", ?) where objectId=?', [uploadedFile.id, profileId], {
        sessionToken,
      });
      return uploadedFile;
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  // todo remove this one
  const createProduct = async ({ species, specifications, price, available, startAt, endAt, location, geopoint, desc, photos, owner }) => {
    try {
      const product = new Product();
      product.set('species', AV.Object.createWithoutData('Species', species.objectId));
      product.set('specifications', specifications.map((spec) => AV.Object.createWithoutData('Specification', spec.objectId)));
      product.set('price', price);
      product.set('available', available);
      product.set('startAt', new Date(startAt));
      product.set('endAt', new Date(endAt));
      product.set('location', location);
      product.set('geopoint', new AV.GeoPoint(geopoint));
      product.set('desc', desc);
      if (photos && photos.length > 0) {
        product.set('photos', photos.map((photo) => AV.Object.createWithoutData('_File', photo.objectId)));
      }
      product.set('owner', AV.Object.createWithoutData('_User', owner.objectId));
      const savedSpec = await product.save(null, {
        fetchWhenSave: true,
        sessionToken,
      });
      return { ...savedSpec.toJSON(), owner, specifications, species };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  // todo remove this one
  const fetchUserProducts = async () => new AV
    .Query('Product')
    .include(['species', 'specifications', 'photos'])
    .equalTo('owner', AV.Object.createWithoutData('_User', userId))
    .limit(1000)
    .find()
    .then((products) => products.map((product) => {
      const json = product.toJSON();
      const speciesJson = product.get('species').toJSON();
      const specificationsJson = product.get('specifications').map((spec) => spec.toJSON());
      const photosJson = (product.get('photos') || []).map((photo) => photo.toJSON());
      return ({
        ...json,
        owner: AV.Object.createWithoutData('_User', userId),
        species: speciesJson,
        specifications: specificationsJson,
        photos: photosJson,
        createdAt: product.get('createdAt').getTime(),
        updatedAt: product.get('updatedAt').getTime(),
        startAt: product.get('startAt').getTime(),
        endAt: product.get('endAt').getTime(),
      });
    }));

  // todo remove this one
  const fetchProduct = async ({ id }) => AV.Object.createWithoutData('Product', id)
    .fetch({
      include: ['owner', 'species', 'specifications', 'photos'],
    }, {
      sessionToken,
    })
    .then((product) => {
      const json = product.toJSON();
      const speciesJson = product.get('species').toJSON();
      const ownerJSON = product.get('owner').toJSON();
      const specificationsJson = product.get('specifications').map((spec) => spec.toJSON());
      const photosJson = (product.get('photos') || []).map((photo) => photo.toJSON());
      return ({
        ...json,
        owner: ownerJSON,
        species: speciesJson,
        specifications: specificationsJson,
        photos: photosJson,
        createdAt: product.get('createdAt').getTime(),
        updatedAt: product.get('updatedAt').getTime(),
        startAt: product.get('startAt').getTime(),
        endAt: product.get('endAt').getTime(),
      });
    });

  return {
    ...createSignupOrLoginApis({ AV, userId, sessionToken }),
    ...createCatalogCategorySpeciesApis({ AV, userId, sessionToken }),
    ...createProfileApis({ AV, userId, sessionToken }),
    ...createCertsApis({ AV, userId, sessionToken }),
    ...createProductApis({ AV, userId, sessionToken }),
    ...createAMapApi(),
    replaceToken,
    uploadFile,
    uploadAvatar,
    createProduct,
    fetchUserProducts,
    fetchProduct,
  };
};
