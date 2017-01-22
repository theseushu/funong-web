import React, { PropTypes } from 'react';
import Textfield from 'react-mdl/lib/Textfield';

const NameField = ({ input: { value, onChange }, meta: { dirty, error } }) => {
  const showError = (!!dirty) && (!!error);
  return (
    <Textfield
      floatingLabel
      label="名称"
      style={{ width: '100%', minWidth: 200 }}
      error={showError ? error : ''}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

NameField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default NameField;
