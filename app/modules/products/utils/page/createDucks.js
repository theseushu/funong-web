/**
 * If you need sagas, remember to uncomment injectSagas(ducks.sagas) in createRouteCreator.js too
 */

export default (type) => {
  const SLICE_NAME = `page_${type}_product`;

  return {
    default: {
      [SLICE_NAME]: (state = {}) => state,
    },
    actions: {},
    selectors: {},
    // sagas: [],
  };
};
