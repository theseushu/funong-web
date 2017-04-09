/**
 * If you need sagas, remember to uncomment injectSagas(ducks.sagas) in createRouteCreator.js too
 */

export default (key) => {
  const SLICE_NAME = `page_${key}_product`;

  return {
    default: {
      [SLICE_NAME]: (state = {}) => state,
    },
    actions: {},
    selectors: {},
    // sagas: [],
  };
};
