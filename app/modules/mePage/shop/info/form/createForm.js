import { reduxForm, SubmissionError } from 'redux-form';
import _isEmpty from 'lodash/isEmpty';
import { actions } from 'api/shop';
import shopForm from './form';
import FORM_NAME from './formName';

const createShop = actions.create;
const updateShop = actions.update;

// export for unit testing

export const validate = ({ name, location, areas }) => {
  const errors = {};
  if (_isEmpty(name) || name.length < 3) {
    errors.name = '必填, 至少3个字';
  }
  if (_isEmpty(location)) {
    errors.location = '必填';
  }
  if (_isEmpty(areas)) {
    errors.areas = '必填';
  }
  return errors;
};

const DEFAULT = {
  name: '',
  location: null,
  areas: [],
  desc: '',
  images: [],
};

export default (shop) => reduxForm({
  form: FORM_NAME,  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
  initialValues: shop || DEFAULT,
  onSubmit: ({ name, location, desc, areas, images }, dispatch) => new Promise((resolve, reject) => {
    const params = {
      name,
      location,
      areas,
      desc,
      images,
      meta: { resolve, reject: (err) => reject(new SubmissionError({ _error: { code: err.code, message: err.message } })) },
    };
    if (shop) {
      dispatch(updateShop({ objectId: shop.objectId, ...params }));
    } else {
      dispatch(createShop(params));
    }
  }),
})(shopForm);
