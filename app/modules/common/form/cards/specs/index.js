import React from 'react';
import { Field } from 'redux-form';
import Specs from './specs';

const SpecsField = () => (
  <Field name="specs" component={Specs} />
);

export default SpecsField;
