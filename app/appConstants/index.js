export catalogs from './catalogs';
export productTypes from './productTypes';
export serviceTypes from './services';
export orderFeeTypes from './orderFeeTypes';

export const statusValues = {
  unverified: { value: 0, title: '待审核' },
  verified: { value: 1, title: '已通过' },
  rejected: { value: 2, title: '已拒绝' },
  removed: { value: 3, title: '已删除' },

  unconfirmed: { value: 11, title: '待确认' },
  billed: { value: 12, title: '待付款' },
  payed: { value: 13, title: '待发货' },
  shipping: { value: 14, title: '已发货' },
  shipped: { value: 15, title: '已收货' },
  finished: { value: 16, title: '完成' },
  cancelling: { value: 17, title: '取消中' },
  cancelled: { value: 18, title: '已取消' },
};

export const userTypes = [
  { icon: 'shopping_basket', title: '逛逛再说', value: '一般用户', subtitle: '您可以稍候在个人信息里重新选择' },
  { icon: 'home', title: '我要开店', value: '微店店主' },
  { icon: 'shopping_cart', title: '农产农资收购', value: '农产农资收购' },
  { icon: 'store_mall_directory', title: '农产农资供货', value: '农产农资供货' },
  { icon: 'local_shipping', title: '物流', value: '物流供应商' },
  { icon: 'headset_mic', title: '注册农贸专家', value: '农贸专家' },
];

export const certTypes = {
  personal: { value: 'personal', title: '实名认证' },
  company: { value: 'company', title: '企业(工商)认证' },
  product: { value: 'product', title: '产品认证' },
  expert: { value: 'expert', title: '专家认证' },
};

export const catalogTypes = {
  supply: {
    farm: { title: '农产品', value: '农产品' },
  },
  shop: {
    shop: { title: '商品分类', value: '商品分类' },
    farm: { title: '农产品', value: '农产品' },
  },
  logistics: {},
  trip: {},
};

export const units = [
  '斤', '两', '公斤', '克', '袋', '盒', '箱', '包', '只', '条', '台',
];
export const productLabels = {
  available: { title: '上架', key: 'available', value: 'available' },
};

export const shopProductLabels = {
  ...productLabels,
  recommend: { title: '店长推荐', key: 'recommend', value: 'recommend' },
  agent: { title: '可代销', key: 'agent', value: 'agent' },
};

export const supplyLabels = {
  ...productLabels,
  includesTransportation: { title: '包运费', key: 'includesTransportation', value: 'includesTransportation' },
  supportsLogistics: { title: '协助找物流', key: 'supportsLogistics', value: 'supportsLogistics' },
  supportsDelivery: { title: '支持走快递', key: 'supportsDelivery', value: 'supportsDelivery' },
};

export const logisticsLabels = {
  ...productLabels,
};

export const tripLabels = {
  ...productLabels,
};

export const provinces = [
  { title: '北京', value: '北京市' },
  { title: '天津', value: '天津市' },
  { title: '上海', value: '上海市' },

  { title: '重庆', value: '重庆市' },
  { title: '河北', value: '河北省' },
  { title: '山西', value: '山西省' },

  { title: '内蒙古', value: '内蒙古自治区' },
  { title: '辽宁', value: '辽宁省' },
  { title: '吉林', value: '吉林省' },

  { title: '黑龙江', value: '黑龙江省' },
  { title: '江苏', value: '江苏省' },
  { title: '浙江', value: '浙江省' },

  { title: '安徽', value: '安徽省' },
  { title: '福建', value: '福建省' },
  { title: '江西', value: '江西省' },

  { title: '山东', value: '山东省' },
  { title: '河南', value: '河南省' },
  { title: '湖北', value: '湖北省' },

  { title: '湖南', value: '湖南省' },
  { title: '广东', value: '广东省' },
  { title: '广西', value: '广西壮族自治区' },

  { title: '海南', value: '海南省' },
  { title: '四川', value: '四川省' },
  { title: '贵州', value: '贵州省' },

  { title: '云南', value: '云南省' },
  { title: '西藏', value: '西藏自治区' },
  { title: '陕西', value: '陕西省' },

  { title: '甘肃', value: '甘肃省' },
  { title: '青海', value: '青海省' },
  { title: '宁夏', value: '宁夏回族自治区' },

  { title: '新疆', value: '新疆维吾尔自治区' },
  { title: '香港', value: '香港特别行政区' },
  { title: '澳门', value: '澳门特别行政区' },
];

export const badges = {
  idVerified: {
    title: '实名认证', value: 'idVerified',
  },
  companyVerified: {
    title: '企业认证', value: 'companyVerified',
  },
  expertVerified: {
    title: '专家认证', value: 'expertVerified',
  },
};

export const districtLevels = {
  country: { value: 'country', title: '全国范围', child: 'province' },
  province: { value: 'province', title: '省内', child: 'city' },
  city: { value: 'city', title: '市内', child: 'district' },
  district: { value: 'district', title: '区县内', child: 'street' },
  custom: { value: 'custom', title: '自定义' },
};
