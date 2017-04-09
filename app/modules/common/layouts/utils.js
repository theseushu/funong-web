import { publishTypes, publishTypesInfo, icons } from 'appConstants';

const publishTypeToRoute = ({ title, icon, plural }) => ({ title, icon, path: `/${plural}` });

const routes = {
  supply: publishTypeToRoute(publishTypesInfo[publishTypes.supply]),
  inquiry: publishTypeToRoute(publishTypesInfo[publishTypes.inquiry]),
  trip: publishTypeToRoute(publishTypesInfo[publishTypes.trip]),
  meFarm: { title: '我的富农', icon: icons.me, path: '/me?farm=true' },
  me: { title: '我的富农', icon: icons.me, path: '/me' },
  logistics: publishTypeToRoute(publishTypesInfo[publishTypes.logistics]),
  product: publishTypeToRoute(publishTypesInfo[publishTypes.product]),
  flashSale: publishTypeToRoute(publishTypesInfo[publishTypes.flashSale]),
  switchFarm: { ...publishTypeToRoute(publishTypesInfo[publishTypes.supply]), title: '农产市场' },
  switchShop: { ...publishTypeToRoute(publishTypesInfo[publishTypes.product]), title: '社区微店' },
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
