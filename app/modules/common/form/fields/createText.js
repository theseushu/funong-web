import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import Textfield from 'react-mdl/lib/Textfield';

const FormTextfield = ({ label, name, validate, ...props }) => {
  const textfield = ({ input: { value, onChange }, meta: { dirty, error } }) => {
    const showError = (!!error);
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
        {...props}
      />
    );
  };
  textfield.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
  };
  return () => <Field name={name} validate={validate} component={textfield} />;
};

export default FormTextfield;
