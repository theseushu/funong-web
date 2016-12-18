export const saveSessionTokenInCookie = ({ sessionToken, userId }) => {
  if (typeof window === 'object') {
    const Cookies = require('js-cookie'); // eslint-disable-line global-require
    Cookies.set('sessionToken', sessionToken);
    Cookies.set('userId', userId);
  }
};

export const loadSessionTokenInCookie = () => {
  if (window) {
    const Cookies = require('js-cookie'); // eslint-disable-line global-require
    const sessionToken = Cookies.get('sessionToken');
    const userId = Cookies.get('userId');
    return { sessionToken, userId };
  }
  return null;
};

export const loadSessionTokenInRequest = (req) => ({ sessionToken: req.cookies.sessionToken, userId: req.cookies.userId });

export const clearSessionTokenInResponse = (resp) => {
  resp.clearCookie('sessionToken');
  resp.clearCookie('userId');
};
