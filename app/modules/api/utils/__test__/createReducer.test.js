import createReducer from '../createReducer';

describe('createReducer tests', () => {
  it('should create a reducer', () => {
    const namespace = 'testspace';
    const ACTION_TYPE = 'SOME_ACTION_TYPE';
    const reducerCreator = '';
    expect(createReducer(namespace, ACTION_TYPE, reducerCreator)).toThrow();
  });
});
