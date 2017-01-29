import { reduxForm, SubmissionError } from 'redux-form';
import _isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createProduct as createProductAction, selector } from '../../api/createProduct';
import FORM_NAME from './formName';
import productForm from './form';

const INITIAL_VALUE = {
  category: null,
  species: null,
  name: '',
  specs: [],
  location: null,
  desc: null,
};
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
  (state) => ({ createProductState: selector(state) }),
  (dispatch) => bindActionCreators({ createProduct: createProductAction }, dispatch),
)(productForm));
