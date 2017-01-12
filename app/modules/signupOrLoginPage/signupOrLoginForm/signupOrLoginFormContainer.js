import { reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { fetchProfile } from '../../api/fetchProfile';
import { selector, signupOrLogin } from '../../api/signupOrLogin';

import SignupOrLoginForm from './signupOrLoginForm';

// export for unit testing
export const validate = ({ phone, smsCode, password }, { login }) => {
  const errors = {};
  if (!phone) {
    errors.phone = 'Required';
  } else if (!/1\d{10}$/i.test(phone)) {
    errors.phone = '请输入正确的号码';
  }
  if (!login) {
    if (!smsCode) {
      errors.smsCode = 'Required';
    } else if (!/\d{6}$/i.test(smsCode)) {
      errors.smsCode = '请输入6位数字验证码';
    }
    if (!password) {
      errors.password = 'Required';
    } else if (!/.{6,20}$/i.test(password)) {
      errors.password = '请输入6位以上密码';
    }
  } else if (!smsCode && !password) {
    errors.smsCode = 'Required';
    errors.password = 'Required';
  } else if (smsCode && !/\d{6}$/i.test(smsCode)) {
    errors.smsCode = '请输入6位数字验证码';
  } else if (password && !/.{6,20}$/i.test(password)) {
    errors.password = '请输入6位以上密码';
  }
  return errors;
};

export default reduxForm({
  form: 'signupOrLogin',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
})(connect(
  // (state) => ({ requestSmsCodeState: selectors.requestSmsCode(state) }),
  (state) => ({ signupOrLoginWithMobilePhoneState: selector(state) }),
  (dispatch) => ({
    onSubmit: ({ phone, smsCode, password }) => new Promise((resolve, reject) => {
      const rejectFuc = (err) => {
        reject(new SubmissionError({ _error: { code: err.code, message: err.message } }));
      };

      const resolveFuc = () => {
        // TODO donot fetch profile in case of redirecting to profile page
        dispatch(fetchProfile({ meta: { resolve, reject: rejectFuc } }));
      };

      // use this line to skip real signup
      // dispatch(fetchProfile({ meta: { resolve, reject: rejectFuc } }));
      dispatch(signupOrLogin({ phone, smsCode, password, meta: { resolve: resolveFuc, reject: rejectFuc } }));
    }),
  })
)(SignupOrLoginForm));
