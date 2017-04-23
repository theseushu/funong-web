import createDucks from '../utils/createDucks';
import rootSelector from '../rootSelector';
import namespace from '../namespace';

const ducks = createDucks({
  apiName: 'requestSmsCode',
  rootSelector,
  namespace,
  sagas: {
    * beforeFulfilled() {
      return { time: Date.now() };
    },
  },
});

export default ducks.default; export const actions = ducks.actions; export const selector = ducks.selector; export const sagas = ducks.sagas;
