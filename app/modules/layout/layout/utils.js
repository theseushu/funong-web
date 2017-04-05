const routes = {
  supply: { title: '供应', icon: 'goat', path: '/supplies' },
  inquiry: { title: '采购', icon: 'network_check', path: '/inquiries' },
  trip: { title: '乡村游', icon: 'rowing', path: '/trips' },
  meFarm: { title: '我的富农', icon: 'person', path: '/me?farm=true' },
  me: { title: '我的富农', icon: 'person', path: '/me' },
  logistics: { title: '物流', icon: 'local_shipping', path: '/logisticsList' },
  product: { title: '微店', icon: 'shopping_basket', path: '/products' },
  flashSale: { title: '秒杀', icon: 'add_alert', path: '/flashSales' },
  switchFarm: { title: '农产市场', icon: 'goat', path: '/supplies' },
  switchShop: { title: '社区微店', icon: 'shopping_basket', path: '/products' },
};

export const findRoutes = (router, ignoreSwitch) => {
  let result = [];
  let switchRoute = [];
  if (router.isActive('/supplies', true)
    || router.isActive('/inquiries', true)
    || router.isActive('/logisticsList', true)
    || router.isActive({ pathname: '/me', query: { farm: true } }, true)) {
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
