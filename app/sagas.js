import { sagas as dataSagas } from './modules/data/ducks';
import { sagas as apiSagas } from './api/ducks';

export default [
  ...dataSagas,
  ...apiSagas,
];
