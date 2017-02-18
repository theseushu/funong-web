import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Field, Fields } from 'redux-form';
import Button from 'react-mdl/lib/Button';
import styles from 'modules/common/styles';
import createTextfield from '../../../utils/createTextField';
import LocationField from '../../../utils/locationField';
import DescAndImagesField from '../../../utils/descAndImagesField';
import AreasField from './areasField';

const NameField = createTextfield('店铺名称', 'shop_name');

// export for unit testing
const ShopForm = (props) => {
  const { handleSubmit, pristine, submitting, submitSucceeded, invalid, onSubmit, sheet: { classes } } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.line}>
        <div className={classes.input}>
          <Field name="name" component={NameField} />
        </div>
      </div>
      <div className={classes.line}>
        <Field name="location" component={LocationField} />
      </div>
      <div className={classes.line}>
        <Field name="areas" component={AreasField} />
      </div>
      <div className={`${classes.line} ${classes.marginTop16}`}>
        店铺介绍
      </div>
      <Fields names={['desc', 'images']} component={DescAndImagesField} />
      <div className={[styles.contentCenter, classes.marginTop16].join(' ')}>
        <Button raised colored type="submit" disabled={pristine || invalid || submitting}>{submitSucceeded ? '保存成功' : '确定'}</Button>
      </div>
    </form>
  );
};

ShopForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
  invalid: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  sheet: PropTypes.object.isRequired,
};

export default injectSheet({
  marginTop16: {
    marginTop: 16,
  },
  line: {
    display: 'flex', alignItems: 'center', flexWrap: 'wrap',
  },
  input: {
    flex: 1, minWidth: 200,
  },
})(ShopForm);
