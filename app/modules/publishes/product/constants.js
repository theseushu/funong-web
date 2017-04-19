import { routes, catalogs, statusValues, publishTypesInfo, publishTypes } from 'appConstants';
import { actions as publishesActions } from 'api/publishes/ducks';

const type = publishTypes.product;
const info = publishTypesInfo[type];
export const catalogGroups = catalogs.groupedShop;

export default type;
export const shop = info.shop;
// page for list
export const listRoute = {
  path: routes[`page_${info.plural}`],
  name: `page_${info.plural}`,
};

// page for single product
export const pageRoute = {
  path: routes[`page_${info.route}`],
  name: `page_${info.route}`,
};

export const actions = publishesActions[type];

export const FORM_NAME = type;

export const EMPTY_PRODUCT = {
  category: null,
  species: null,
  name: '',
  specs: [],
  desc: '',
  images: [],
  labels: [],
  status: statusValues.unavailable.value,
};

export const TEST_PRODUCT = {
  category: {
    group: '少儿',
    name: '11-14岁',
    ordinal: 5,
    catalog: {
      type: '商品分类',
      name: '图书、音像、电子书刊',
      ordinal: 1,
      objectId: '589ef181128fe1002dab0090',
      createdAt: '2017-02-11T11:12:01.464Z',
      updatedAt: '2017-02-19T14:03:36.218Z',
    },
    objectId: '589ef94a8ac247002b8416c5',
    createdAt: '2017-02-11T11:45:14.231Z',
    updatedAt: '2017-02-11T11:45:14.231Z',
  },
  species: {
    status: '未审核',
    category: '589ef94a8ac247002b8416c5',
    creator: {
      __type: 'Pointer',
      className: 'Profile',
      objectId: '587e7bb28d6d810058dea970',
    },
    name: '童话',
    objectId: '58a9aab961ff4b45462ddb46',
    createdAt: '2017-02-19T14:24:57.421Z',
    updatedAt: '2017-02-19T14:24:57.421Z',
  },
  name: '11-14岁 童话',
  specs: [
    { name: '默认', params: ['精装本'], price: 10, unit: '本', minimum: 1 },
  ],
  desc: '<p>少年儿童的最爱！</p>\n<p>精装本，适合收藏!</p>',
  images: [{ name: '1487560701655.png', url: 'http://ac-ouy08OrF.clouddn.com/fd7ac04e143381e86e8d.png', metaData: { owner: '587e7bb28d6d810058dea970', width: 1024, height: 312 }, base64: '', mime_type: 'image/png', objectId: '58aa5ffd128fe1006a477b8e', __type: 'File', id: '58aa5ffd128fe1006a477b8e', thumbnail_80_80: 'http://ac-ouy08OrF.clouddn.com/fd7ac04e143381e86e8d.png?imageView/1/w/80/h/80/q/100/format/png', thumbnail_160_160: 'http://ac-ouy08OrF.clouddn.com/fd7ac04e143381e86e8d.png?imageView/1/w/160/h/160/q/100/format/png', thumbnail_300_300: 'http://ac-ouy08OrF.clouddn.com/fd7ac04e143381e86e8d.png?imageView/1/w/300/h/300/q/100/format/png', thumbnail_600_600: 'http://ac-ouy08OrF.clouddn.com/fd7ac04e143381e86e8d.png?imageView/1/w/600/h/600/q/100/format/png' }],
  status: statusValues.unavailable.value,
  labels: [],
};
