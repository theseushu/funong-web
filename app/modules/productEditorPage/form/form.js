import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import Button from 'react-mdl/lib/Button';
import { Card, CardTitle, CardActions } from 'react-mdl/lib/Card';
import injectSheet from 'react-jss';
import NameField from './nameField';
import CategoryField from './categoryField';
import SpeciesField from './speciesField';
import LocationField from './locationField';
import DescField from './descField';
import SpecificationsField from './specificationsField';
import styles from '../../common/styles';

const Form = (props) => {
  const { handleSubmit, pristine, submitting, submitSucceeded, invalid, error, sheet: { classes }, createProduct } = props;
  return (
    <Card shadow={0} style={{ width: '100%' }}>
      <CardTitle>
        货品信息
      </CardTitle>
      <form
        onSubmit={handleSubmit(({ category, species, name, specs, location, desc }) =>
          new Promise((resolve, reject) => {
            createProduct({
              category,
              species,
              name,
              specs,
              desc,
              location,
              meta: {
                resolve,
                reject,
              } });
          }))} className={classes.form}
      >
        <Field name="category" component={CategoryField} />
        <Field name="species" component={SpeciesField} />
        <Field name="name" component={NameField} />
        <Field name="specs" component={SpecificationsField} />
        <Field name="location" component={LocationField} />
        <Field name="desc" component={DescField} />
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
              <span>{'保存成功，请稍候'}</span>
            </p>
          )
        }
      </form>
      <CardActions className={styles.contentCenter}>
        <Button
          type="submit" raised colored
          disabled={pristine || invalid || submitting}
        >确定</Button>
      </CardActions>
    </Card>
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

export default injectSheet({
  form: {
    width: '100%',
    maxWidth: 500,
    margin: '0 auto',
    '& input': {
      cursor: 'text',
    },
    '& > div': {
      width: '100%',
      boxSizing: 'border-box',
    },
  },
  fieldName: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  fieldContent: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})(Form);
