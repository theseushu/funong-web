import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';
import fileToJSON from './file';
import imagesToJSON from './images';
import lnglatToJSON from './lnglat';
import { embeddedUserToJSON } from './embedded';

export default (shop) => {
  if (!shop) {
    return null;
  }
  const { objectId, address, desc, name, areas } = shop.toJSON();

  const thumbnail = fileToJSON(shop.get('thumbnail'));
  const lnglat = lnglatToJSON(shop.get('lnglat'));
  const images = imagesToJSON(shop.get('images'));
  const owner = embeddedUserToJSON(shop.get('owner'));
  const createdAt = shop.get('createdAt').getTime();
  const updatedAt = shop.get('updatedAt').getTime();

  return _omitBy({ objectId, thumbnail, desc, name, areas, location: { address, lnglat }, images, owner, updatedAt, createdAt }, _isUndefined);
};
