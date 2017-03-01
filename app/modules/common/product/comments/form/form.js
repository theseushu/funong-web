import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import ApiButtonWithIcon from 'modules/common/buttons/ApiButtonWithIcon';
import { createTextField, ImagesField } from 'modules/common/form';

const DescField = createTextField('desc', '评论内容', 500, 3);

const Form = (props) => {
  const { handleSubmit, pristine, submitting, invalid, sheet: { classes } } = props;
  return (
    <form className={classes.form}>
      <DescField />
      <ImagesField required={false} title="评论图片" />
      <div className={classes.actions}>
        <ApiButtonWithIcon
          icon="save"
          type="submit" raised accent
          pending={submitting}
          disabled={pristine || invalid || submitting}
          onClick={(e) => { e.preventDefault(); handleSubmit(); }}
        >发布</ApiButtonWithIcon>
      </div>
    </form>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  sheet: PropTypes.object.isRequired,
};

export default injectSheet({
  form: {
    width: '100%',
    maxWidth: 700,
  },
  actions: {
    marginTop: 16,
  },
})(Form);
