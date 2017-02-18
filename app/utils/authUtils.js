import _find from 'lodash/find';
import { badges } from 'appConstants';

export const createShopAuthorized = (user, shop) => {
  if (!user || shop) {
    return false;
  }
  return !!_find(user.badges, (badge) => badge === badges.companyVerified.value);
}
