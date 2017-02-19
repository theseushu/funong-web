import _find from 'lodash/find';
import { badges } from 'appConstants';

export const isUserIDVerified = (user) => {
  if (!user) {
    return false;
  }
  return !!_find(user.badges, (badge) => badge === badges.idVerified.value);
};

export const isUserCompanyVerified = (user) => {
  if (!user) {
    return false;
  }
  return !!_find(user.badges, (badge) => badge === badges.companyVerified.value);
};

export const isUserExpertVerified = (user) => {
  if (!user) {
    return false;
  }
  return !!_find(user.badges, (badge) => badge === badges.expertVerified.value);
};

export const createShopAuthorized = (user, shop) => {
  if (!user || shop) {
    return false;
  }
  return !!_find(user.badges, (badge) => (badge === badges.companyVerified.value || badge === badges.idVerified.value));
};
