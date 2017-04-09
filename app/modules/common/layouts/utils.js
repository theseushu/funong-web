import { productTypes, icons } from 'appConstants';
const routes = {
  supply: { title: '供应', icon: icons[productTypes.supply], path: '/supplies' },
  inquiry: { title: '采购', icon: icons.inquiry, path: '/inquiries' },
  trip: { title: '乡村游', icon: icons[productTypes.trip], path: '/trips' },
  meFarm: { title: '我的富农', icon: icons.me, path: '/me?farm=true' },
  me: { title: '我的富农', icon: icons.me, path: '/me' },
  logistics: { title: '物流', icon: icons[productTypes.logistics], path: '/logisticsList' },
  product: { title: '微店', icon: icons[productTypes.shop], path: '/products' },
  flashSale: { title: '秒杀', icon: icons.flashSale, path: '/flashSales' },
  switchFarm: { title: '农产市场', icon: icons[productTypes.supply], path: '/supplies' },
  switchShop: { title: '社区微店', icon: icons[productTypes.shop], path: '/products' },
};

export const findRoutes = (router, ignoreSwitch) => {
  let result = [];
  let switchRoute = [];
  if (router.isActive('/supplies')
    || router.isActive('/inquiries')
    || router.isActive('/logisticsList')
    || router.isActive({ pathname: '/me', query: { farm: true } })) {
    result = [
      routes.supply,
      routes.inquiry,
      routes.logistics,
      routes.meFarm,
    ];
    switchRoute = ignoreSwitch ? [] : [routes.switchShop];
  } else {
    result = [
      routes.product,
      routes.flashSale,
      routes.trip,
      routes.me,
    ];
    switchRoute = ignoreSwitch ? [] : [routes.switchFarm];
  }
  return [...result, ...switchRoute];
};
