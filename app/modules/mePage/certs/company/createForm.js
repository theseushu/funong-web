import { reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { certTypes } from '../../../../constants';
import { updateCert } from '../../../api/updateCert';
import { createCert } from '../../../api/createCert';
import companyCertForm from './form';
import { company } from '../selectors';

// export for unit testing
export const validate = ({ name, corporate, isUnified = '', unifiedCode = '', registrationCode = '', cooperationCode = '', images }) => ({
  name: name ? undefined : 'Required',
  corporate: corporate ? undefined : 'Required',
  images: (!images || images.length === 0) ? 'Required' : undefined,
  unifiedCode: (isUnified === '' && unifiedCode.length === 0) ? 'Required' : undefined,
  registrationCode: (isUnified !== '' && registrationCode.length === 0) ? 'Required' : undefined,
  cooperationCode: (isUnified !== '' && cooperationCode.length === 0) ? 'Required' : undefined,
});

export default (cert = {}) => reduxForm({
  form: 'companyCert',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
  initialValues: {
    name: cert.name || '',
    corporate: cert.corporate || '',
    isUnified: cert.isUnified ? '' : 'old',
    unifiedCode: cert.unifiedCode || '',
    registrationCode: cert.registrationCode || '',
    cooperationCode: cert.cooperationCode || '',
    images: cert.images || [],
  },
})(connect(
  (state) => ({ cert: company(state) }),
  (dispatch) => ({
    onSubmit: ({ name, corporate, isUnified, unifiedCode, registrationCode, cooperationCode, images }) => new Promise((resolve, reject) => {
      const params = { type: certTypes.company, name, corporate, isUnified: isUnified === '', unifiedCode, registrationCode, cooperationCode, images, meta: { resolve, reject: (err) => reject(new SubmissionError({ _error: { code: err.code, message: err.message } })) } };
      if (cert.objectId) {
        dispatch(updateCert({ objectId: cert.objectId, ...params }));
      } else {
        dispatch(createCert(params));
      }
    }),
  })
)(companyCertForm));
