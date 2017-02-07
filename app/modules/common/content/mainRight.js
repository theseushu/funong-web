import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { breakpoints } from '../styles';

const MainRight = ({ main, right, sheet: { classes } }) => (
  <div className={classes.content}>
    <div className={classes.main}>
      {main}
    </div>
    <div className={classes.right}>
      {right}
    </div>
  </div>
);

MainRight.propTypes = {
  sheet: PropTypes.object.isRequired,
  main: PropTypes.any.isRequired,
  right: PropTypes.any.isRequired,
};

export default injectSheet({
  content: {
    display: 'flex',
    width: '100%',
  },
  main: {
    flex: 1,
  },
  right: {
    width: 200,
    marginLeft: 16,
    [breakpoints.mediaDestkopBelow]: {
      display: 'none',
    },
  },
})(MainRight);
