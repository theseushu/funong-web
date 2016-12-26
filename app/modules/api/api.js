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

export const requestSmsCode = (...params) => AV.Cloud.requestSmsCode(...params);

export const signupOrLoginWithMobilePhone = (...params) => AV.User.signUpOrlogInWithMobilePhone(...params).then((user) => ({
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
  .then((results) => results.map((result) => Object.assign({}, result.toJSON())));

export const fetchSpecies = (category) => new AV.Query('Species')
  .equalTo('category', AV.Object.createWithoutData('Category', category.objectId))
  .limit(1000)
  .find()
  .then((results) => results.map((result) => Object.assign({}, result.toJSON())));

export default (params = {}) => {
  let sessionToken = params.sessionToken;
  let userId = params.userId;
  const replaceToken = (newParams = {}) => {
    sessionToken = newParams.sessionToken;
    userId = newParams.userId;
  };

  // TODO create a leanengine function to do this in a single step
  const fetchProfile = () => AV.Object.createWithoutData('_User', userId).fetch({ include: ['avatar'] }, { sessionToken })
    .then((user) => user.toJSON());

  const uploadFile = async ({ filename, file, onprogress, metaData = {} }) => {
    try {
      const fileToUpload = new AV.File(filename, file);
      Object.keys(metaData).forEach((key) => fileToUpload.metaData(key, metaData[key]));
      const requestParams = { sessionToken };
      if (onprogress) {
        requestParams.onprogress = onprogress;
      }
      const uploadedFile = await fileToUpload.save(requestParams);
      return uploadedFile.toJSON();
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const uploadAvatar = async ({ filename, file, onprogress }) => {
    try {
      const metaData = { owner: userId, isAvatar: true };
      const uploadedFile = await uploadFile({ filename, file, onprogress, metaData });
      await AV.Query.doCloudQuery('update _User set avatar=pointer("_File", ?) where objectId=?', [uploadedFile.id, userId], {
        sessionToken,
        AuthOptions: { sessionToken },
      });
      return uploadedFile;
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  return {
    requestSmsCode,
    signupOrLoginWithMobilePhone,
    fetchCatalogs,
    fetchCategories,
    fetchSpecies,
    ...createAMapApi(),
    replaceToken,
    fetchProfile,
    uploadFile,
    uploadAvatar,
    fetchPriceDefinitions,
  };
};
