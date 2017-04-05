import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Button from 'react-mdl/lib/Button';
import styles from 'modules/common/styles';
import { createTextField, IDCardField, ImagesField } from 'modules/common/form';

const NameField = createTextField('name', '姓名', 10);

// export for unit testing
const personalCertForm = (props) => {
  const { handleSubmit, pristine, submitting, submitSucceeded, invalid, onSubmit, sheet: { classes } } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.line}>
        <div className={classes.input}>
          <NameField />
        </div>
        <h5 style={{ margin: 0 }}><small>请输入身份证上相同的姓名</small></h5>
      </div>
      <div className={classes.line}>
        <div className={classes.input}>
          <IDCardField />
        </div>
        <h5 style={{ margin: 0 }}><small>请保证号码与照片上一致</small></h5>
      </div>
      <div className={classes.line}>
        <ImagesField title="身份证照片" />
      </div>
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
    flex: 1,
  },
})(personalCertForm);
