import AV from 'leancloud-storage';
import { statusValues } from 'funong-common/lib/appConstants';
import { generateKeywords } from 'funong-common/lib/utils/publishUtils';
import { inquiryToJSON } from '../utils/converters';
const debug = require('debug')('app:api:inquiry');

export default ({ context }) => {
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

  const createTextQuery = ({ sort, page, pageSize, category, species, provinces, keywords }) => {
    const query = new AV.SearchQuery('Inquiry')
      .include(['category', 'species', 'owner', 'owner.avatar']);
    let queryString = `${keywords.split(' ').join(' OR ')}`;
    if (category) {
      queryString += ` AND ${category.objectId}`;
    }
    if (species && species.length > 0) {
      queryString += ` AND (${species.map((s) => s.objectId).join(' OR ')})`;
    }
    if (provinces && provinces.length > 0) {
      queryString += ` AND (${provinces.join(' OR ')})`;
    }
    query.queryString(`${queryString} AND status: (${statusValues.unverified.value} OR ${statusValues.verified.value})`);
    if (sort && sort.sort) {
      const builder = new AV.SearchSortBuilder();
      if (sort.order === 'asc') {
        builder.ascending(sort.sort);
      } else {
        builder.descending(sort.sort);
      }
      query.sortBy(builder);
    }
    if (page && pageSize) {
      query
        .skip((page - 1) * pageSize)
        .limit(pageSize);
    }
    return query;
  };

  const pageInquiries = async ({ category, species, keywords, provinces, sort, page, pageSize }) => {
    try {
      const { token: { sessionToken } } = context;
      let result;
      if (keywords) {
        const query = createTextQuery({ category, species, keywords, provinces, sort, page, pageSize });
        const results = await query.find({ sessionToken });
        const count = query.hits();
        result = {
          total: count,
          totalPages: Math.ceil(count / pageSize),
          page,
          pageSize,
          first: page === 1,
          last: count <= page * pageSize,
          results,
        };
      } else {
        result = await AV.Cloud.rpc('pageInquiries', {
          category,
          species,
          provinces,
          sort,
          page,
          pageSize,
        }, { sessionToken });
      }
      return {
        ...result,
        results: result.results.map(inquiryToJSON),
      };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const createInquiry = async ({ desc, price, quantity, name, range, location, category, species, endAt }) => {
    const { token: { sessionToken, currentUserId } } = context;
    const inquiry = new Inquiry();
    const saved = await inquiry.save({
      owner: AV.Object.createWithoutData('_User', currentUserId),
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
      status: statusValues.unverified.value,
      keywords: generateKeywords({ desc, price, quantity, name, range, location, category, species, endAt }),
    }, {
      fetchWhenSave: true,
      sessionToken,
    });
    return { ...saved.toJSON(), desc, price, name, range, location, category, species, endAt };
  };

  const updateInquiry = async ({ inquiry, desc, price, quantity, name, range, location, category, species, endAt }) => {
    const { token: { sessionToken } } = context;
    const toSave = AV.Object.createWithoutData('Inquiry', inquiry.objectId);
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
    attrs.keywords = generateKeywords({ ...inquiry, desc, price, quantity, name, range, location, category, species, endAt });
    const saved = await toSave.save(attrs, {
      fetchWhenSave: true,
      sessionToken,
    });
    return { ...inquiry, ...saved.toJSON(), desc, price, quantity, name, range, location, category, species, endAt };
  };

  return {
    pageInquiries,
    fetchInquiry,
    updateInquiry,
    createInquiry,
  };
};
