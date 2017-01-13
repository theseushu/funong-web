import React, { PropTypes } from 'react';

import { Card, CardTitle, CardActions } from 'react-mdl/lib/Card';
import Button from 'react-mdl/lib/Button';
import Textfield from 'react-mdl/lib/Textfield';

// import FaMobile from 'react-icons/lib/fa/mobile';
// import MdTextsms from 'react-icons/lib/md/textsms';


const PhoneField = ({ RequestSmsCodeButton }) => {
  const showError = (false);
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Textfield
        id="phoneInput"
        onChange={() => {}}
        label="手机号码"
        floatingLabel
        style={{ flex: 1 }}
        autoComplete="off"
        type="tel"
        required
        value={11111111111}
        error={showError ? '' : ''}
      />
      <RequestSmsCodeButton phone={''} disabled onClick={() => {}}></RequestSmsCodeButton>
    </div>
  );
};

PhoneField.propTypes = {
  RequestSmsCodeButton: PropTypes.oneOfType([PropTypes.element.isRequired, PropTypes.func.isRequired]),
};

const SmsField = () => {
  const showError = false;
  return (
    <Textfield
      id="smsCodeInput"
      onChange={() => {}}
      label="短信验证码"
      floatingLabel
      style={{ width: '100%' }}
      maxLength={6}
      value={111111}
      autoComplete="off"
      type="tel"
      required
      error={showError ? '' : ''}
    />
  );
};

SmsField.propTypes = {
};

// export for unit testing
const SignupOrLoginForm = ({ handleSubmit, RequestSmsCodeButton }) => (

  <form onSubmit={handleSubmit} style={{ width: '100%', flexDirection: 'column', textAlign: 'center' }}>
    <h3 className="text-center">立即加入</h3>
    <PhoneField RequestSmsCodeButton={RequestSmsCodeButton} />
    <SmsField />
    <Button raised colored style={{ width: '80%' }}>确定</Button>
  </form>
);

SignupOrLoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  RequestSmsCodeButton: PropTypes.any,
};

export default SignupOrLoginForm;
