export const userTypes = [
  { icon: 'shopping_basket', title: '逛逛再说', value: '一般用户', subtitle: '您可以稍候在个人信息里重新选择' },
  { icon: 'home', title: '我要开店', value: '微店店主' },
  { icon: 'shopping_cart', title: '农产农资收购', value: '农产农资收购' },
  { icon: 'store_mall_directory', title: '农产农资供货', value: '农产农资供货' },
  { icon: 'local_shipping', title: '物流', value: '物流供应商' },
  { icon: 'headset_mic', title: '注册农贸专家', value: '农贸专家' },
];

export const certTypes = {
  personal: 'personal',
  company: 'company',
};

export const catalogTypes = {
  supply: {
    farm: { title: '农产品', value: '农产品' },
    other: { title: '农资农机', value: '农资' },
  },
  logistics: {
    logistics: { title: '物流', value: '物流' },
  },
  shop: {
  },
};

export const specificationTypes = {
  length: { title: '长度', value: 'length' },
  width: { title: '宽度', value: 'width' },
  height: { title: '高度', value: 'height' },
  weight: { title: '重量', value: 'weight' },
  color: { title: '颜色', value: 'color' },
  quality: { title: '质量', value: 'quality' },
  size: { title: '大小', value: 'size' },
  custom: { title: '自定义', value: 'custom' },
};

export const units = [
  '斤', '两', '公斤', '克', '袋', '盒', '箱', '包', '只', '条', '台',
];

export const productLabels = {
  includesTransportation: { title: '包运费', key: 'includesTransportation' },
  supportsLogistics: { title: '协助找物流', key: 'supportsLogistics' },
  supportsDelivery: { title: '支持走快递', key: 'supportsDelivery' },
  supportsAssurance: { title: '担保交易', key: 'supportsAssurance' },
};
