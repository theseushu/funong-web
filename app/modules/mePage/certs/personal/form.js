import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Field } from 'redux-form';
import Button from 'react-mdl/lib/Button';
import styles from '../../../common/styles';
import createTextfield from '../createTextField';
import ImagesField from '../imagesField';

// export for unit testing
export const validate = ({ name, idCard, images }) => ({
  name: name ? undefined : 'Required',
  idCard: idCard ? undefined : 'Required',
  images: (!images || images.length === 0) ? 'Required' : undefined,
});

const NameField = createTextfield('姓名');

const IDCardField = createTextfield('身份证号');
IDCardField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

// export for unit testing
const personalCertForm = (props) => {
  const { handleSubmit, pristine, submitting, submitSucceeded, invalid, onSubmit, sheet: { classes } } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5>请提交以下认证材料<small>（手持身份证正面半身照、身份证正面照、身份证反面照）</small></h5>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <Field name="name" component={NameField} />
        </div>
        <h5 style={{ margin: 0 }}><small>请输入身份证上相同的姓名</small></h5>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <Field name="IDCard" component={IDCardField} />
        </div>
        <h5 style={{ margin: 0 }}><small>请保证号码与照片上一致</small></h5>
      </div>
      <Field name="images" component={ImagesField} />
      <div className={[styles.contentCenter, classes.buttonLine].join(' ')}>
        <Button raised colored type="submit" disabled={pristine || invalid || submitting}>{submitSucceeded ? '保存成功' : '确定'}</Button>
      </div>
    </form>
  );
};

personalCertForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
  invalid: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  sheet: PropTypes.object.isRequired,
};

export default injectSheet({
  buttonLine: {
    marginTop: 16,
  },
})(personalCertForm);
