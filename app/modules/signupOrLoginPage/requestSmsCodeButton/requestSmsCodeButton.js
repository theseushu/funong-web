import React, { PropTypes } from 'react';
import Button from 'react-mdl/lib/Button';
import _now from 'lodash/now';

import CountDown from '../../common/CountDown';

export const ButtonSendSmsCode = ({ onClick, phone, text, disabled }) => (
  <Button
    raised
    colored
    onClick={(e) => {
      e.preventDefault();
      onClick({ mobilePhoneNumber: phone });
    }}
    disabled={disabled}
  >
    {text}
  </Button>
);

ButtonSendSmsCode.propTypes = {
  onClick: PropTypes.func.isRequired,
  phone: PropTypes.string,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export const CountDownButton = ({ remains, phone, onClick, disabled }) => {
  if (remains != null && remains > 0) { // put disabled at last so it can override 'disabled' in props
    return (<Button raised colored disabled>
      {`再次发送(${remains})`}</Button>);
  }
  return <ButtonSendSmsCode disabled={disabled} phone={phone} onClick={onClick} text="发送验证码" bsStyle="primary" />;
};

CountDownButton.propTypes = {
  remains: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  phone: PropTypes.string,
  disabled: PropTypes.bool,
};

// the keys in props are slice state in store and action creators. see ./ducks.js
const RequestSmsCodeButton = ({ pending, fulfilled, time = 0, rejected, onClick, phone, disabled }) => {
  if (pending) { // put disabled at last so it can override 'disabled' in props
    return <Button colored raised disabled>发送验证码</Button>;
  } else if (rejected) {
    return <ButtonSendSmsCode disabled={disabled} text="发送失败,请重试" phone={phone} onClick={onClick} bsStyle="warning"></ButtonSendSmsCode>;
  } else if (fulfilled) { // count 1 min since ${time}
    return (
      <CountDown value={(time - _now()) + (60 * 1000)}>
        <CountDownButton disabled={disabled} onClick={onClick} phone={phone} />
      </CountDown>
    );
  }
  return <ButtonSendSmsCode disabled={disabled} onClick={onClick} phone={phone} text="发送验证码" bsStyle="primary" />;
};

RequestSmsCodeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  pending: PropTypes.bool,
  fulfilled: PropTypes.bool,
  time: PropTypes.number,
  rejected: PropTypes.bool,
  phone: PropTypes.string,
  disabled: PropTypes.bool,
};

export default RequestSmsCodeButton;
