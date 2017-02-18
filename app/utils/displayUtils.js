import React from 'react';
import _reduce from 'lodash/reduce';
import _find from 'lodash/find';
import { statusValues, districtLevels } from 'appConstants';
import styles from 'modules/common/styles';

export const formatAddress = ({ country = '', province = '', city = '', district = '' }) =>
  `${country === '中国' ? '' : country}${province}${city}${district}`;

export const formatPrices = (specs) => {
  const formattedPrice = _reduce(specs, (result, spec) => ({
    min: Math.min(result.min, spec.price),
    max: Math.max(result.max, spec.price),
  }), { min: 999999999, max: 0 });
  const { min, max } = formattedPrice;
  return min === max ? `${min}元` : `${min} ~ ${max}元`;
};

export const formatPrice = (spec) => {
  const result = `${spec.price}元每${spec.unit}`;
  if (spec.minimum > 1) {
    return `${result}，${spec.minimum}${spec.unit}起售`;
  }
  return result;
};

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

const miniSecsInHour = 3600 * 1000;
const miniSecsInDay = miniSecsInHour * 24;
const miniSecsInWeek = miniSecsInDay * 7;
const miniSecsInMonth = miniSecsInDay * 30;
const miniSecsInYear = miniSecsInDay * 365;
export const humanizeTime = (time) => {
  const now = new Date().getTime();
  const period = now - time;
  if (period < miniSecsInDay) {
    const hours = Math.floor((period) / miniSecsInHour);
    if (hours <= 0) {
      return '刚刚';
    }
    return `${hours}小时前`;
  } else if (period < miniSecsInWeek) {
    const days = Math.floor((now - time) / miniSecsInDay);
    if (days <= 0) {
      return '今天';
    }
    return `${days}天前`;
  } else if (period < miniSecsInMonth) {
    const weeks = Math.floor((now - time) / miniSecsInWeek);
    if (weeks <= 0) {
      return '本周';
    }
    return `${weeks}周前`;
  } else if (period < miniSecsInYear) {
    const months = Math.floor((now - time) / miniSecsInMonth);
    if (months <= 0) {
      return '本月';
    }
    return `${months}月前`;
  }
  const years = Math.floor((now - time) / miniSecsInYear);
  if (years <= 0) {
    return '今年';
  }
  return `${years}年前`;
};

function Rad(d) {
  return (d * Math.PI) / 180.0; // 经纬度转换成三角函数中度分表形式。
}
// 计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
export function humanizeLnglat(lat1, lng1, lat2, lng2) {
  const radLat1 = Rad(lat1);
  const radLat2 = Rad(lat2);
  const a = radLat1 - radLat2;
  const b = Rad(lng1) - Rad(lng2);
  let s = 2 * Math.asin(
    Math.sqrt(Math.sin(a / 2) ** 2) + (Math.cos(radLat1) * Math.cos(radLat2) * (Math.sin(b / 2) ** 2)));
  s *= 6378.137;// EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000; // 输出为公里
  s = Math.floor(s);
  return s === 0 ? '小于1公里' : `约${s}公里`;
}

