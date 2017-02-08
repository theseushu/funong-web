import { reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { actions } from 'api/profile';
import { signupOrLogin } from 'api/signupOrLogin';
import SignupOrLoginForm from './signupOrLoginForm';

const fetchProfile = actions.fetch;

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
  null,
  (dispatch) => ({
    onSubmit: ({ phone, smsCode, password }) => new Promise((resolve, reject) => {
      const rejectFuc = (err) => {
        reject(new SubmissionError({ _error: { code: err.code, message: err.message } }));
      };

      const resolveFuc = () => {
        // TODO donot fetch profile in case of redirecting to profile page
        const fetchProfileResolveFunc = ({ profile }) => {
          resolve();
          if (!profile) {
            dispatch(push('/welcome'));
          }
        };
        const fetchProfileRejectFunc = () => {
        };
        dispatch(fetchProfile({ meta: { resolve: fetchProfileResolveFunc, reject: fetchProfileRejectFunc } }));
      };

      // use this line to skip real signup
      // dispatch(fetchProfile({ meta: { resolve, reject: rejectFuc } }));
      dispatch(signupOrLogin({ phone, smsCode, password, meta: { resolve: resolveFuc, reject: rejectFuc } }));
    }),
  })
)(SignupOrLoginForm));
