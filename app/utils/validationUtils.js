const distanceRegex = /^[1-9][0-9]{0,1}$/; // 1 - 99
const quantityRegex = /^[1-9][0-9]{0,7}$/; // 1 - 99999999
const valueRegex = /^[0-9]{1,7}(\.[0-9]{1,2})?$/; // 0.01 - 9999999.99

export const isDistanceInvalid = (number) => {
  if (distanceRegex.test(number)) {
    return false;
  }
  return '请使用1-99的整数';
};

export const isQuantityInvalid = (number) => {
  if (quantityRegex.test(number)) {
    return false;
  }
  return '请使用正整数';
};

export const isPriceInvalid = (number) => {
  if (valueRegex.test(number)) {
    return false;
  }
  return '请使用正数，小数位两位。示例：100, 7.13, 0.99';
};
