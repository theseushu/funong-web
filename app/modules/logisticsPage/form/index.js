import { reduxForm } from 'redux-form';
import _isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { actions, selectors } from '../../api/logisticsProduct';
import FORM_NAME from './formName';
import productForm from './form';

const createLogisticsProduct = actions.create;
const createLogisticsProductStateSelector = selectors.create;
const updateLogisticsProduct = actions.update;

// export for unit testing
export const validate = (values) => {
  const { capacity, maxNumber, price, range, name, location, desc } = values;
  const errors = {};
  if (capacity === null) {
    errors.capacity = '必填';
  } else if (!/^[0-9]{1,5}(\.[0-9])?$/.test(capacity.toString().trim())) { // 0.1 - 99999.99
    errors.capacity = '请使用正数，小数位一位。示例：100, 5.5, 0.8';
  }
  if (maxNumber === null) {
    errors.maxNumber = '必填';
  } else if (!/^[1-9][0-9]{0,3}$/.test(maxNumber.toString().trim())) { // 1 - 9999
    errors.maxNumber = '请使用正整数。示例：100, 最大9999';
  }
  if (_isEmpty(price)) {
    errors.price = '必填';
  } else if (price.length < 10) {
    errors.price = '不得少于10个字';
  }

  if (_isEmpty(range)) {
    errors.range = '必填';
  }
  if (_isEmpty(name) || name.length < 3) {
    errors.name = '必填, 至少3个字';
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
  onSubmit: ({ capacity, maxNumber, price, range, name, location, available, desc, labels }, dispatch, { initialValues }) => (
      initialValues.objectId ?
        new Promise((resolve, reject) => {
          dispatch(updateLogisticsProduct({
            objectId: initialValues.objectId,
            capacity: Number(capacity),
            maxNumber: Number(maxNumber),
            price,
            range,
            name,
            desc,
            available,
            location,
            labels,
            meta: {
              resolve,
              reject,
            },
          }));
        }) :
        new Promise((resolve, reject) => {
          dispatch(createLogisticsProduct({
            capacity: Number(capacity),
            maxNumber: Number(maxNumber),
            price,
            range,
            name,
            available,
            desc,
            location,
            labels,
            meta: {
              resolve,
              reject,
            },
          }));
        })
    ),
})(connect(
  (state) => ({ createLogisticsProductState: createLogisticsProductStateSelector(state) }),
)(productForm));
