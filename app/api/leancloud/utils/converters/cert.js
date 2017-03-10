import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';
import imagesToJSON from './images';
import { embeddedUserToJSON } from './embedded';

export default (cert) => {
  if (!cert) {
    return null;
  }
  const { objectId, type, fields, status } = cert.toJSON();
  const images = imagesToJSON(cert.get('images'));
  const owner = cert.get('owner');
  const createdAt = cert.get('createdAt').getTime();
  const updatedAt = cert.get('updatedAt').getTime();
  return _omitBy({ objectId, type, status, images, fields, owner: embeddedUserToJSON(owner), createdAt, updatedAt }, _isUndefined);
};
