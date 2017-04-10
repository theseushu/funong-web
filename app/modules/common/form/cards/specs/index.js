import React from 'react';
import { Field } from 'redux-form';
import { required } from '../../validations';
import Specs from './specs';

const SpecsField = ({ ...props }) => (
  <Field name="specs" component={Specs} props={props} validate={[required]} />
);

export default SpecsField;
