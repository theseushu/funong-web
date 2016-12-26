import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import injectSheet from 'react-jss';

import NameField from './nameField';
import PriceField from './priceField';
import AvailableField from './availableField';
import DatesField from './datesField';
import LocationField from './locationField';
import DescField from './descField';
import PhotosField from './photosField';
const styles = {
  form: {
    '& input': {
      cursor: 'text',
    },
  },
};

const Form = ({ handleSubmit, pristine, submitting, submitSucceeded, invalid, error, onSubmit = () => {}, sheet: { classes } }) => (
  <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
    <h3 className="text-center">货品信息</h3>
    <Field name="category" component={NameField} />
    <Field name="price" component={PriceField} />
    <Field name="available" component={AvailableField} />
    <Field name="startAndEndDates" component={DatesField} />
    <Field name="location" component={LocationField} />
    <Field name="desc" component={DescField} />
    <Field name="photos" component={PhotosField} />
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

export default injectSheet(styles)(Form);
