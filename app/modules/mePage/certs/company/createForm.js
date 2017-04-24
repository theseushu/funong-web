import { reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { certTypes } from 'funong-common/lib/appConstants';
import { actions } from 'api/cert';
import companyCertForm from './form';
import { company } from '../selectors';

const createCert = actions.create;
const updateCert = actions.update;

// export for unit testing
export const validate = ({ name, corporate, isUnified = '', unifiedCode = '', registrationCode = '', cooperationCode = '', images }) => ({
  name: name ? undefined : 'Required',
  corporate: corporate ? undefined : 'Required',
  images: (!images || images.length === 0) ? 'Required' : undefined,
  unifiedCode: (isUnified === '' && unifiedCode.length === 0) ? 'Required' : undefined,
  registrationCode: (isUnified !== '' && registrationCode.length === 0) ? 'Required' : undefined,
  cooperationCode: (isUnified !== '' && cooperationCode.length === 0) ? 'Required' : undefined,
});

const DEFAULT = {
  name: '',
  corporate: '',
  isUnified: '',
  unifiedCode: '',
  registrationCode: '',
  cooperationCode: '',
  images: [],
};

export default (cert) => reduxForm({
  form: 'companyCert',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
  initialValues: cert ? {
    name: cert.fields.name,
    corporate: cert.fields.corporate,
    isUnified: cert.fields.isUnified ? '' : 'old',
    unifiedCode: cert.fields.unifiedCode,
    registrationCode: cert.fields.registrationCode,
    cooperationCode: cert.fields.cooperationCode,
    images: cert.images || [],
  } : DEFAULT,
})(connect(
  (state) => ({ cert: company(state) }),
  (dispatch) => ({
    onSubmit: ({ name, corporate, isUnified, unifiedCode, registrationCode, cooperationCode, images }) => new Promise((resolve, reject) => {
      const params = { type: certTypes.company.value, fields: { name, corporate, isUnified: isUnified !== 'old', unifiedCode, registrationCode, cooperationCode }, images, meta: { resolve, reject: (err) => reject(new SubmissionError({ _error: { code: err.code, message: err.message } })) } };
      if (cert && cert.objectId) {
        dispatch(updateCert({ objectId: cert.objectId, ...params }));
      } else {
        dispatch(createCert(params));
      }
    }),
  })
)(companyCertForm));
