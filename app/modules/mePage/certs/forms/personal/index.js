import { reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { certTypes } from '../../../../../constants';
import { updateCert } from '../../../../api/updateCert';
import { createCert } from '../../../../api/createCert';
import personalCertForm from './form';
import { personal } from '../../selectors';

// export for unit testing
export const validate = ({ name, IDCard, images }) => ({
  name: name ? undefined : 'Required',
  IDCard: IDCard ? undefined : 'Required',
  images: (!images || images.length === 0) ? 'Required' : undefined,
});

export default reduxForm({
  form: 'personalCert',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
})(connect(
  (state) => ({ cert: personal(state) }),
  (dispatch, { cert }) => ({
    onSubmit: ({ name, IDCard, images }) => new Promise((resolve, reject) => {
      const params = { type: certTypes.personal, name, IDCard, images, meta: { resolve, reject: (err) => reject(new SubmissionError({ _error: { code: err.code, message: err.message } })) } };
      if (cert) {
        dispatch(updateCert({ objectId: cert.objectId, ...params }));
      } else {
        dispatch(createCert(params));
      }
    }),
  })
)(personalCertForm));
