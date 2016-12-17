export default (ACTION_TYPE) => (state = {}, action) => (action.type === ACTION_TYPE ? action.payload : state);
