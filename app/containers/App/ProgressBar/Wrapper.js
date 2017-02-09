import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';

const Wrapper = ({ classes, hidden, children }) =>
  <div
    className={classes.wrapper}
    style={{
      visibility: hidden ? 'hidden' : 'visible',
      opacity: hidden ? 0 : 1,
      zIndex: hidden ? -10 : 1000099,
    }}
  >
    {children}
  </div>;

Wrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  hidden: PropTypes.bool,
  children: PropTypes.object,
};

export default injectSheet({
  wrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    transition: 'all 500ms ease-in-out',
  },
})(Wrapper);

