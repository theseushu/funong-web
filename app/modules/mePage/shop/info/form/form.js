import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';
import Button from 'react-mdl/lib/Button';
import styles from 'modules/common/styles';
import { createTextField, LocationField, ImagesField, RichTextField } from 'modules/common/form';
import FORM_NAME from './formName';
import AreasField from './areasField';

const NameField = createTextField('name', '店铺名称', 20);

// export for unit testing
const ShopForm = (props) => {
  const { handleSubmit, pristine, submitting, submitSucceeded, invalid, onSubmit, name, sheet: { classes } } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.line}>
        <div className={classes.input}>
          <NameField />
        </div>
      </div>
      <div className={classes.line}>
        <LocationField name={name} />
      </div>
      <div className={classes.line}>
        <Field name="areas" component={AreasField} />
      </div>
      <div className={styles.mt16}>
        <RichTextField label="店铺介绍" />
      </div>
      <div className={styles.mt16}>
        <ImagesField title="店铺照片" />
      </div>
      <div className={[styles.contentCenter, styles.mt16].join(' ')}>
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
  name: PropTypes.string,
};


export default injectSheet({
  line: {
    display: 'flex', alignItems: 'center', flexWrap: 'wrap',
  },
  input: {
    flex: 1, minWidth: 200,
  },
})(connect(
  (state) => ({ name: formValueSelector(FORM_NAME)(state, 'name') }),
)(ShopForm));
