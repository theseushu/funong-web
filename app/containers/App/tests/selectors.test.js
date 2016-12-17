
import { makeSelectLocationState } from 'containers/App/selectors';

describe('makeSelectLocationState', () => {
  it('should select the route as a plain JS object', () => {
    const route = {
      locationBeforeTransitions: null,
    };
    const mockedState = {
      route,
    };
    expect(makeSelectLocationState()(mockedState)).toEqual(route);
  });
});
