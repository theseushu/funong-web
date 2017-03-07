import supply from './supply';
import shop from './shop';
import logistics from './logistics';
import trip from './trip';

export default ({ AV, context }) => ({
  products: {
    ...supply({ AV, context }),
    ...shop({ AV, context }),
    ...logistics({ AV, context }),
    ...trip({ AV, context }),
  },
});
