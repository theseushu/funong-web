import createReducer from '../createReducer';

describe('createReducer tests', () => {
  it('should create a default reducer if reducerCreator is NILL', () => {
    const names = { slice: 'testslice' };
    const ACTION_TYPE = 'SOME_ACTION_TYPE';
    const reducerObj = createReducer(names, ACTION_TYPE);
    const reducer = reducerObj[names.slice];
    expect(typeof reducer).toEqual('function');
  });
});
