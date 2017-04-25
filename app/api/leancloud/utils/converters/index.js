const createConverters = require('funong-common/lib/converters').default;
const { publishes } = require('../shemas');
const converters = createConverters(publishes);

module.exports = converters;
