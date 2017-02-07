import { reduxForm } from 'redux-form';
import _isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { actions, selectors } from 'api/supplyProduct';
import FORM_NAME from './formName';
import productForm from './form';

const createSupplyProduct = actions.create;
const createSupplyProductStateSelector = selectors.create;
const updateSupplyProduct = actions.update;

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

export default reduxForm({
  form: FORM_NAME,  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
  onSubmit: ({ category, species, name, specs, location, desc, available, labels }, dispatch, { initialValues }) => (
      initialValues.objectId ?
        new Promise((resolve, reject) => {
          dispatch(updateSupplyProduct({
            objectId: initialValues.objectId,
            category,
            species,
            name,
            specs,
            desc: desc.text,
            images: desc.images,
            location,
            available,
            labels,
            meta: {
              resolve,
              reject,
            },
          }));
        }) :
        new Promise((resolve, reject) => {
          dispatch(createSupplyProduct({
            category,
            species,
            name,
            specs,
            desc: desc.text,
            images: desc.images,
            location,
            available,
            labels,
            meta: {
              resolve,
              reject,
            },
          }));
        })
    ),
})(connect(
  (state) => ({ createSupplyProductState: createSupplyProductStateSelector(state) }),
)(productForm));
