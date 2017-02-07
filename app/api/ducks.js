import { combineReducers } from 'redux';
import namespace from './namespace';
import * as initAMap from './initAMap/ducks';
import * as fetchLocation from './fetchLocation/ducks';
import * as requestSmsCode from './requestSmsCode/ducks';
import * as signupOrLoginWithMobilePhone from './signupOrLogin/ducks';
import * as profile from './profile';
import * as uploadFile from './uploadFile/ducks';
import * as uploadAvatar from './uploadAvatar/ducks';
import * as cert from './cert';
import * as supplyProduct from './supplyProduct';
import * as fetchCatalogs from './fetchCatalogs/ducks';
import * as fetchCategories from './fetchCategories/ducks';
import * as createSpecies from './createSpecies/ducks';
import * as fetchSpecies from './fetchSpecies/ducks';
// import * as logisticsProduct from '../logisticsProduct';
// import * as searchDistinct from '../searchDistrict/ducks';
// import * as fetchLocation from '../fetchLocation/ducks';
// import * as fetchPriceDefinitions from '../fetchPriceDefinitions/ducks';
// import * as createSpecification from '../createSpecification/ducks';
// import * as fetchSpecifications from '../fetchSpecifications/ducks';
// import * as createProduct from '../createProduct/ducks';
// import * as fetchUserProducts from '../fetchUserProducts/ducks';
// import * as fetchProduct from '../fetchProduct/ducks';

export default {
  [namespace]: combineReducers({
    ...initAMap.default,
    ...fetchLocation.default,
    ...requestSmsCode.default,
    ...signupOrLoginWithMobilePhone.default,
    ...profile.default,
    ...uploadFile.default,
    ...uploadAvatar.default,
    ...cert.default,
    ...supplyProduct.default,
    ...fetchCatalogs.default,
    ...fetchCategories.default,
    ...fetchSpecies.default,
    ...createSpecies.default,
    // ...searchDistinct.default,
    // ...fetchPriceDefinitions.default,
    // ...uploadFile.default,
    // ...createSpecification.default,
    // ...fetchSpecifications.default,
    // ...createProduct.default,
    // ...fetchUserProducts.default,
    // ...fetchProduct.default,
    // ...logisticsProduct.default,
  }),
};

export const sagas = [
  ...initAMap.sagas,
  ...fetchLocation.sagas,
  ...requestSmsCode.sagas,
  ...signupOrLoginWithMobilePhone.sagas,
  ...profile.sagas,
  ...uploadAvatar.sagas,
  ...uploadFile.sagas,
  ...cert.sagas,
  ...supplyProduct.sagas,
  ...fetchCatalogs.sagas,
  ...fetchCategories.sagas,
  ...fetchSpecies.sagas,
  ...createSpecies.sagas,
  // ...searchDistinct.sagas,
  // ...fetchPriceDefinitions.sagas,
  // ...createSpecification.sagas,
  // ...fetchSpecifications.sagas,
  // ...createProduct.sagas,
  // ...fetchUserProducts.sagas,
  // ...fetchProduct.sagas,
  // ...logisticsProduct.sagas,
];
