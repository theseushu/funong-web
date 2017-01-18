/*
 * It's important to return normal JSON objects in each api method so the app won't need to know the details of the AV library
 */

import AV from 'leancloud-storage/dist/node/index';
import createAMapApi from './amap';

const debug = require('debug')('app:api');

// TODO put these in configuration file
const APP_ID = 'ouy08OrFpGAJNxS1T69ceUH7-gzGzoHsz';
const APP_KEY = 'JNUXol0O66lg5H24kxcmcnOt';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
  disableCurrentUser: true,
});

class Specification extends AV.Object {}
AV.Object.register(Specification);

class Product extends AV.Object {}
AV.Object.register(Product);

class Shop extends AV.Object {}
AV.Object.register(Shop);

class Profile extends AV.Object {}
AV.Object.register(Profile);

export const requestSmsCode = (...params) => AV.Cloud.requestSmsCode(...params);

export const signupOrLoginWithMobilePhone = (...params) => AV.User.signUpOrlogInWithMobilePhone(...params).then((user) => ({
  sessionToken: user.getSessionToken(),
  userId: user.get('objectId'),
}));

export const login = (...params) => AV.User.logIn(...params).then((user) => ({
  sessionToken: user.getSessionToken(),
  userId: user.get('objectId'),
}));

// TODO deal with empty catalogType
export const fetchPriceDefinitions = () => new AV.Query('PriceDefinition').find()
  .then((results) => results.map((result) => Object.assign({}, result.toJSON())));

// TODO deal with empty catalogType
export const fetchCatalogs = () => new AV.Query('Catalog').include(['catalogType']).find()
  .then((results) => results.map((result) => Object.assign({}, result.toJSON())));

export const fetchCategories = (catalog) => new AV.Query('Category')
  .equalTo('catalog', AV.Object.createWithoutData('Catalog', catalog.objectId))
  .addAscending('name')
  .limit(1000)
  .find()
  .then((results) => results.map((result) => {
    const json = result.toJSON();
    return ({ ...json, catalog: { objectId: json.catalog.objectId } });
  }));

export const fetchSpecies = (category) => new AV.Query('Species')
  .equalTo('category', AV.Object.createWithoutData('Category', category.objectId))
  .limit(1000)
  .find()
  .then((results) => results.map((result) => {
    const json = result.toJSON();
    return ({ ...json, category: { objectId: json.category.objectId } });
  }));

export const fetchSpecifications = ({ species }) => new AV.Query('Specification')
  .equalTo('species', AV.Object.createWithoutData('Species', species.objectId))
  .limit(1000)
  .find()
  .then((results) => results.map((result) => {
    const json = result.toJSON();
    return ({ ...json, species: { objectId: json.species.objectId } });
  }));

export default (params = {}) => {
  let sessionToken = params.sessionToken;
  let userId = params.userId;
  const replaceToken = (newParams = {}) => {
    sessionToken = newParams.sessionToken;
    userId = newParams.userId;
  };

  // TODO create a leanengine function to do this in a single step
  // const fetchProfile = () => AV.Object.createWithoutData('_User', userId).fetch({ include: ['profile', 'profile.avatar'] }, { sessionToken })
  //   .then((user) => ({
  //     ...user.toJSON(),
  //     profile: user.get('profile') ? { ...user.get('profile').toJSON() } : null,
  //   }));

  const fetchProfile = async () => {
    const user = await AV.Object.createWithoutData('_User', userId).fetch({ include: ['profile', 'profile.avatar', 'profile.desc.images'] }, { sessionToken });
    const result = { ...user.toJSON() };
    const avProfile = user.get('profile');
    if (avProfile) {
      const avAvatar = avProfile.get('avatar');
      const avatar = avAvatar ? avAvatar.toJSON() : undefined;
      const avDesc = avProfile.get('desc') || {};
      const desc = { ...avDesc, images: avDesc.images ? avDesc.images.map((image) => ({ ...image.toJSON(), metaData: image.get('metaData') })) : [] };
      result.profile = { ...avProfile.toJSON(), avatar, desc };
    }
    return result;
  };

  const createProfile = async ({ type }) => {
    const profile = new Profile();
    profile.set('type', type);
    const requestParams = { sessionToken };
    const savedProfile = await profile.save(null, requestParams);
    await AV.Query.doCloudQuery('update _User set profile=pointer("Profile", ?) where objectId=?', [savedProfile.id, userId], {
      fetchWhenSave: true,
      sessionToken,
    });
    return savedProfile.toJSON();
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
      return { ...uploadedFile.toJSON(), metaData: uploadedFile.get('metaData') };
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

  const updateProfile = async ({ profileId, desc, ...attrs }) => {
    try {
      const profile = AV.Object.createWithoutData('Profile', profileId);
      const attributes = { ...attrs };
      if (desc) {
        if (desc.images) {
          profile.set('desc', { ...desc, images: desc.images.map((image) => AV.Object.createWithoutData('_File', image.id)) });
        } else {
          profile.set('desc', desc);
        }
      }
      profile.save(attributes, { sessionToken });
      return attrs;
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const createSpecification = async ({ species, creator, name }) => {
    try {
      const spec = new Specification();
      spec.set('species', AV.Object.createWithoutData('Species', species.objectId));
      spec.set('name', name);
      spec.set('creator', AV.Object.createWithoutData('_User', creator.objectId));
      const savedSpec = await spec.save(null, {
        fetchWhenSave: true,
        sessionToken,
      });
      return { ...savedSpec.toJSON(), species };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

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

  const fetchUserProducts = async ({ user }) => new AV
      .Query('Product')
      .include(['species', 'specifications', 'photos'])
      .equalTo('owner', AV.Object.createWithoutData('_User', user.objectId))
      .limit(1000)
      .find()
      .then((products) => products.map((product) => {
        const json = product.toJSON();
        const speciesJson = product.get('species').toJSON();
        const specificationsJson = product.get('specifications').map((spec) => spec.toJSON());
        const photosJson = (product.get('photos') || []).map((photo) => photo.toJSON());
        return ({
          ...json,
          owner: user,
          species: speciesJson,
          specifications: specificationsJson,
          photos: photosJson,
          createdAt: product.get('createdAt').getTime(),
          updatedAt: product.get('updatedAt').getTime(),
          startAt: product.get('startAt').getTime(),
          endAt: product.get('endAt').getTime(),
        });
      }));

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
    requestSmsCode,
    signupOrLoginWithMobilePhone,
    login,
    fetchCatalogs,
    fetchCategories,
    fetchSpecies,
    ...createAMapApi(),
    replaceToken,
    fetchProfile,
    createProfile,
    uploadFile,
    uploadAvatar,
    updateProfile,
    fetchPriceDefinitions,
    fetchSpecifications,
    createSpecification,
    createProduct,
    fetchUserProducts,
    fetchProduct,
  };
};
