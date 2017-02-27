export default ({ namespace, rootSelector }) => {
  const SET_CRITERIA = `${namespace}/SET_CRITERIA`;

  const reducer = (state = {}, { type, payload }) => {
    if (type === SET_CRITERIA) {
      return payload;
    }
    return state;
  };

  const setCriteria = (criteria = {}) => ({ type: SET_CRITERIA, payload: criteria });

  const selector = (state) => rootSelector(state).criteria;

  return {
    default: {
      criteria: reducer,
    },
    selector,
    actions: {
      setCriteria,
    },
  };
};
