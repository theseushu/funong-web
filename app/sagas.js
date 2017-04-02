import { sagas as dataSagas } from './modules/data/ducks';
import { sagas as apiSagas } from './api/ducks';
import { sagas as productSelectorSagas } from './modules/productSelector/ducks';
import { sagas as chatSagas } from './modules/chat/ducks';

export default [
  ...dataSagas,
  ...apiSagas,
  ...productSelectorSagas,
  ...chatSagas,
];
