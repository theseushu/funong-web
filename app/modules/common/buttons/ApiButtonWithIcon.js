import React, { PropTypes } from 'react';
import buttonLoading from 'assets/buttonLoading.gif';
import Button from './ButtonWithIcon';

const ApiButtonWithIcon = ({ icon, pending, disabled, children, ...props }) => (
  <Button
    {...props}
    disabled={!!disabled || !!pending}
    icon={pending ? <img role="presentation" src={buttonLoading} /> : icon}
  >
    {children}
  </Button>
  );

ApiButtonWithIcon.propTypes = {
  disabled: PropTypes.bool,
  pending: PropTypes.bool,
  icon: PropTypes.string,
  children: PropTypes.string.isRequired,
};

export default ApiButtonWithIcon;
