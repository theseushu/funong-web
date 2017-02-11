import React, { PropTypes } from 'react';
import Textfield from 'react-mdl/lib/Textfield';

export default (label, name) => {
  const textfield = ({ input: { value, onChange }, meta: { dirty, error } }) => {
    const showError = (!!dirty) && (!!error);
    return (
      <Textfield
        floatingLabel
        name={name}
        label={label}
        required
        style={{ width: '100%', minWidth: 200 }}
        error={showError ? error : ''}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  };
  textfield.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
  };
  return textfield;
};
