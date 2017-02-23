import React, { PropTypes } from 'react';
import Button from 'react-mdl/lib/Button';
import styles from 'modules/common/styles';
import { ImagesField, RichTextField } from 'modules/common/form';

// export for unit testing
const expertCertForm = (props) => {
  const { handleSubmit, pristine, submitting, submitSucceeded, invalid, onSubmit } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <RichTextField label="申请内容" />
      </div>
      <div className={styles.mt16}>
        <ImagesField title="证书及其它照片" />
      </div>
      <div className={[styles.contentCenter, styles.mt16].join(' ')}>
        <Button raised colored type="submit" disabled={pristine || invalid || submitting}>{submitSucceeded && pristine ? '保存成功' : '确定'}</Button>
      </div>
    </form>
  );
};

expertCertForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
  invalid: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

export default expertCertForm;
