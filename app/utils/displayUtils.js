import React from 'react';
import _reduce from 'lodash/reduce';
import _find from 'lodash/find';
import _union from 'lodash/union';
import _endsWith from 'lodash/endsWith';
import format from 'date-fns/format';
import isBefore from 'date-fns/is_before';
import timeago from 'timeago.js';
import { statusValues, districtLevels, badges, provinces as allProvinces } from 'appConstants';
import styles from 'modules/common/styles';
import { ImageBadge } from 'modules/common/badge';

export const formatProvinces = (provinces) =>
  (provinces && provinces.length > 0) ? provinces.map((province) => _find(allProvinces, (p) => p.value === province).title).join(' ') : '全国';

export const formatAddress = ({ country = '', province = '', city = '', district = '' }) =>
  `${country === '中国' ? '' : country}${province}${city}${district}`;

export const briefAddress = ({ province, city }) => {
  let p = province;
  let c = city;
  if (_endsWith(province, '省') || _endsWith(province, '市')) {
    p = province.substring(0, province.length - 1);
  }
  if (_endsWith(city, '市')) {
    c = city.substring(0, city.length - 1);
  }
  return `${p}${c}`;
};

export const formatPrices = (specs) => {
  const formattedPrice = _reduce(specs, (result, spec) => ({
    min: Math.min(result.min, spec.price),
    max: Math.max(result.max, spec.price),
  }), { min: 999999999, max: 0 });
  const { min, max } = formattedPrice;
  return min === max ? `${min}元` : `${min} ~ ${max}元`;
};

export const formatPrice = (spec, displayMinimum = true) => {
  const result = `￥${spec.price}/${spec.unit}`;
  if (spec.minimum > 1 && displayMinimum) {
    return `${result}，${spec.minimum}${spec.unit}起售`;
  }
  return result;
};

export const formatParams = (specs) => _reduce(specs, (result, spec) => _union(result, spec.params), []);

export const formatArea = (address, { level, districts, distance }) => {
  if (level === districtLevels.custom.value) {
    return `店铺周边${distance}公里`;
  }
  return districts.join(' ');
};

export const formatDeliveryFee = (minimum, deliveryFee) => {
  if (minimum === 0 && deliveryFee === 0) {
    return '免运费';
  } else if (deliveryFee === 0) {
    return `${minimum}元起送，免运费`;
  } else if (minimum === 0) {
    return `运费${deliveryFee}元`;
  }
  return `${minimum}元起送，运费${deliveryFee}`;
};

export const formatStatus = (statusValue) => {
  const status = _find(statusValues, (s) => s.value === statusValue) || {};
  const { title, value } = status;
  let className;
  switch (value) {
    case statusValues.unverified.value:
      className = styles.colorUnverified;
      break;
    case statusValues.rejected.value:
      className = styles.colorRejected;
      break;
    case statusValues.verified.value:
      className = styles.colorVerified;
      break;
    default:
      className = styles.colorAccent;
  }
  return (<span className={className}>{title}</span>);
};

export const formatStartAndEndTime = (startTime, endTime) => {
  const now = new Date();
  const timeagoIns = timeago(now);
  timeagoIns.setLocale('zh_CN');
  if (isBefore(endTime, now)) {
    return '已结束';
  } else if (isBefore(startTime, now)) {
    return `${timeagoIns.format(endTime)}结束`;
  }
  return `${timeagoIns.format(startTime)}开始`;
};

export const humanizeTime = (time) => {
  const timeagoIns = timeago();
  timeagoIns.setLocale('zh_CN');
  return timeagoIns.format(time);
};

export const formatDateTime = (time) => format(time, 'YYYY-MM-DD HH:mm');

export const formatTime = (time) => format(time, 'YYYY-MM-DD');

// 计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
export function humanizeDistance(distance) {
  if (distance == null) {
    return null;
  }
  return `${Math.round(distance / 1000)}公里`;
}

export function createBadgesForUser(user, size) {
  if (!user || !user.badges) {
    return [];
  }
  return user.badges.map((badge, i) => {
    let name;
    switch (badge) {
      case badges.idVerified.value:
        name = 'personal';
        break;
      case badges.companyVerified.value:
        name = 'company';
        break;
      case badges.expertVerified.value:
        name = 'expert';
        break;
      default:
        console.error(`unknown badge: ${badge}`); // eslint-disable-line
        return null;
    }
    return <ImageBadge key={i} name={name} size={size} tooltip />;
  });
}
