import { combineReducers } from 'redux';
import namespace from './namespace';
import * as initAMap from './initAMap/ducks';
import * as requestSmsCode from './requestSmsCode/ducks';
import * as signupOrLoginWithMobilePhone from './signupOrLogin/ducks';
import * as profile from './profile';
import * as uploadFile from './uploadFile/ducks';
import * as uploadAvatar from './uploadAvatar/ducks';
import * as cert from './cert';
// import * as searchDistinct from '../searchDistrict/ducks';
// import * as fetchLocation from '../fetchLocation/ducks';
// import * as fetchCatalogs from '../fetchCatalogs/ducks';
// import * as fetchCategories from '../fetchCategories/ducks';
// import * as createSpecies from '../createSpecies/ducks';
// import * as fetchSpecies from '../fetchSpecies/ducks';
// import * as fetchPriceDefinitions from '../fetchPriceDefinitions/ducks';
// import * as createSpecification from '../createSpecification/ducks';
// import * as fetchSpecifications from '../fetchSpecifications/ducks';
// import * as createProduct from '../createProduct/ducks';
// import * as fetchUserProducts from '../fetchUserProducts/ducks';
// import * as fetchProduct from '../fetchProduct/ducks';

// import * as supplyProduct from '../supplyProduct';
// import * as logisticsProduct from '../logisticsProduct';

export default {
  [namespace]: combineReducers({
    ...initAMap.default,
    ...requestSmsCode.default,
    ...signupOrLoginWithMobilePhone.default,
    ...profile.default,
    ...uploadFile.default,
    ...uploadAvatar.default,
    ...cert.default,
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
    // ...createSpecies.default,
    // ...supplyProduct.default,
    // ...logisticsProduct.default,
  }),
};

export const sagas = [
  ...initAMap.sagas,
  ...requestSmsCode.sagas,
  ...signupOrLoginWithMobilePhone.sagas,
  ...profile.sagas,
  ...uploadAvatar.sagas,
  ...uploadFile.sagas,
  ...cert.sagas,
  // ...searchDistinct.sagas,
  // ...fetchLocation.sagas,
  // ...fetchCatalogs.sagas,
  // ...fetchCategories.sagas,
  // ...fetchSpecies.sagas,
  // ...fetchPriceDefinitions.sagas,
  // ...createSpecification.sagas,
  // ...fetchSpecifications.sagas,
  // ...createProduct.sagas,
  // ...fetchUserProducts.sagas,
  // ...fetchProduct.sagas,
  // ...createSpecies.sagas,
  // ...supplyProduct.sagas,
  // ...logisticsProduct.sagas,
];
