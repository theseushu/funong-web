import productTypes from './productTypes';

export default {
  [productTypes.supply]: {
    delivery: {
      title: '送货',
      value: 'delivery',
    },
    refrigeration: {
      title: '货品打冷',
      value: 'refrigeration',
    },
    cleaning: {
      title: '清洗净品',
      value: 'cleaning',
    },
    reports: {
      title: '农残留检测',
      value: 'reports',
    },
  },
  [productTypes.shop]: {
  },
  [productTypes.logistics]: {
  },
  [productTypes.trip]: {
  },
};
