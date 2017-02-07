/*
 * It's important to return normal JSON objects in each api method so the app won't need to know the details of the AV library
 */

import AV from 'leancloud-storage/dist/node/index';
import { saveToCookie, loadFromCookie } from './contextStorage';
import createRequestSmsCodeApi from './requestSmsCode';
import createFileApi from './file';
import createSignupOrLoginApis from './signupOrLogin';
import createProfileApis from './profile';
import createAMapApi from './amap';
import createCertApis from './cert';
import createProductApis from './product';
import createCatalogCategorySpeciesApis from './catalogCategorySpecies';

const debug = require('debug')('app:api'); // eslint-disable-line no-unused-vars

// TODO put these in configuration file
const APP_ID = 'ouy08OrFpGAJNxS1T69ceUH7-gzGzoHsz';
const APP_KEY = 'JNUXol0O66lg5H24kxcmcnOt';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
  disableCurrentUser: true,
});

export default () => {
  // { token: { sessionToken, objectId, mobilePhoneNumber }, profile: {} }
  const context = loadFromCookie();

  const updateContextToken = (newToken) => {
    context.token = newToken;
    saveToCookie(context);
  };
  const updateContextProfile = (newProfile) => {
    context.profile = newProfile;
    saveToCookie(context);
  };

  return {
    ...createAMapApi(),
    requestSmsCode: createRequestSmsCodeApi({ AV }),
    ...createSignupOrLoginApis({ AV, context, updateContextToken }),
    ...createProfileApis({ AV, context, updateContextProfile }),
    ...createFileApi({ AV, context, updateContextProfile }),
    ...createCertApis({ AV, context }),
    ...createProductApis({ AV, context }),
    ...createCatalogCategorySpeciesApis({ AV, context }),
  };
};
