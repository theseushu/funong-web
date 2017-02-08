export default ({ AV }) => {
  const login = (...params) => AV.User.logIn(...params).then((user) => ({
    sessionToken: user.getSessionToken(),
    userId: user.get('objectId'),
  }));
  const signupOrLoginWithMobilePhone = (...params) => AV.User.signUpOrlogInWithMobilePhone(...params).then((user) => ({
    sessionToken: user.getSessionToken(),
    userId: user.get('objectId'),
  }));
  return {
    login,
    signupOrLoginWithMobilePhone,
  };
};
