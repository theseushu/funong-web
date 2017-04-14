import React, { PropTypes } from 'react';
import buttonLoading from 'assets/buttonLoading.gif';
import IconButton from 'react-mdl/lib/IconButton';

const ApiIconButton = ({ icon, pending, disabled, ...props }) => (
  pending ? (
    <div style={{ display: 'inline-block', boxSizing: 'border-box', width: 32, height: 32, padding: 4 }}>
      <img style={{ width: 24, height: 24 }} role="presentation" src={buttonLoading} />
    </div>
  ) : (
    <IconButton
      {...props}
      disabled={!!disabled || !!pending}
      name={icon}
    />
  )
);

ApiIconButton.propTypes = {
  disabled: PropTypes.bool,
  pending: PropTypes.bool,
  icon: PropTypes.string,
};

export default ApiIconButton;
