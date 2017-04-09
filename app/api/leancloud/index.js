/*
 * It's important to return normal JSON objects in each api method so the app won't need to know the details of the AV library
 */

import AV from 'leancloud-storage';
import { saveToCookie, loadFromCookie, clearInCookie } from './contextStorage';
import createRequestSmsCodeApi from './requestSmsCode';
import createFileApi from './file';
import createSignupOrLoginApis from './signupOrLogin';
import createProfileApis from './profile';
import createRoleApis from './role';
import createAMapApi from './amap';
import createCertApis from './cert';
import createProductsApis from './products';
import createCatalogCategorySpeciesApis from './catalogCategorySpecies';
import createCartApi from './cart';
import createShopApi from './shop';
import createCommentApi from './comment';
import createOrderApi from './order';
import createInquiryApi from './inquiry';
import createBidApi from './bid';

const debug = require('debug')('app:api'); // eslint-disable-line no-unused-vars

// TODO put these in configuration file
const APP_ID = 'ouy08OrFpGAJNxS1T69ceUH7-gzGzoHsz';
const APP_KEY = 'JNUXol0O66lg5H24kxcmcnOt';

AV._config.APIServerURL = 'http://localhost:8080'; // eslint-disable-line
AV._config.disableCurrentUser = true; // eslint-disable-line
AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
});

// const query = new AV.SearchQuery('SupplyProduct');
// query.queryString('湖北省').include(['owner']).find().then((results) => {
//   console.log('Found %d objects', query.hits());
//   //Process results
//   console.log(results);
//   console.log(query.hits());
//   console.log(query.hasMore());
// });

export default () => {
  // { token: { sessionToken, objectId, mobilePhoneNumber }, profile: {} }
  const context = loadFromCookie();
  const updateContextToken = (newToken) => {
    context.token = newToken;
    saveToCookie(context);
  };
  const updateContextProfile = (newProfile) => {
    context.profile = newProfile;
  };

  const logout = () => {
    clearInCookie();
    context.token = undefined;
    context.profile = undefined;
  };

  // const productApis = createProductsApis({ context });
  // productApis.products.supply.page({}).then((result) => console.log(result));
  const tokenExists = () => !!context.token.sessionToken;
  return {
    tokenExists,
    logout,
    ...createAMapApi(),
    requestSmsCode: createRequestSmsCodeApi({}),
    ...createSignupOrLoginApis({ context, updateContextToken }),
    ...createProfileApis({ context, updateContextProfile }),
    ...createRoleApis({ context }),
    ...createFileApi({ context, updateContextProfile }),
    ...createCertApis({ context }),
    ...createProductsApis({ context }),
    ...createCatalogCategorySpeciesApis({ context }),
    ...createCartApi({ context }),
    ...createShopApi({ context }),
    ...createCommentApi({ context }),
    ...createOrderApi({ context }),
    ...createInquiryApi({ context }),
    ...createBidApi({ context }),
  };
};
