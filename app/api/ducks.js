import { combineReducers } from 'redux';
import namespace from './namespace';
import * as initAMap from './initAMap/ducks';
import * as fetchLocation from './fetchLocation/ducks';
import * as requestSmsCode from './requestSmsCode/ducks';
import * as signupOrLoginWithMobilePhone from './signupOrLogin/ducks';
import * as category from './category';
import * as species from './species';
import * as role from './role';
import * as profile from './profile';
import * as uploadFile from './uploadFile/ducks';
import * as uploadAvatar from './uploadAvatar/ducks';
import * as cert from './cert';
import * as products from './products/ducks';
import * as shopProduct from './shopProduct';
import * as logisticsProduct from './logisticsProduct';
import * as tripProduct from './tripProduct';
import * as cart from './cart';
import * as shop from './shop';
import * as comment from './comment';
import * as searchDistinct from './searchDistrict/ducks';

export default {
  [namespace]: combineReducers({
    ...initAMap.default,
    ...fetchLocation.default,
    ...requestSmsCode.default,
    ...signupOrLoginWithMobilePhone.default,
    ...category.default,
    ...species.default,
    ...profile.default,
    ...role.default,
    ...uploadFile.default,
    ...uploadAvatar.default,
    ...cert.default,
    ...products.default,
    ...shopProduct.default,
    ...logisticsProduct.default,
    ...tripProduct.default,
    ...cart.default,
    ...shop.default,
    ...comment.default,
    ...searchDistinct.default,
  }),
};

export const sagas = [
  ...initAMap.sagas,
  ...fetchLocation.sagas,
  ...requestSmsCode.sagas,
  ...signupOrLoginWithMobilePhone.sagas,
  ...category.sagas,
  ...species.sagas,
  ...profile.sagas,
  ...role.sagas,
  ...uploadAvatar.sagas,
  ...uploadFile.sagas,
  ...cert.sagas,
  ...products.sagas,
  ...shopProduct.sagas,
  ...logisticsProduct.sagas,
  ...tripProduct.sagas,
  ...cart.sagas,
  ...shop.sagas,
  ...comment.sagas,
  ...searchDistinct.sagas,
];
