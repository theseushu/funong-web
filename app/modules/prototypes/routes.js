import SignupOrLogin from './signupOrLogin';
import Profile from './profile';

export default () => ({ // eslint-disable-line no-unused-vars
  path: 'prototype',
  name: 'prototype',
  indexRoute: {
    component: SignupOrLogin,
  },
  childRoutes: [{
    path: 'login',
    component: SignupOrLogin,
  }, {
    path: 'profile',
    component: Profile,
  }],
});
