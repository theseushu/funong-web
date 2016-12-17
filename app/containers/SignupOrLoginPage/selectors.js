import { createSelector } from 'reselect';

/**
 * Direct selector to the signupOrLogin state domain
 */
const selectSignupOrLoginDomain = () => (state) => state.signupOrLogin;

/**
 * Other specific selectors
 */


/**
 * Default selector used by SignupOrLoginPage
 */

const makeSelectSignupOrLogin = () => createSelector(
  selectSignupOrLoginDomain(),
  (substate) => substate
);

export default makeSelectSignupOrLogin;
export {
  selectSignupOrLoginDomain,
};
