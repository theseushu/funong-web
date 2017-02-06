export default ({ AV, updateContextToken }) => {
  const success = (user) => {
    const sessionToken = user.getSessionToken();
    const objectId = user.get('objectId');
    const mobilePhoneNumber = user.get('mobilePhoneNumber');
    updateContextToken({ objectId, sessionToken, mobilePhoneNumber });
    return ({
      sessionToken,
      objectId,
      mobilePhoneNumber,
    });
  };
  const error = (err) => {
    updateContextToken({});
    throw err;
  };

  const loginWithPassword = (...params) => AV.User.logIn(...params).then(success).catch(error);
  const signupOrLoginWithMobilePhone = (...params) => AV.User.signUpOrlogInWithMobilePhone(...params).then(success).catch(error);
  return {
    loginWithPassword,
    signupOrLoginWithMobilePhone,
  };
};
