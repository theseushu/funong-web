import _filter from 'lodash/filter';
import _groupBy from 'lodash/groupBy';

export const groupByOrder = (items) => {
  const shopItems = Object.values(_filter(items, (item) => !!item.shopProduct));
  const supplyItems = Object.values(_filter(items, (item) => !!item.supplyProduct));
  const shopGroups = Object.values(_groupBy(shopItems, (item) => item.shopProduct.shop.objectId));
  const supplyGroups = Object.values(_groupBy(supplyItems, (item) => item.supplyProduct.owner.objectId));
  return {
    shop: shopGroups,
    supply: supplyGroups,
  };
}
