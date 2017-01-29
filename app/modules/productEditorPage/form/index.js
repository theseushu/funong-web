import { reduxForm } from 'redux-form';
import _isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSupplyProduct as createSupplyProductAction, selector } from '../../api/createSupplyProduct';
import FORM_NAME from './formName';
import productForm from './form';

// const INITIAL_VALUE = {
//   category: null,
//   species: null,
//   name: '',
//   specs: [],
//   location: null,
//   desc: null,
//   available: true,
// };

const INITIAL_VALUE = { available: true, category: { name: '人参果', objectId: '5859445ddc9477148f492652', catalog: { objectId: '1', name: 'aaaa', catalogType: 'adlafdjklsa' } }, species: { category: '5859445ddc9477148f492652', name: '人参果元宝', objectId: '58594477dc9477148f493350' }, name: '人参果 人参果元宝', specs: [{ name: '默认', params: ['123 rfdqf'], prices: [{ minCount: 1, unit: '斤', value: 1 }] }], location: { address: { country: '中国', province: '湖北省', city: '武汉市', district: '江夏区', details: '湖北省武汉市江夏区江夏区经济开发区藏龙岛街道藏龙大道40号湖北城市建设职业技术学院' }, lnglat: { longitude: 114.43427, latitude: 30.40506 } }, desc: { text: 'dfsadfdsafdsafdas', images: [{ name: '1485723387376.png', url: 'http://ac-ouy08OrF.clouddn.com/1e3f26168703a1a9ae8f.png', metaData: { owner: '58774b8d61ff4b0065df953d', width: 1024, height: 287 }, base64: '', mime_type: 'image/png', objectId: '588e56fb570c350062105312', __type: 'File', id: '588e56fb570c350062105312' }] } };
// export for unit testing
export const validate = (values) => {
  const { category, species, name, specs, location, desc } = values;
  const errors = {};
  if (_isEmpty(category)) {
    errors.category = '必填';
  }
  if (_isEmpty(species)) {
    errors.species = '必填';
  }
  if (_isEmpty(name) || name.length < 3) {
    errors.name = '必填, 至少3个字';
  }
  if (_isEmpty(specs)) {
    errors.specs = '必填';
  }
  if (_isEmpty(location)) {
    errors.location = '必填';
  }
  if (_isEmpty(desc)) {
    errors.desc = '必填';
  } else if (desc.length < 20) {
    errors.desc = '请至少输入20字描述';
  }
  return errors;
};

export default (product) => reduxForm({
  form: FORM_NAME,  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
  initialValues: product || INITIAL_VALUE,
})(connect(
  (state) => ({ createSupplyProductState: selector(state) }),
  (dispatch) => bindActionCreators({ createSupplyProduct: createSupplyProductAction }, dispatch),
)(productForm));
