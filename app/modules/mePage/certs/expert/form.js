import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Fields } from 'redux-form';
import Button from 'react-mdl/lib/Button';
import styles from 'modules/common/styles';
import DescAndImagesField from '../../utils/descAndImagesField';

// export for unit testing
export const validate = ({ name, idCard, images }) => ({
  name: name ? undefined : 'Required',
  idCard: idCard ? undefined : 'Required',
  images: (!images || images.length === 0) ? 'Required' : undefined,
});

// export for unit testing
const expertCertForm = (props) => {
  const { handleSubmit, pristine, submitting, submitSucceeded, invalid, onSubmit, sheet: { classes } } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
