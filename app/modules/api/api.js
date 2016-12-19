/*
 * It's important to return normal JSON objects in each api method so the app won't need to know the details of the AV library
 */

import AV from 'leancloud-storage/dist/node/index';
import createAMapApi from './amap';

const debug = require('debug')('app:api');

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

export const fetchCatalogTypes = () => new AV.Query('CatalogType').find();

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

  const uploadAvatar = async ({ filename, file, onprogress }) => {
    try {
      const fileToUpload = new AV.File(filename, file);
      fileToUpload.metaData('owner', userId);
      fileToUpload.metaData('isAvatar', true);
      const requestParams = { sessionToken };
      if (onprogress) {
        requestParams.onprogress = onprogress;
      }
      const uploadedFile = await fileToUpload.save(requestParams);
      await AV.Query.doCloudQuery('update _User set avatar=pointer("_File", ?) where objectId=?', [uploadedFile.id, userId], {
        sessionToken,
        AuthOptions: { sessionToken },
      });
      return uploadedFile.toJSON();
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  return {
    requestSmsCode,
    signupOrLoginWithMobilePhone,
    fetchCatalogTypes,
    ...createAMapApi(),
    replaceToken,
    fetchProfile,
    uploadAvatar,
  };
};
