import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
// import {saveSessionTokenInCookie, signUpOrlogInWithMobilePhone} from "../../api";
// import {actionCreators} from '../refreshSessionToken/ducks';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import FaMobile from 'react-icons/lib/fa/mobile';
import MdTextsms from 'react-icons/lib/md/textsms';

const PhoneField = ({ name, input: { value, onChange }, meta: { dirty, error }, RequestSmsCodeButton }) => {
  const showError = (!!dirty) && (!!error);
  return (
    <FormGroup validationState={showError ? 'error' : undefined}>
      <ControlLabel>手机号码</ControlLabel>
      <InputGroup>
        <InputGroup.Addon>
          <FaMobile />
        </InputGroup.Addon>
        <FormControl placeholder="手机号码" type="tel" name={name} value={value} maxLength={11} onChange={(e) => onChange(e.target.value)} />
        <InputGroup.Button>
          <RequestSmsCodeButton phone={value} disabled={!!error}></RequestSmsCodeButton>
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
  RequestSmsCodeButton: PropTypes.oneOfType([PropTypes.element.isRequired, PropTypes.func.isRequired]),
};

const SmsField = ({ name, input: { value, onChange }, meta: { dirty, error } }) => {
  const showError = (!!dirty) && (!!error);
  return (
    <FormGroup validationState={showError ? 'error' : undefined}>
      <ControlLabel>短信验证码</ControlLabel>
      <InputGroup>
        <InputGroup.Addon>
          <MdTextsms />
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

// export for unit testing
const SignupOrLoginForm = ({ handleSubmit, pristine, submitting, submitSucceeded, invalid, error, onSubmit, RequestSmsCodeButton }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <h3 className="text-center">立即加入</h3>
    <div>
      <Field name="phone" component={PhoneField} RequestSmsCodeButton={RequestSmsCodeButton} />
    </div>
    <div>
      <Field name="smsCode" component={SmsField} />
    </div>
    {
      error && (
        <p className={'text-center text-danger'}>
          <span>{error.message}</span>
        </p>
      )
    }
    {
      submitSucceeded && (
        <p className={'text-center text-info'}>
          <span>{'登录成功，请稍候'}</span>
        </p>
      )
    }
    <div className="text-center">
      <Button
        type="submit" bsStyle="primary" block
        disabled={pristine || invalid || submitting || submitSucceeded}
      >确定</Button>
    </div>
  </form>
);

SignupOrLoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
  invalid: PropTypes.bool,
  error: PropTypes.any,
  onSubmit: PropTypes.func.isRequired,
  RequestSmsCodeButton: PropTypes.oneOfType([PropTypes.element.isRequired, PropTypes.func.isRequired]),
};

export default SignupOrLoginForm;
