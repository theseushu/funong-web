export const formatLocation = ({ country = '', province = '', city = '', district = '' }) =>
  `${country === '中国' ? '' : country}${province}${city}${district}`;
