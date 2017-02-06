export default ({ actionConstant, action }) => ({
  [action]: ({ meta = {}, ...params }) => ({ type: actionConstant, payload: { ...params }, meta }),
});
