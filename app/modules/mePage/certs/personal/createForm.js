import { reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { certTypes } from 'appConstants';
import { actions } from 'api/cert';
import personalCertForm from './form';
import { personal } from '../selectors';

const createCert = actions.create;
const updateCert = actions.update;

const DEFAULT = {
  name: '',
  IDCard: '',
  images: [],
};

export default (cert) => reduxForm({
  form: 'personalCert',  // a unique identifier for this form
  initialValues: cert ? {
    name: cert.fields.name,
    IDCard: cert.fields.IDCard,
    images: cert.images,
  } : DEFAULT,
})(connect(
  (state) => ({ cert: personal(state) }),
  (dispatch) => ({
    onSubmit: ({ name, IDCard, images }) => new Promise((resolve, reject) => {
      const params = { type: certTypes.personal.value, fields: { name, IDCard }, images, meta: { resolve, reject: (err) => reject(new SubmissionError({ _error: { code: err.code, message: err.message } })) } };
      if (cert) {
        dispatch(updateCert({ objectId: cert.objectId, ...params }));
      } else {
        dispatch(createCert(params));
      }
    }),
  })
)(personalCertForm));
