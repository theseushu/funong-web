import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Field } from 'redux-form';
import Button from 'react-mdl/lib/Button';
import styles from 'modules/common/styles';
import createTextfield from '../../utils/createTextField';
import ImagesField from '../../utils/imagesField';

// export for unit testing
export const validate = ({ name, idCard, images }) => ({
  name: name ? undefined : 'Required',
  idCard: idCard ? undefined : 'Required',
  images: (!images || images.length === 0) ? 'Required' : undefined,
});

const NameField = createTextfield('姓名', '_personal_cert_name');

const IDCardField = createTextfield('身份证号', '_personal_id_card');

// export for unit testing
const personalCertForm = (props) => {
  const { handleSubmit, pristine, submitting, submitSucceeded, invalid, onSubmit, sheet: { classes } } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.line}>
        <div className={classes.input}>
          <Field name="name" component={NameField} />
        </div>
        <h5 style={{ margin: 0 }}><small>请输入身份证上相同的姓名</small></h5>
      </div>
      <div className={classes.line}>
        <div className={classes.input}>
          <Field name="IDCard" component={IDCardField} />
        </div>
        <h5 style={{ margin: 0 }}><small>请保证号码与照片上一致</small></h5>
      </div>
      <Field name="images" component={ImagesField} />
      <div className={[styles.contentCenter, classes.marginTop16].join(' ')}>
        <Button raised colored type="submit" disabled={pristine || invalid || submitting}>{submitSucceeded && pristine ? '保存成功' : '确定'}</Button>
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
  marginTop16: {
    marginTop: 16,
  },
  line: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap',
  },
  input: {
    flex: 1, minWidth: 300,
  },
})(personalCertForm);
