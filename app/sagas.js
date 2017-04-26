import { sagas as apiSagas } from 'api/ducks';
import { sagas as contextSags } from 'modules/context/ducks';
import { sagas as publishSelectorSagas } from 'modules/publishSelector/ducks';

export default [
  ...apiSagas,
  ...publishSelectorSagas,
  ...contextSags,
];
