import AV from 'leancloud-storage';

const userToResult = (user) => {
  const sessionToken = user.getSessionToken();
  const objectId = user.get('objectId');
  const mobilePhoneNumber = user.get('mobilePhoneNumber');
  return { sessionToken, objectId, mobilePhoneNumber };
};

export default ({ updateContextToken }) => {
  const success = (user) => {
    const { sessionToken, objectId, mobilePhoneNumber } = user;
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

  const loginWithPassword = (phone, password) => AV.User.logIn(phone, password).then((user) => success(userToResult(user))).catch(error);
  const signupOrLoginWithMobilePhone = (phone, smsCode, attributes) => AV.User.signUpOrlogInWithMobilePhone(phone, smsCode, attributes)
    .then((user) => success(userToResult(user))).catch(error);
  return {
    loginWithPassword,
    signupOrLoginWithMobilePhone,
  };
};
