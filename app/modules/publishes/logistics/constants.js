import { statusValues, publishTypesInfo, publishTypes } from 'appConstants';
import { actions as publishesActions } from 'api/publishes/ducks';

const type = publishTypes.logistics;
const info = publishTypesInfo[type];

export default type;
export const shop = info.shop;

// page for list
export const listRoute = {
  path: `/${info.plural}`,
  name: info.plural,
};

export const disabled = ['category']; // disable search by category

// page for single product
export const pageRoute = {
  path: `/${info.route}/:id`,
  name: info.route,
};

export const actions = publishesActions[type];

export const FORM_NAME = type;

export const EMPTY_PRODUCT = {
  capacity: '',
  count: '1',
  price: '',
  range: [],
  name: '',
  location: null,
  desc: '',
  images: [],
  status: statusValues.unavailable.value,
  labels: [],
};

// export const EMPTY_PRODUCT = {
//   capacity: '500',
//   count: '1',
//   price: '5吨以下50元/吨公里， 10吨以下40元/吨公里，10吨以上30元/吨公里',
//   range: [{
//     title: '北京',
//     value: '北京',
//   }],
//   name: '500吨， 北京',
//   location: { address: { country: '中国', province: '湖北省', city: '武汉市', district: '江夏区', details: '湖北省武汉市江夏区江夏区经济开发区藏龙岛街道藏龙大道40号湖北城市建设职业技术学院' }, lnglat: { longitude: 114.43427, latitude: 30.40506 } },
//   desc: 'dfsadfdsafdsafdas',
//   images: [{ name: '1485723387376.png', url: 'http://ac-ouy08OrF.clouddn.com/1e3f26168703a1a9ae8f.png', metaData: { owner: '58774b8d61ff4b0065df953d', width: 1024, height: 287 }, base64: '', mime_type: 'image/png', objectId: '588e56fb570c350062105312', __type: 'File', id: '588e56fb570c350062105312' }],
//   labels: [],
//   status: statusValues.unavailable.value,
// };
