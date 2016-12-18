import { reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { actions, selectors } from '../../api/ducks';

import SignupOrLoginForm from '../components/form';

// export for unit testing
export const validate = (values) => {
  const phone = values.phone;
  const smsCode = values.smsCode;
  const errors = {};
  if (!phone) {
    errors.phone = 'Required';
  } else if (!/1\d{10}$/i.test(phone)) {
    errors.phone = '请输入正确的号码';
  }
  if (!smsCode) {
    errors.smsCode = 'Required';
  } else if (!/\d{6}$/i.test(smsCode)) {
    errors.smsCode = '请输入6位数字验证码';
  }
  return errors;
};

export default reduxForm({
  form: 'signupOrLogin',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
})(connect(
  // (state) => ({ requestSmsCodeState: selectors.requestSmsCode(state) }),
  (state) => ({ signupOrLoginWithMobilePhoneState: selectors.signupOrLoginWithMobilePhone(state) }),
  (dispatch) => ({
    onSubmit: ({ phone, smsCode }) => new Promise((resolve, reject) => {
      const rejectFuc = (err) => {
        reject(new SubmissionError({ _error: { code: err.code, message: err.message } }));
      };

      const resolveFuc = () => {
        // TODO donot fetch profile in case of redirecting to profile page
        dispatch(actions.fetchProfile({ meta: { resolve, reject: rejectFuc } }));
      };

      dispatch(actions.fetchProfile({ meta: { resolve, reject: rejectFuc } }));
      // dispatch(actions.signupOrLoginWithMobilePhone({ phone, smsCode, meta: { resolve: resolveFuc, reject: rejectFuc } }));
    }),
  })
)(SignupOrLoginForm));
