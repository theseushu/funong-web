export const statusValues = {
  unverified: { value: 0, title: '待审核' },
  verified: { value: 1, title: '已通过' },
  rejected: { value: 2, title: '已拒绝' },

  unconfirmed: { value: 11, title: '待确认' },
  unbilled: { value: 12, title: '待付款' },
  unshipped: { value: 13, title: '待发货' },
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

export const provinces = [
  { title: '北京', value: '北京' },
  { title: '天津', value: '天津' },
  { title: '上海', value: '上海' },

  { title: '重庆', value: '重庆' },
  { title: '河北', value: '河北' },
  { title: '山西', value: '山西' },

  { title: '内蒙古', value: '内蒙古' },
  { title: '辽宁', value: '辽宁' },
  { title: '吉林', value: '吉林' },

  { title: '黑龙江', value: '黑龙江' },
  { title: '江苏', value: '江苏' },
  { title: '浙江', value: '浙江' },

  { title: '安徽', value: '安徽' },
  { title: '福建', value: '福建' },
  { title: '江西', value: '江西' },

  { title: '山东', value: '山东' },
  { title: '河南', value: '河南' },
  { title: '湖北', value: '湖北' },

  { title: '湖南', value: '湖南' },
  { title: '广东', value: '广东' },
  { title: '广西', value: '广西' },

  { title: '海南', value: '海南' },
  { title: '四川', value: '四川' },
  { title: '贵州', value: '贵州' },

  { title: '云南', value: '云南' },
  { title: '西藏', value: '西藏' },
  { title: '陕西', value: '陕西' },

  { title: '甘肃', value: '甘肃' },
  { title: '青海', value: '青海' },
  { title: '宁夏', value: '宁夏' },

  { title: '新疆', value: '新疆' },
];

export const badges = {
  idVerified: {
    title: '实名认证', value: 'idVerified',
  },
  companyVerified: {
    title: '企业认证', value: 'idVerified',
  },
  expertVerified: {
    title: '专家认证', value: 'idVerified',
  },
};

export const districtLevels = {
  country: { value: 'country', title: '全国范围' },
  province: { value: 'province', title: '省内' },
  city: { value: 'city', title: '市内' },
  district: { value: 'district', title: '区县内' },
  custom: { value: 'custom', title: '自定义' },
};
