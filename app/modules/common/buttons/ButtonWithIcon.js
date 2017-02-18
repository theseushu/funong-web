import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Button from 'react-mdl/lib/Button';
import Icon from 'react-mdl/lib/Icon';

const ButtonWithIcon = ({ icon, children, sheet, classes, ...props }) =>  // eslint-disable-line no-unused-vars
   (
     <Button
       {...props}
     >
       <span className={classes.wrapper}>
         { typeof icon === 'string' ? <Icon name={icon} /> : icon }
         {children}
       </span>
     </Button>
  );

ButtonWithIcon.propTypes = {
  sheet: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  icon: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
  children: PropTypes.string.isRequired,
};

export default injectSheet({
  wrapper: {
    height: 36,
    display: 'flex',
    alignItems: 'center',
    '& > i': {
      fontSize: '1.2em',
    },
    '& > img': {
      width: '1em',
      height: '1em',
      margin: '0 0.1em',
    },
  },
})(ButtonWithIcon);
