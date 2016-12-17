import { sagas as dataSagas } from 'modules/data/ducks';
import { sagas as apiSagas } from 'modules/api/ducks';

export default [
  ...dataSagas,
  ...apiSagas,
];
