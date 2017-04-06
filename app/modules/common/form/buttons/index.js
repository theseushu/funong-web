import React, { PropTypes } from 'react';
import Button from 'react-mdl/lib/Button';
import ApiButtonWithIcon from 'modules/common/buttons/ApiButtonWithIcon';
import injectSheet from 'react-jss';

const Buttons = (props, { router }) => {
  const { handleSubmit, pristine, submitting, invalid, classes } = props;
  return (
    <div className={classes.wrapper}>
      <div className={classes.buttons}>
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
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  buttons: {
    width: 180,
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 24,
    '& > button': {
    },
  },
})(Buttons);
