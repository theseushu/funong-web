// saveToCookie, loadFromCookie are only importable in browser

export const saveToCookie = ({ token: { sessionToken, objectId, mobilePhoneNumber } }) => {
  if (typeof window === 'object') {
    const Cookies = require('js-cookie'); // eslint-disable-line global-require
    Cookies.set('sessionToken', sessionToken);
    Cookies.set('objectId', objectId);
    Cookies.set('mobilePhoneNumber', mobilePhoneNumber);
  }
};

export const loadFromCookie = () => {
  if (typeof window === 'object') {
    const Cookies = require('js-cookie'); // eslint-disable-line global-require
    const sessionToken = Cookies.get('sessionToken');
    const objectId = Cookies.get('objectId');
    const mobilePhoneNumber = Cookies.get('mobilePhoneNumber');
    return { token: { sessionToken, objectId, mobilePhoneNumber } };
  }
  return {};
};

export const loadTokenInRequest = (req) => ({ sessionToken: req.cookies.sessionToken, objectId: req.cookies.objectId, mobilePhoneNumber: req.cookies.mobilePhoneNumber });

export const clearTokenInResponse = (resp) => {
  resp.clearCookie('sessionToken');
  resp.clearCookie('objectId');
  resp.clearCookie('mobilePhoneNumber');
  resp.clearCookie('profile');
};
