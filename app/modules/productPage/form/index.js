import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';  // eslint-disable-line no-unused-vars

import { bindActionCreators } from 'redux';

import Button from 'react-bootstrap/lib/Button';
import injectSheet from 'react-jss';

import { createProduct as createProductAction, selector } from '../../api/createProduct';

import SpeciesField from './speciesField';
import PriceField from './priceField';
import AvailableField from './availableField';
import DatesField from './datesField';
import LocationField from './locationField';
import DescField from './descField';
import SpecificationsField from './specificationsField';
import PhotosField from './photosField';

// export for unit testing
export const validate = (values) => {
  const { species, specifications, price, dates, location, desc } = values;
  const errors = {};
  if (!species || !species.name) {
    errors.species = '必填';
  }
  if (!specifications || specifications.length < 1) {
    errors.specifications = '必填';
  }
  if (!price || !price.price) {
    errors.price = '必填';
  }
  if (!dates || !dates.start || !dates.end) {
    errors.dates = '必填';
  }
  if (!location || !location.geopoint) {
    errors.location = '必填';
  }
  if (!desc) {
    errors.desc = '必填';
  } else if (desc.length < 20) {
    errors.desc = '请至少输入20字描述';
  }
  return errors;
};

const styles = {
  form: {
    '& input': {
      cursor: 'text',
    },
  },
};


const Form = (props) => {
  const { handleSubmit, pristine, submitting, submitSucceeded, invalid, error, sheet: { classes }, createProduct } = props;
  return (
    <form
      onSubmit={handleSubmit(({ species, specifications, price, available, dates, location, desc, photos }) => {
        const { start, end } = dates;
        const { geopoint, ...address } = location;
        return new Promise((resolve, reject) => {
          createProduct({
            species,
            specifications,
            price,
            available,
            startAt: start,
            endAt: end,
            desc,
            photos,
            geopoint,
            location: address,
            meta: {
              resolve,
              reject,
            } });
        });
      })} className={classes.form}
    >
      <h3 className="text-center">货品信息</h3>
      <Field name="species" component={SpeciesField} />
      <Field name="specifications" component={SpecificationsField} />
      <Field name="price" component={PriceField} />
      <Field name="available" component={AvailableField} />
      <Field name="dates" component={DatesField} />
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
          disabled={pristine || invalid || submitting}
        >确定</Button>
      </div>
    </form>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
  invalid: PropTypes.bool,
  error: PropTypes.any,
  sheet: PropTypes.object.isRequired,
  createProduct: PropTypes.func.isRequired,
};

export const FORM_NAME = 'product';

export default reduxForm({
  form: FORM_NAME,
  initialValues: {
    available: true,
  },
  validate,
})(injectSheet(styles)(connect(
  (state) => ({ createProductState: selector(state) }),
  (dispatch) => bindActionCreators({ createProduct: createProductAction }, dispatch),
)(Form)));
