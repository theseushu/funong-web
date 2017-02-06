import createDucks from '../utils/createDucks';
import rootSelector from '../rootSelector';
import namespace from '../namespace';

const ducks = createDucks({
  key: 'requestSmsCode',
  apiName: 'requestSmsCode',
  rootSelector,
  namespace,
  sagas: {
    * beforeFulfilled() {
      return { time: Date.now() };
    },
  },
});

module.exports = ducks;
