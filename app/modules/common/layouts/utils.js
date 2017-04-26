import { routes, publishTypes, publishTypesInfo } from 'funong-common/lib/appConstants';

const publishTypeToRoute = ({ title, icon, plural }) => ({ title, icon, path: routes[`page_${plural}`] });

const mainRoutes = {
  supply: publishTypeToRoute(publishTypesInfo[publishTypes.supply]),
  inquiry: publishTypeToRoute(publishTypesInfo[publishTypes.inquiry]),
  trip: publishTypeToRoute(publishTypesInfo[publishTypes.trip]),
  meFarm: { title: '我的富农', icon: 'person', path: `${routes.page_me}?farm=true` },
  me: { title: '我的富农', icon: 'person', path: routes.page_me },
  logistics: publishTypeToRoute(publishTypesInfo[publishTypes.logistics]),
  product: publishTypeToRoute(publishTypesInfo[publishTypes.product]),
  flashSale: publishTypeToRoute(publishTypesInfo[publishTypes.flashSale]),
  switchFarm: { ...publishTypeToRoute(publishTypesInfo[publishTypes.supply]), title: '农产市场', switch: { farm: true } },
  switchShop: { ...publishTypeToRoute(publishTypesInfo[publishTypes.product]), title: '社区微店', switch: { main: true } },
};

export const findRoutes = (site) => {
  let result = [];
  let switchRoute = [];
  if (site.farm) {
    result = [
      mainRoutes.supply,
      mainRoutes.inquiry,
      mainRoutes.logistics,
      mainRoutes.meFarm,
    ];
    switchRoute = [mainRoutes.switchShop];
  } else {
    result = [
      mainRoutes.product,
      mainRoutes.flashSale,
      mainRoutes.trip,
      mainRoutes.me,
    ];
    switchRoute = [mainRoutes.switchFarm];
  }
  return [...result, ...switchRoute];
};
