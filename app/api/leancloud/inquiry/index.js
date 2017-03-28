import { statusValues } from 'appConstants';
import { inquiryToJSON } from '../utils/converters';
const debug = require('debug')('app:api:inquiry');

export default ({ AV, context }) => {
  class Inquiry extends AV.Object {}
  AV.Object.register(Inquiry);

  const fetchInquiry = async ({ objectId }) => {
    const { token: { sessionToken } } = context;
    try {
      const avInquiry = await AV.Object.createWithoutData('Inquiry', objectId)
        .fetch({
          include: ['category', 'species', 'owner', 'owner.avatar'],
        }, {
          sessionToken,
        });
      const inquiry = inquiryToJSON(avInquiry);
      return inquiry;
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const pageInquiries = async ({ category, species, keyword, provinces, sort, page, pageSize }) => {
    const { token: { sessionToken } } = context;
    const result = await AV.Cloud.rpc('pageInquiries', { category, species, keyword, provinces, sort, page, pageSize }, { sessionToken });
    return {
      ...result,
      results: result.results.map(inquiryToJSON),
    };
  };

  const createInquiry = async ({ desc, price, quantity, name, range, location, category, species, endAt }) => {
    const { token: { sessionToken }, profile } = context;
    const inquiry = new Inquiry();
    const saved = await inquiry.save({
      owner: AV.Object.createWithoutData('_User', profile.objectId),
      address: location.address,
      lnglat: new AV.GeoPoint(location.lnglat),
      desc,
      price,
      quantity,
      name,
      range,
      endAt: new Date(endAt),
      category: AV.Object.createWithoutData('Category', category.objectId),
      species: AV.Object.createWithoutData('Species', species.objectId),
      status: statusValues.unconfirmed.value,
    }, {
      fetchWhenSave: true,
      sessionToken,
    });
    return { ...saved.toJSON(), desc, price, name, range, location, category, species, endAt };
  };

  const updateInquiry = async ({ inquiry: { objectId }, desc, price, quantity, name, range, location, category, species, endAt }) => {
    const { token: { sessionToken } } = context;
    const inquiry = AV.Object.createWithoutData('Inquiry', objectId);
    const attrs = {};
    if (desc != null) {
      attrs.desc = desc;
    }
    if (price != null) {
      attrs.price = price;
    }
    if (quantity != null) {
      attrs.quantity = quantity;
    }
    if (name != null) {
      attrs.name = name;
    }
    if (range != null) {
      attrs.range = range;
    }
    if (location != null) {
      attrs.address = location.address;
      attrs.lnglat = new AV.GeoPoint(location.lnglat);
    }
    if (category != null) {
      attrs.category = AV.Object.createWithoutData('Category', category.objectId);
    }
    if (species != null) {
      attrs.species = AV.Object.createWithoutData('Species', species.objectId);
    }
    if (endAt != null) {
      attrs.endAt = new Date(endAt);
    }
    const saved = await inquiry.save(attrs, {
      fetchWhenSave: true,
      sessionToken,
    });
    return { ...saved.toJSON(), ...attrs };
  };

  return {
    pageInquiries,
    fetchInquiry,
    updateInquiry,
    createInquiry,
  };
};
