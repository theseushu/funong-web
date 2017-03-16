import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { required } from '../../validations';
import Specs from './specs';

const SpecsField = ({ useMinimum = true }) => (
  <Field name="specs" component={Specs} props={{ useMinimum }} validate={[required]} />
);

SpecsField.propTypes = {
  useMinimum: PropTypes.bool,
};

export default SpecsField;
