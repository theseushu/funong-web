import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';
import { embeddedUserToJSON, embeddedShopToJSON } from './embedded';

export default (order) => {
  if (!order) {
    return null;
  }
  const { objectId, amount, address, fees, type, status, items, message, services } = order.toJSON();

  const owner = embeddedUserToJSON(order.get('owner'));
  const user = embeddedUserToJSON(order.get('user'));
  const agent = embeddedShopToJSON(order.get('agent'));
  const shop = embeddedShopToJSON(order.get('shop'));

  const createdAt = order.get('createdAt').getTime();
  const updatedAt = order.get('updatedAt').getTime();

  return _omitBy({
    objectId, amount, address, fees, type, status, items, message, services, owner, user, agent, shop, createdAt, updatedAt },
    _isUndefined
  );
};
