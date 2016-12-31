// simply replace state with action.payload
// I don't like write 3 or more actions for a rest call, so here comes this simple one.
const restCallStateReducerCreator = (ACTION_TYPE) => (state = {}, action) => (action.type === ACTION_TYPE ? action.payload : state);

export default ({ slice }, ACTION_TYPE, reducerCreator = restCallStateReducerCreator) => ({
  [slice]: reducerCreator(ACTION_TYPE),
});
