import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import Textfield from 'react-mdl/lib/Textfield';

const FormTextfield = ({ label, name, validate, ...props }) => {
  const textfield = ({ input: { value, onChange }, meta: { error }, ...fieldProps }) => (
    <Textfield
      floatingLabel
      name={name}
      label={label}
      style={{ width: '100%', minWidth: 200 }}
      error={error}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
      {...fieldProps}
    />
    );
  textfield.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
  };
  return (params) => <Field name={name} validate={validate} component={textfield} props={{ ...params }} />;
};

export default FormTextfield;
