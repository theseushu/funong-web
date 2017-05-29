import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import FABButton from 'react-mdl/lib/FABButton';
import Icon from 'react-mdl/lib/Icon';

const FButton = ({ sheet, classes, icon, title, ...props }) => ( // eslint-disable-line
  <FABButton className={classes.fbutton} {...props}>
    <Icon name={icon} />
    <span className="_fab_title">{title}</span>
  </FABButton>
);

FButton.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default injectSheet({
  fbutton: {
    overflow: 'visible !important',
    '& > .material-icons': {
      top: '40% !important',
    },
    '& > ._fab_title': {
      position: 'absolute',
      width: 48,
      textAlign: 'center',
      top: '60%',
      left: '50%',
      transform: 'translate(-24px, 0)',
      fontSize: 12,
      lineHeight: '12px',
    },
  },
})(FButton);
