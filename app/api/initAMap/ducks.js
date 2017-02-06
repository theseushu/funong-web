import createDucks from '../utils/createDucks';
import rootSelector from '../rootSelector';
import namespace from '../namespace';

const ducks = createDucks({
  key: 'initAMap',
  apiName: 'initAMap',
  rootSelector: (state) => rootSelector(state),
  namespace,
  sagas: {},
});

module.exports = ducks;
