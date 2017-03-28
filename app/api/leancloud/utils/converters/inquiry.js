import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';
import lnglatToJSON from './lnglat';
import { embeddedUserToJSON } from './embedded';
import categoryToJSON from './category';
import speciesToJSON from './species';

export default (inquiry) => {
  if (!inquiry) {
    return null;
  }
  const { objectId, address, price, quantity, name, range, desc, status } = inquiry.toJSON();

  const lnglat = lnglatToJSON(inquiry.get('lnglat'));
  const owner = embeddedUserToJSON(inquiry.get('owner'));
  const endAt = inquiry.get('endAt').getTime();
  const createdAt = inquiry.get('createdAt').getTime();
  const updatedAt = inquiry.get('updatedAt').getTime();
  const category = categoryToJSON(inquiry.get('category'));
  const species = speciesToJSON(inquiry.get('species'));

  return _omitBy({ objectId, category, species, owner, location: { address, lnglat }, price, quantity, name, range, desc, endAt, createdAt, updatedAt, status }, _isUndefined);
};
