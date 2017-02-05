import React, { PropTypes } from 'react';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import FaStar from 'react-icons/lib/fa/star';

const Field = ({ label, required, meta: { dirty, error }, children }) => {
  const showError = (!!dirty) && (!!error);
  const validateState = !error ? 'success' : null;
  return (
    <FormGroup validationState={showError ? 'error' : validateState}>
      <ControlLabel>{label} {required ? <FaStar className={!dirty ? 'text-warning' : 'default'} /> : null}</ControlLabel>
      { children }
      {showError && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  );
};

Field.propTypes = {
  label: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  meta: PropTypes.shape({
    dirty: PropTypes.bool.isRequired,
    error: PropTypes.any,
  }).isRequired,
  children: PropTypes.any.isRequired,
};

export default Field;
