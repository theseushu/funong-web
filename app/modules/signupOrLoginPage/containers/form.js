import { reduxForm } from 'redux-form';

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
})(SignupOrLoginForm);
