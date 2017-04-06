import supply from './supply';
import shop from './shop';
import logistics from './logistics';
import trip from './trip';

export default ({ context }) => ({
  products: {
    ...supply({ context }),
    ...shop({ context }),
    ...logistics({ context }),
    ...trip({ context }),
  },
});
