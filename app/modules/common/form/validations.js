import _isEmpty from 'lodash/isEmpty';

const distanceRegex = /^[1-9][0-9]{0,1}$/; // 1 - 99
const quantityRegex = /^[1-9][0-9]{0,4}$/; // 1 - 99999
const priceRegex = /^[0-9]{1,7}(\.[0-9]{1,2})?$/; // 0.01 - 9999999.99
const IDCardRegex = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;

export const required = (value) => { // lodash isEmpty(number) = true. so I added number check before isEmpty
  let empty = false;
  if (!isNaN(Number(value))) {
    empty = false;
  } else {
    empty = _isEmpty(value);
  }
  return empty ? '必填' : undefined;
};

export const maxLength = (max) => (value) =>
  value && value.length > max ? `至多${max}个字` : undefined;

export const maxLength10 = maxLength(10);
export const maxLength30 = maxLength(30);

export const number = (value) => value && isNaN(Number(value)) ? '必须使用数字' : undefined;

export const minValue = (min) => (value) =>
  value && value <= min ? `使用大于${min}的数字` : undefined;

export const minValue0 = minValue(0);

export const IDCard = (value) => IDCardRegex.test(value) ? undefined : '请输入正确的身份证号码';

export const distance = (value) => distanceRegex.test(value) ? undefined : '请使用1-99的整数';

export const quantity = (value) => quantityRegex.test(value) ? undefined : '请使用正整数，最大10万';

export const price = (value) => priceRegex.test(value) ? undefined : '请使用正数，小数位两位。如：100, 7.13, 0.99';

// logistics product
export const capacity = quantity;
export const count = quantity;
