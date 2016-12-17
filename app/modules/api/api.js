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

export const saveSessionTokenInCookie = (sessionToken) => {
  if (typeof window === 'object') {
    const Cookies = require('js-cookie'); // eslint-disable-line global-require
    Cookies.set('sessionToken', sessionToken);
  }
};

export const loadSessionTokenInCookie = () => {
  if (window) {
    const Cookies = require('js-cookie'); // eslint-disable-line global-require
    return Cookies.get('sessionToken');
  }
  return null;
};

export const loadSessionTokenInRequest = (req) => req.cookies.sessionToken;

export const clearSessionTokenInResponse = (resp) => {
  resp.clearCookie('sessionToken');
};

export const requestSmsCode = (...params) => AV.Cloud.requestSmsCode(...params);

export const signUpOrlogInWithMobilePhone = (...params) => AV.User.signUpOrlogInWithMobilePhone(...params);

export const fetchCatalogTypes = () => new AV.Query('CatalogType').find();

export default (initialToken) => {
  let sessionToken = initialToken;
  const replaceToken = (newToken) => {
    sessionToken = newToken;
  };

  // TODO create a leanengine function to do this in a single step
  const fetchProfile = () => AV.User.become(sessionToken).then((user) => AV.Object.createWithoutData('_User', user.id).fetch({ include: ['avatar'] }, { sessionToken }));

  const uploadAvatar = async ({ userId, filename, file, onprogress }) => {
    try {
      const fileToUpload = new AV.File(filename, file);
      fileToUpload.metaData('owner', userId);
      fileToUpload.metaData('isAvatar', true);
      const params = { sessionToken };
      if (onprogress) {
        params.onprogress = onprogress;
      }
      const uploadedFile = await fileToUpload.save(params);
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
    ...createAMapApi(),
    replaceToken,
    fetchProfile,
    uploadAvatar,
  };
};
