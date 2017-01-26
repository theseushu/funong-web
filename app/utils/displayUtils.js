import _reduce from 'lodash/reduce';

export const formatLocation = ({ country = '', province = '', city = '', district = '' }) =>
  `${country === '中国' ? '' : country}${province}${city}${district}`;

export const formatPrices = (prices) => {
  const formattedPrice = _reduce(prices, (result, price) => ({
    min: Math.min(result.min, price.value),
    max: Math.max(result.max, price.value),
  }), { min: 999999999, max: 0 });
  const { min, max } = formattedPrice;
  return min === max ? `${min}元` : `${min} ~ ${max}元`;
};

