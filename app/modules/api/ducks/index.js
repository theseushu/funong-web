import { combineReducers } from 'redux';
import * as requestSmsCode from '../requestSmsCode/ducks';
import * as fetchProfile from '../fetchProfile/ducks';
import * as signupOrLoginWithMobilePhone from '../signupOrLoginWithMobilePhone/ducks';
import * as uploadAvatar from '../uploadAvatar/ducks';
import * as searchDistinct from '../searchDistrict/ducks';
import * as fetchLocation from '../fetchLocation/ducks';
import * as fetchCatalogs from '../fetchCatalogs/ducks';
import * as fetchCategories from '../fetchCategories/ducks';
import * as fetchSpecies from '../fetchSpecies/ducks';
import * as fetchPriceDefinitions from '../fetchPriceDefinitions/ducks';
import * as uploadFile from '../uploadFile/ducks';

export default {
  api: combineReducers({
    ...requestSmsCode.default,
    ...fetchProfile.default,
    ...signupOrLoginWithMobilePhone.default,
    ...uploadAvatar.default,
    ...searchDistinct.default,
    ...fetchLocation.default,
    ...fetchCatalogs.default,
    ...fetchCategories.default,
    ...fetchSpecies.default,
    ...fetchPriceDefinitions.default,
    ...uploadFile.default,
  }),
};

export const sagas = [
  ...requestSmsCode.sagas,
  ...fetchProfile.sagas,
  ...signupOrLoginWithMobilePhone.sagas,
  ...uploadAvatar.sagas,
  ...searchDistinct.sagas,
  ...fetchLocation.sagas,
  ...fetchCatalogs.sagas,
  ...fetchCategories.sagas,
  ...fetchSpecies.sagas,
  ...fetchPriceDefinitions.sagas,
  ...uploadFile.sagas,
];
