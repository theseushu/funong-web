
import { fromJS } from 'immutable';
import signupOrLoginReducer from '../reducer';

describe('signupOrLoginReducer', () => {
  it('returns the initial state', () => {
    expect(signupOrLoginReducer(undefined, {})).toEqual(fromJS({}));
  });
});
