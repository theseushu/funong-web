import React, { PropTypes } from 'react';
import { Field, Fields } from 'redux-form';
import Button from 'react-mdl/lib/Button';
import Textfield from 'react-mdl/lib/Textfield';
import styles from '../../common/styles';

const PhoneField = ({ input: { value, onChange }, meta: { dirty, error }, RequestSmsCodeButton }) => {
  const showError = (!!dirty) && (!!error);
  return (
    <div className={styles.contentCenter} style={{ width: '100%' }}>
      <Textfield
        id="_phoneInput"
        onChange={(e) => onChange(e.target.value)}
        label="手机号码"
        floatingLabel
        style={{ flex: 1 }}
        maxLength={13}
        type="tel"
        required
        value={value}
        error={showError ? error : ''}
      />
      <RequestSmsCodeButton phone={value} disabled={!!error} onClick={() => {}}></RequestSmsCodeButton>
    </div>
  );
};

PhoneField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  RequestSmsCodeButton: PropTypes.oneOfType([PropTypes.element.isRequired, PropTypes.func.isRequired]),
};

const SmsField = ({ input: { value, onChange }, meta: { dirty, error }, disabled }) => {
  const showError = (!!dirty) && (!!error);
  return (
    <Textfield
      id="_smsCodeInput"
      onChange={(e) => onChange(e.target.value)}
      label="短信验证码"
      floatingLabel
      style={{ width: '100%' }}
      maxLength={6}
      value={value}
      autoComplete="off"
      type="tel"
      required={error === 'Required'}
      error={showError ? error : ''}
      disabled={disabled}
    />
  );
};

SmsField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
};

const PasswordField = ({ input: { value, onChange }, meta: { dirty, error }, disabled }) => {
  const showError = (!!dirty) && (!!error);
  return (
    <Textfield
      id="_smsCodeInput"
      onChange={(e) => onChange(e.target.value)}
      label="密码"
      floatingLabel
      style={{ width: '100%' }}
      maxLength={20}
      value={value}
      autoComplete="off"
      type="password"
      required={error === 'Required'}
      error={showError ? error : ''}
      disabled={disabled}
    />
  );
};

PasswordField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
};

const SmsCodeAndPasswordFields = ({ login, password, smsCode }) => (
  <div>
    <SmsField {...smsCode} disabled={login && (!!password.input.value && !smsCode.input.value)} />
    <PasswordField {...password} disabled={login && !!smsCode.input.value} />
  </div>
  );
SmsCodeAndPasswordFields.propTypes = {
  login: PropTypes.bool.isRequired,
  password: PropTypes.object.isRequired,
  smsCode: PropTypes.object.isRequired,
};

// export for unit testing
const SignupOrLoginForm = (props) => {
  const { login, handleSubmit, pristine, submitting, submitSucceeded, invalid, error, onSubmit, RequestSmsCodeButton } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Field name="phone" component={PhoneField} RequestSmsCodeButton={RequestSmsCodeButton} />
      </div>
      {login ? <small>您可以使用密码或短信验证码登录<br />两者只需输入一个</small> : null}
      <Fields login={login} names={['smsCode', 'password']} component={SmsCodeAndPasswordFields} />
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
        <Button raised colored type="submit" disabled={pristine || invalid || submitting || submitSucceeded}>确定</Button>
      </div>
    </form>
  );
};

SignupOrLoginForm.propTypes = {
  login: PropTypes.bool.isRequired,
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
