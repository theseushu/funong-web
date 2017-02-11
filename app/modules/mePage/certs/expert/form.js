import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Fields } from 'redux-form';
import Button from 'react-mdl/lib/Button';
import styles from 'modules/common/styles';
import DescAndImagesField from '../descAndImagesField';

// export for unit testing
export const validate = ({ name, idCard, images }) => ({
  name: name ? undefined : 'Required',
  idCard: idCard ? undefined : 'Required',
  images: (!images || images.length === 0) ? 'Required' : undefined,
});

// export for unit testing
const expertCertForm = (props) => {
  const { handleSubmit, pristine, submitting, submitSucceeded, invalid, onSubmit, sheet: { classes }, cert } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {cert && <h5>已提交以下资料<small>（尚未审核，可以修改）</small></h5>}
      {!cert && <h5>请提交以下认证材料<small>（手持身份证正面半身照、身份证正面照、身份证反面照）</small></h5>}
      <Fields names={['desc', 'images']} component={DescAndImagesField} />
      <div className={[styles.contentCenter, classes.marginTop16].join(' ')}>
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
  sheet: PropTypes.object.isRequired,
  cert: PropTypes.object,
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
})(expertCertForm);
