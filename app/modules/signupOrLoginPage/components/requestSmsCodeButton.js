import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import _now from 'lodash/now';

import CountDown from '../../common/CountDown';

export const ButtonSendSmsCode = ({ onClick, phone, text, bsStyle }) => (
  <Button
    bsStyle={bsStyle}
    onClick={(e) => {
      e.preventDefault();
      onClick(phone);
    }}
  >
    {text}
  </Button>
);

ButtonSendSmsCode.propTypes = {
  onClick: PropTypes.func.isRequired,
  phone: PropTypes.string,
  text: PropTypes.string.isRequired,
  bsStyle: PropTypes.string.isRequired,
};

export const CountDownButton = ({ remains, phone, onClick }) => {
  if (remains != null && remains > 0) { // put disabled at last so it can override 'disabled' in props
    return (<Button disabled>
      {`再次发送(${remains})`}</Button>);
  }
  return <ButtonSendSmsCode phone={phone} onClick={onClick} text="发送验证码" bsStyle="primary" />;
};

CountDownButton.propTypes = {
  remains: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  phone: PropTypes.string,
};

// the keys in props are slice state in store and action creators. see ./ducks.js
const RequestSmsCodeButton = ({ pending, fulfilled, time = 0, rejected, onClick, phone }) => {
  if (pending) { // put disabled at last so it can override 'disabled' in props
    return <Button disabled>发送验证码</Button>;
  } else if (rejected) {
    return <ButtonSendSmsCode text="发送失败,请重试" phone={phone} onClick={onClick} bsStyle="warning"></ButtonSendSmsCode>;
  } else if (fulfilled) { // count 1 min since ${time}
    return (
      <CountDown value={(time - _now()) + (60 * 1000)}>
        <CountDownButton onClick={onClick} phone={phone} />
      </CountDown>
    );
  }
  return <ButtonSendSmsCode onClick={onClick} phone={phone} text="发送验证码" bsStyle="primary" />;
};

RequestSmsCodeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  pending: PropTypes.bool,
  fulfilled: PropTypes.bool,
  time: PropTypes.number,
  rejected: PropTypes.bool,
  phone: PropTypes.string,
};

export default RequestSmsCodeButton;
