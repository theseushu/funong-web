import { combineReducers } from 'redux';
import namespace from './namespace';
import * as initAMap from './initAMap/ducks';
import * as fetchLocation from './fetchLocation/ducks';
import * as requestSmsCode from './requestSmsCode/ducks';
import * as signupOrLoginWithMobilePhone from './signupOrLogin/ducks';
import * as role from './role';
import * as profile from './profile';
import * as uploadFile from './uploadFile/ducks';
import * as uploadAvatar from './uploadAvatar/ducks';
import * as cert from './cert';
import * as supplyProduct from './supplyProduct';
import * as fetchCatalogs from './fetchCatalogs/ducks';
import * as fetchCategories from './fetchCategories/ducks';
import * as createSpecies from './createSpecies/ducks';
import * as fetchSpecies from './fetchSpecies/ducks';
import * as logisticsProduct from './logisticsProduct';
import * as cart from './cart';
import * as shop from './shop';
import * as searchDistinct from './searchDistrict/ducks';

export default {
  [namespace]: combineReducers({
    ...initAMap.default,
    ...fetchLocation.default,
    ...requestSmsCode.default,
    ...signupOrLoginWithMobilePhone.default,
    ...profile.default,
    ...role.default,
    ...uploadFile.default,
    ...uploadAvatar.default,
    ...cert.default,
    ...supplyProduct.default,
    ...fetchCatalogs.default,
    ...fetchCategories.default,
    ...fetchSpecies.default,
    ...createSpecies.default,
    ...logisticsProduct.default,
    ...cart.default,
    ...shop.default,
    ...searchDistinct.default,
  }),
};

export const sagas = [
  ...initAMap.sagas,
  ...fetchLocation.sagas,
  ...requestSmsCode.sagas,
  ...signupOrLoginWithMobilePhone.sagas,
  ...profile.sagas,
  ...role.sagas,
  ...uploadAvatar.sagas,
  ...uploadFile.sagas,
  ...cert.sagas,
  ...supplyProduct.sagas,
  ...fetchCatalogs.sagas,
  ...fetchCategories.sagas,
  ...fetchSpecies.sagas,
  ...createSpecies.sagas,
  ...logisticsProduct.sagas,
  ...cart.sagas,
  ...shop.sagas,
  ...searchDistinct.sagas,
];
