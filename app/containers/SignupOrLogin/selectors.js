import { createSelector } from 'reselect';

/**
 * Direct selector to the signupOrLogin state domain
 */
const selectSignupOrLoginDomain = () => (state) => state.get('signupOrLogin');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SignupOrLogin
 */

const makeSelectSignupOrLogin = () => createSelector(
  selectSignupOrLoginDomain(),
  (substate) => substate.toJS()
);

export default makeSelectSignupOrLogin;
export {
  selectSignupOrLoginDomain,
};
