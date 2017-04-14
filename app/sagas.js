import { sagas as dataSagas } from './modules/data/ducks';
import { sagas as apiSagas } from './api/ducks';
import { sagas as publishSelectorSagas } from './modules/publishSelector/ducks';

export default [
  ...dataSagas,
  ...apiSagas,
  ...publishSelectorSagas,
];
