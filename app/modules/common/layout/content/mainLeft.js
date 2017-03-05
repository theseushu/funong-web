import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { breakpoints } from 'modules/common/styles';

const MainLeft = ({ main, left, sheet: { classes }, className }) => (
  <div className={`${classes.content} ${className}`}>
    <div className={classes.left}>
      {left}
    </div>
    <div className={classes.main}>
      {main}
    </div>
  </div>
);

MainLeft.propTypes = {
  className: PropTypes.string,
  sheet: PropTypes.object.isRequired,
  main: PropTypes.any.isRequired,
  left: PropTypes.any.isRequired,
};

export default injectSheet({
  content: {
    display: 'flex',
    width: '100%',
  },
  main: {
    flex: 1,
  },
  left: {
    width: 200,
    marginRight: 16,
    [breakpoints.mediaDestkopBelow]: {
      display: 'none',
    },
  },
})(MainLeft);
