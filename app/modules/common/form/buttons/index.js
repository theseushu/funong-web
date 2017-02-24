import React, { PropTypes } from 'react';
import Button from 'react-mdl/lib/Button';
import ApiButtonWithIcon from 'modules/common/buttons/ApiButtonWithIcon';
import injectSheet from 'react-jss';

const Buttons = (props, { router }) => {
  const { handleSubmit, pristine, submitting, invalid, classes } = props;
  return (
    <div className={classes.actions}>
      <ApiButtonWithIcon
        icon="save"
        type="submit" raised accent
        pending={submitting}
        disabled={pristine || invalid || submitting}
        onClick={(e) => { e.preventDefault(); handleSubmit(); }}
      >保存</ApiButtonWithIcon>
      <Button
        type="cancel" raised accent
        onClick={(e) => { e.preventDefault(); router.goBack(); }}
      > 取消 </Button>
    </div>
  );
};

Buttons.contextTypes = {
  router: PropTypes.object.isRequired,
};

Buttons.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  actions: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    right: 0,
    bottom: 0,
    marginRight: 40,
    marginBottom: 40,
    zIndex: 908,
    '& > button': {
      margin: 8,
    },
  },
})(Buttons);
