import _isUndefined from 'lodash/isUndefined';
import _omitBy from 'lodash/omitBy';
import fileToJSON from './file';
import lnglatToJSON from './lnglat';

export const embeddedUserToJSON = (user) => {
  if (!user) {
    return undefined;
  }
  const { objectId, name, mobilePhoneNumber, badges, services } = user.toJSON();
  const avatar = fileToJSON(user.get('avatar'));
  const roles = user.get('roles');
  return _omitBy({ objectId, name, mobilePhoneNumber, badges, services, avatar, roles }, _isUndefined);
};

export const embeddedShopToJSON = (shop) => {
  if (!shop) {
    return undefined;
  }
  const { objectId, areas, address, name } = shop.toJSON();

  const thumbnail = fileToJSON(shop.get('thumbnail'));
  const lnglat = lnglatToJSON(shop.get('lnglat'));
  const owner = embeddedUserToJSON(shop.get('owner'));

  return _omitBy({ objectId, thumbnail, name, areas, location: { address, lnglat }, owner }, _isUndefined);
};

export const embeddedProductToJSON = (product) => {
  if (!product) {
    return undefined;
  }
  const { objectId } = product.toJSON();
  return { objectId };
};
