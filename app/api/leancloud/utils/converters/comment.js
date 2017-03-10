import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';
import imagesToJSON from './images';
import { embeddedProductToJSON, embeddedUserToJSON } from './embedded';

export default (comment) => {
  if (!comment) {
    return null;
  }
  const { objectId, desc } = comment.toJSON();

  const images = imagesToJSON(comment.get('images'));
  const owner = embeddedUserToJSON(comment.get('owner'));
  const shopProduct = embeddedProductToJSON(comment.get('shopProduct'));
  const supplyProduct = embeddedProductToJSON(comment.get('supplyProduct'));
  const logisticsProduct = embeddedProductToJSON(comment.get('logisticsProduct'));
  const createdAt = comment.get('createdAt').getTime();
  const updatedAt = comment.get('updatedAt').getTime();

  return _omitBy({ objectId, owner, desc, images, shopProduct, supplyProduct, logisticsProduct, createdAt, updatedAt }, _isUndefined);
};
