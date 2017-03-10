import { combineReducers } from 'redux';
import namespace from './namespace';
import * as map from './map';
import * as initAMap from './initAMap/ducks';
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
import * as cart from './cart';
import * as shop from './shop';
import * as comment from './comment';
import * as searchDistinct from './searchDistrict/ducks';
import * as order from './order';

export default {
  [namespace]: combineReducers({
    ...map.default,
    ...initAMap.default,
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
    ...cart.default,
    ...shop.default,
    ...comment.default,
    ...searchDistinct.default,
    ...order.default,
  }),
};

export const sagas = [
  ...map.sagas,
  ...initAMap.sagas,
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
  ...cart.sagas,
  ...shop.sagas,
  ...comment.sagas,
  ...searchDistinct.sagas,
  ...order.default,
];
