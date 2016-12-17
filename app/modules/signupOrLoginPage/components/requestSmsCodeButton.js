import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import _now from 'lodash/now';

import CountDown from '../../../components/CountDown';

export const ButtonSendSmsCode = ({ onClick, phone, ...props }) => (
  <Button
    {...props} onClick={(e) => {
      e.preventDefault();
      onClick(phone);
    }}
  >
    发送验证码
  </Button>
);

ButtonSendSmsCode.propTypes = {
  onClick: PropTypes.func.isRequired,
  phone: PropTypes.number,
};

export const CountDownButton = ({ remains, phone, onClick, ...props }) => {
  if (remains != null && remains > 0) { // put disabled at last so it can override 'disabled' in props
    return (<Button primary {...props} disabled>
      {`再次发送(${remains})`}</Button>);
  }
  return <ButtonSendSmsCode phone={phone} onClick={onClick} {...props} />;
};

CountDownButton.propTypes = {
  remains: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  phone: PropTypes.number,
};

// the keys in props are slice state in store and action creators. see ./ducks.js
const RequestSmsCodeButton = ({ pending, fulfilled, time = 0, rejected, onClick, phone, ...props }) => {
  if (pending) { // put disabled at last so it can override 'disabled' in props
    return <Button primary {...props} disabled>发送验证码</Button>;
  } else if (rejected) {
    return <Button primary {...props}>发送失败,请重试</Button>;
  } else if (fulfilled) { // count 1 min since ${time}
    return (
      <CountDown value={(time - _now()) + (60 * 1000)}>
        <CountDownButton onClick={onClick} phone={phone} {...props} />
      </CountDown>
    );
  }
  return <ButtonSendSmsCode onClick={onClick} phone={phone} {...props} />;
};

RequestSmsCodeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  pending: PropTypes.bool,
  fulfilled: PropTypes.bool,
  time: PropTypes.number,
  rejected: PropTypes.bool,
  phone: PropTypes.number,
};

export default RequestSmsCodeButton;
