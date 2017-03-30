import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';
import { embeddedUserToJSON, embeddedProductToJSON } from './embedded';
import inquiryToJSON from './inquiry';

export default (bid) => {
  if (!bid) {
    return null;
  }
  const { objectId, price, quantity, message } = bid.toJSON();

  const owner = embeddedUserToJSON(bid.get('owner'));
  const createdAt = bid.get('createdAt').getTime();
  const updatedAt = bid.get('updatedAt').getTime();
  const product = embeddedProductToJSON(bid.get('product'));
  const inquiry = inquiryToJSON(bid.get('inquiry'));

  return _omitBy({ objectId, owner, price, quantity, message, createdAt, updatedAt, inquiry, product }, _isUndefined);
};
