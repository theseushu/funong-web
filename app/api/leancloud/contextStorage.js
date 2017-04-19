// saveToCookie, loadFromCookie are only importable in browser
const debug = require('debug')('funong-web:api:leancloud:contextStorage');

export const saveToCookie = ({ token: { sessionToken, currentUserId, mobilePhoneNumber } }) => {
  if (process.env.browser) {
    const Cookies = require('js-cookie'); // eslint-disable-line global-require
    Cookies.set('sessionToken', sessionToken);
    Cookies.set('currentUserId', currentUserId);
    Cookies.set('mobilePhoneNumber', mobilePhoneNumber);
    if (!sessionToken || !currentUserId || !mobilePhoneNumber) {
      debug('Saving empty sessionToken or currentUserId or mobilePhoneNumber to cookie');
    }
  } else {
    throw new Error('There is no need to save anything to cookie on rendering server now');
  }
};

export const loadFromCookie = (req, res) => {
  const token = {};
  if (process.env.browser) {
    const Cookies = require('js-cookie'); // eslint-disable-line global-require
    token.sessionToken = Cookies.get('sessionToken');
    token.currentUserId = Cookies.get('currentUserId');
    token.mobilePhoneNumber = Cookies.get('mobilePhoneNumber');
  } else {
    const { cookies } = req;
    token.sessionToken = cookies.sessionToken;
    token.currentUserId = cookies.currentUserId;
    token.mobilePhoneNumber = cookies.mobilePhoneNumber;
  }
  if ((token.sessionToken || token.currentUserId || token.mobilePhoneNumber)
    && (!token.sessionToken || !token.currentUserId || !token.mobilePhoneNumber)) {
    clearInCookie(res);
    debug('Found empty sessionToken or currentUserId or mobilePhoneNumber. Clearing every thing in cookie now');
    return { token: {} };
  }
  return { token };
};

export const clearInCookie = (res) => {
  if (process.env.browser) {
    const Cookies = require('js-cookie'); // eslint-disable-line global-require
    Cookies.remove('sessionToken');
    Cookies.remove('currentUserId');
    Cookies.remove('mobilePhoneNumber');
  } else {
    res.clearCookie('sessionToken');
    res.clearCookie('currentUserId');
    res.clearCookie('mobilePhoneNumber');
  }
};
