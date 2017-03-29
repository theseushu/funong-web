import { bidToJSON } from '../utils/converters';
const debug = require('debug')('app:api:bid');

export default ({ AV, context }) => {
  class Bid extends AV.Object {}
  AV.Object.register(Bid);
//
//   const fetchInquiry = async ({ objectId }) => {
//     const { token: { sessionToken } } = context;
//     try {
//       const avInquiry = await AV.Object.createWithoutData('Inquiry', objectId)
//         .fetch({
//           include: ['category', 'species', 'owner', 'owner.avatar'],
//         }, {
//           sessionToken,
//         });
//       const inquiry = inquiryToJSON(avInquiry);
//       return inquiry;
//     } catch (err) {
//       debug(err);
//       throw err;
//     }
//   };
//
  const pageBids = async ({ inquiry, mine, page, pageSize }) => {
    const { token: { sessionToken } } = context;
    const result = await AV.Cloud.rpc('pageBids', { inquiry, mine, page, pageSize }, { sessionToken });
    return {
      ...result,
      results: result.results.map(bidToJSON),
    };
  };

  const createBid = async ({ price, quantity, message, inquiry, product }) => {
    try {
      const { token: { sessionToken }, profile } = context;
      const bid = new Bid();
      const saved = await bid.save({
        owner: AV.Object.createWithoutData('_User', profile.objectId),
        message,
        price,
        quantity,
        inquiry: AV.Object.createWithoutData('Inquiry', inquiry.objectId),
        product: product ? AV.Object.createWithoutData('SupplyProduct', product.objectId) : undefined,
      }, {
        fetchWhenSave: true,
        sessionToken,
      });
      return { ...saved.toJSON(), price, quantity, message, inquiry, product };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const withdrawBid = async ({ objectId }) => {
    try {
      const { token: { sessionToken } } = context;
      const bid = AV.Object.createWithoutData('Bid', objectId);
      await bid.destroy({
        sessionToken,
      });
      return { objectId };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const updateBid = async ({ bid, price, quantity, message, product }) => {
    try {
      const { token: { sessionToken } } = context;
      const avBid = AV.Object.createWithoutData('Bid', bid.objectId);
      const attrs = {};
      if (price != null) {
        attrs.price = price;
      }
      if (quantity != null) {
        attrs.quantity = quantity;
      }
      if (message != null) {
        attrs.message = message;
      }
      if (product != null) {
        attrs.product = AV.Object.createWithoutData('SupplyProduct', product.objectId);
      } else if (product === null) {
        attrs.product = null;
      }
      const saved = await avBid.save(attrs, {
        fetchWhenSave: true,
        sessionToken,
      });
      return { ...bid, price, quantity, message, product, updatedAt: saved.get('updatedAt').getTime() };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  return {
    createBid,
    updateBid,
    withdrawBid,
    pageBids,
  };
};
