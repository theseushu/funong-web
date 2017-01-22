import React, { PropTypes } from 'react';
import Button from 'react-mdl/lib/Button';

const RaisingButton = ({ label, active = false, onClick }) => (
  <Button
    raised={active}
    colored
    onClick={active ? null : onClick}
  >
    {label}
  </Button>
);

RaisingButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
};

export default RaisingButton;
