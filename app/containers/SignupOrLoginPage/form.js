import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
// import RequestSmsCodeButton from "../requestSmsCode/buttonWithCountDownTimer";
// import {saveSessionTokenInCookie, signUpOrlogInWithMobilePhone} from "../../api";
// import {actionCreators} from '../refreshSessionToken/ducks';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

//
// const confirmButtonStyle = () => ({
//   width: '60%',
//   maxWidth: '100%',
//   marginBottom: '20px'
// });
// const confirmPhoneField = () => ({
//   position: 'relative',
//   paddingLeft: '2em',
//   '> ._requestSmsButton': {
//     position: 'absolute',
//     height: '72px',
//     right: 0,
//     top: '14px',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center'
//   },
//   '> ._label': {
//     position: 'absolute',
//     left: 0,
//     top: '36px',
//   }
// });
// const errorMessage = ({color}) => ({
//   display: 'flex',
//   justifyContent: 'center',
//   color
//
// });

const validate = (values) => {
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

const PhoneField = ({ name, input: { value, onChange }, meta: { dirty, error } }) => {
  const showError = (!!dirty) && (!!error);
  return (
    <FormGroup validationState={showError ? 'error' : undefined}>
      <ControlLabel>手机号码</ControlLabel>
      <InputGroup>
        <InputGroup.Addon>
          $
        </InputGroup.Addon>
        <FormControl placeholder="手机号码" type="tel" name={name} value={value} maxLength={11} onChange={(e) => onChange(e.target.value)} />
        <InputGroup.Button>
          <Button disabled={showError ? true : undefined}>Before</Button>
        </InputGroup.Button>
      </InputGroup>
      {showError && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  );
};

PhoneField.propTypes = {
  name: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

const SmsField = ({ name, input: { value, onChange }, meta: { dirty, error } }) => {
  const showError = (!!dirty) && (!!error);
  return (
    <FormGroup validationState={showError ? 'error' : undefined}>
      <ControlLabel>短信验证码</ControlLabel>
      <InputGroup>
        <InputGroup.Addon>
          $
        </InputGroup.Addon>
        <FormControl placeholder="短信验证码" type="tel" autoComplete="off" name={name} value={value} maxLength={6} onChange={(e) => onChange(e.target.value)} />
      </InputGroup>
      {showError && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  );
};

SmsField.propTypes = {
  name: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

class SignupOrLoginForm extends Component {
  onSubmit = () =>
    // const history = this.context.history;
     new Promise((

     ) => {
       // signUpOrlogInWithMobilePhone(values.phone, values.smsCode)
       //  .then((user) => {
       //    resolve(user);
       //    if (user.password != null) {
       //      // history.push('/desktops'); //TODO go to former page
       //    } else {
       //      // history.push('/fetchProfile', {})
       //    }
       //  })
       //  .catch((err) => {
       //    reject(new SubmissionError({ _error: { code: err.code, message: err.message } }));
       //  });
     })

  render() {
    const { handleSubmit, pristine, submitting, invalid, error } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <h3 className="text-center">立即加入</h3>
        <div>
          <Field name="phone" component={PhoneField} />
        </div>
        <div>
          <Field name="smsCode" component={SmsField} />
        </div>
        { error && (
          <div className={''}>
            <span>{error.message}</span>
          </div>
        )
        }
        <div className="text-center">
          <Button
            type="submit" bsStyle="primary" block
            disabled={pristine || invalid || submitting}
          >确定</Button>
        </div>
      </form>
    );
  }
}

SignupOrLoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  error: PropTypes.any,
};

export default reduxForm({
  form: 'signupOrLogin',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
})(SignupOrLoginForm);
