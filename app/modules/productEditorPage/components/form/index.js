import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';

import NameField from './nameField';
import PriceField from './priceField';
import AvailableField from './availableField';
import DatesField from './datesField';
import LocationField from './locationField';


const Form = ({ handleSubmit, pristine, submitting, submitSucceeded, invalid, error, onSubmit = () => {} }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <h3 className="text-center">立即加入</h3>
    <div>
      <Field name="category" component={NameField} />
    </div>
    <div>
      <Field name="price" component={PriceField} />
    </div>
    <div>
      <Field name="available" component={AvailableField} />
    </div>
    <div>
      <Field name="startAndEndDates" component={DatesField} />
    </div>
    <div>
      <Field name="location" component={LocationField} />
    </div>
    {
      error && (
        <p className={'text-center text-danger'}>
          <span>{error.message}</span>
        </p>
      )
    }
    {
      submitSucceeded && (
        <p className={'text-center text-info'}>
          <span>{'登录成功，请稍候'}</span>
        </p>
      )
    }
    <div className="text-center">
      <Button
        type="submit" bsStyle="primary" block
        disabled={pristine || invalid || submitting || submitSucceeded}
      >确定</Button>
    </div>
  </form>
);

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
  invalid: PropTypes.bool,
  error: PropTypes.any,
  onSubmit: PropTypes.func,
};

export default Form;
