/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import AV from 'leancloud-storage';
import { commentToJSON } from '../utils/converters';
const debug = require('debug')('app:api:comments');

export default ({ context }) => {
  class Comment extends AV.Object {}
  AV.Object.register(Comment);

// TODO deal with empty catalogType
  const searchComments = async ({ shopProduct, supplyProduct, logisticsProduct, page, pageSize }) => {
    const query = new AV.Query('Comment');
    if (shopProduct) {
      query.equalTo('shopProduct', AV.Object.createWithoutData('ShopProduct', shopProduct.objectId));
    } else if (supplyProduct) {
      query.equalTo('supplyProduct', AV.Object.createWithoutData('TripProduct', supplyProduct.objectId));
    } else if (logisticsProduct) {
      query.equalTo('logisticsProduct', AV.Object.createWithoutData('LogisticsProduct', logisticsProduct.objectId));
    }
    query.include(['images', 'owner', 'owner.avatar']);
    query
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    const comments = await query.include(['images']).find({ sessionToken: context.token.sessionToken });
    return comments.map(commentToJSON);
  };

  const createComment = async ({ desc, images, shopProduct, supplyProduct, logisticsProduct }) => {
    const { token: { sessionToken, currentUserId } } = context;
    const comment = new Comment();
    comment.set('owner', AV.Object.createWithoutData('_User', currentUserId));
    comment.set('desc', desc);
    if (images) {
      comment.set('images', images.map((image) => AV.Object.createWithoutData('_File', image.id)));
    }
    if (shopProduct) {
      comment.set('shopProduct', AV.Object.createWithoutData('ShopProduct', shopProduct.objectId));
    } else if (supplyProduct) {
      comment.set('supplyProduct', AV.Object.createWithoutData('TripProduct', supplyProduct.objectId));
    } else if (logisticsProduct) {
      comment.set('logisticsProduct', AV.Object.createWithoutData('LogisticsProduct', logisticsProduct.objectId));
    }
    const requestParams = { sessionToken };
    const saved = await comment.save({}, requestParams);
    return { ...saved.toJSON(), desc, images, shopProduct, supplyProduct, logisticsProduct };
  };

  const changeCommentStatus = async ({ objectId, status }) => {
    const { token: { sessionToken } } = context;
    try {
      const comment = AV.Object.createWithoutData('Comment', objectId);
      await comment.save({ status }, { sessionToken });
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  return {
    searchComments,
    createComment,
    changeCommentStatus,
  };
};
