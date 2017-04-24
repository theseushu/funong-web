import _map from 'lodash/map';
import _union from 'lodash/union';
import AV from 'leancloud-storage';
import { statusValues } from 'funong-common/lib/appConstants';
import { publishToJSON as converter } from '../utils/converters';
import { publishes as shemas } from '../utils/shemas';
// const debug = require('debug')('app:api:publish:methods');

export const create = async (type, schema, params, context) => {
  const { token: { sessionToken, currentUserId } } = context;
  const result = await AV.Cloud.rpc('createPublish', { type, ...params }, { sessionToken });
  return {
    ...result.toJSON(),
    ...params,
    owner: { objectId: currentUserId },
  };
};

export const update = async (type, schema, params, context) => {
  const { token: { sessionToken, currentUserId } } = context;
  const { objectId, ...attrs } = params;
  const result = await AV.Cloud.rpc('updatePublish', { type, objectId, ...attrs }, { sessionToken });
  return {
    objectId,
    ...result.toJSON(),
    ...attrs,
    owner: { objectId: currentUserId },
  };
};

export const enable = async (type, schema, { objectId }, context) => {
  const { token: { sessionToken } } = context;
  const result = await AV.Cloud.rpc('enablePublish', { type, objectId }, { sessionToken });
  return {
    ...result,
    objectId,
  };
};

export const disable = async (type, schema, { objectId }, context) => {
  const { token: { sessionToken } } = context;
  const result = await AV.Cloud.rpc('disablePublish', { type, objectId }, { sessionToken });
  return {
    ...result,
    objectId,
  };
};

export const remove = async (type, schema, { objectId }, context) => {
  const { token: { sessionToken } } = context;
  const result = await AV.Cloud.rpc('removePublish', { type, objectId }, { sessionToken });
  return {
    ...result,
    objectId,
  };
};

export const reject = async (type, schema, { objectId }, context) => {
  const { token: { sessionToken } } = context;
  const result = await AV.Cloud.rpc('rejectPublish', { type, objectId }, { sessionToken });
  return {
    ...result,
    objectId,
  };
};

export const verify = async (type, schema, { objectId }, context) => {
  const { token: { sessionToken } } = context;
  const result = await AV.Cloud.rpc('verifyPublish', { type, objectId }, { sessionToken });
  return {
    ...result,
    objectId,
  };
};

export const fetch = async (type, schema, { objectId }, context) => {
  const { table, attributes } = schema;
  const { token: { sessionToken } } = context;
  const p = await AV.Object.createWithoutData(table, objectId)
    .fetch({
      include: _union(..._map(attributes, (attr) => attr.include)),
    }, {
      sessionToken,
    });
  return converter(schema, p);
};

const createTextQuery = (schema, { sort, page, pageSize, category, species, provinces, keywords }) => {
  const { table, attributes } = schema;
  const query = new AV.SearchQuery(table)
    .include(_union(..._map(attributes, (attr) => attr.include)));
  let queryString = `${keywords.split(' ').map((s) => s.length < 4 ? `${s}~` : s).join(' OR ')}`;
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

export const pageFunc = async (type, schema, { keywords, category, species, provinces, owner, shop, sort, page = 1, pageSize = 20 }, context) => {
  const { token: { sessionToken } } = context;
  let result;
  if (keywords) {
    const query = createTextQuery(schema, { category, species, keywords, provinces, sort, page, pageSize });
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
    result = await AV.Cloud.rpc('pagePublishes', {
      type,
      category: category ? { objectId: category.objectId } : undefined,
      species: (species && species.length > 0) ? species.map((s) => ({ objectId: s.objectId })) : undefined,
      provinces,
      sort,
      owner: owner ? { objectId: owner.objectId } : undefined,
      shop: shop ? { objectId: shop.objectId, owner: { objectId: shop.owner.objectId } } : undefined,
      page,
      pageSize,
    }, { sessionToken });
  }
  return {
    ...result,
    results: result.results.map((p) => converter(schema, p)),
  };
};

export const recommend = async (type, schema, params, context) => {
  const result = await pageFunc(type, schema, { ...params, page: 1, pageSize: 4 }, context);
  return result.results;
};

export default (type, context) => {
  const schema = shemas[type];
  return ({
    create: (params) => create(type, schema, params, context),
    update: (params) => update(type, schema, params, context),
    enable: (params) => enable(type, schema, params, context),
    disable: (params) => disable(type, schema, params, context),
    remove: (params) => remove(type, schema, params, context),
    reject: (params) => reject(type, schema, params, context),
    verify: (params) => verify(type, schema, params, context),
    fetch: (params) => fetch(type, schema, params, context),
    page: (params) => pageFunc(type, schema, params, context),
    recommend: (params) => recommend(type, schema, params, context),
  });
};

