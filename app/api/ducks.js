import { combineReducers } from 'redux';
import namespace from './namespace';
import * as initAMap from './initAMap/ducks';
import * as requestSmsCode from './requestSmsCode/ducks';
// import * as signupOrLoginWithMobilePhone from './signupOrLogin/ducks';
// import * as uploadAvatar from '../uploadAvatar/ducks';
// import * as searchDistinct from '../searchDistrict/ducks';
// import * as fetchLocation from '../fetchLocation/ducks';
// import * as fetchCatalogs from '../fetchCatalogs/ducks';
// import * as fetchCategories from '../fetchCategories/ducks';
// import * as createSpecies from '../createSpecies/ducks';
// import * as fetchSpecies from '../fetchSpecies/ducks';
// import * as fetchPriceDefinitions from '../fetchPriceDefinitions/ducks';
// import * as uploadFile from '../uploadFile/ducks';
// import * as createSpecification from '../createSpecification/ducks';
// import * as fetchSpecifications from '../fetchSpecifications/ducks';
// import * as createProduct from '../createProduct/ducks';
// import * as fetchUserProducts from '../fetchUserProducts/ducks';
// import * as fetchProduct from '../fetchProduct/ducks';
// import * as createCert from '../createCert/ducks';
// import * as updateCert from '../updateCert/ducks';
// import * as fetchCerts from '../fetchCerts/ducks';

// import * as supplyProduct from '../supplyProduct';
// import * as logisticsProduct from '../logisticsProduct';
// import * as profile from '../profile';

export default {
  [namespace]: combineReducers({
    ...initAMap.default,
    ...requestSmsCode.default,
    // ...signupOrLoginWithMobilePhone.default,
    // ...uploadAvatar.default,
    // ...searchDistinct.default,
    // ...fetchLocation.default,
    // ...fetchCatalogs.default,
    // ...fetchCategories.default,
    // ...fetchSpecies.default,
    // ...fetchPriceDefinitions.default,
    // ...uploadFile.default,
    // ...createSpecification.default,
    // ...fetchSpecifications.default,
    // ...createProduct.default,
    // ...fetchUserProducts.default,
    // ...fetchProduct.default,
    // ...createCert.default,
    // ...updateCert.default,
    // ...fetchCerts.default,
    // ...createSpecies.default,
    // ...profile.default,
    // ...supplyProduct.default,
    // ...logisticsProduct.default,
  }),
};

export const sagas = [
  ...initAMap.sagas,
  ...requestSmsCode.sagas,
  // ...signupOrLoginWithMobilePhone.sagas,
  // ...uploadAvatar.sagas,
  // ...searchDistinct.sagas,
  // ...fetchLocation.sagas,
  // ...fetchCatalogs.sagas,
  // ...fetchCategories.sagas,
  // ...fetchSpecies.sagas,
  // ...fetchPriceDefinitions.sagas,
  // ...uploadFile.sagas,
  // ...createSpecification.sagas,
  // ...fetchSpecifications.sagas,
  // ...createProduct.sagas,
  // ...fetchUserProducts.sagas,
  // ...fetchProduct.sagas,
  // ...createCert.sagas,
  // ...updateCert.sagas,
  // ...fetchCerts.sagas,
  // ...createSpecies.sagas,
  // ...profile.sagas,
  // ...supplyProduct.sagas,
  // ...logisticsProduct.sagas,
];
