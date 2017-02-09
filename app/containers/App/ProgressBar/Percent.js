import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';

const Percent = ({ classes, style }) => <div style={style} className={classes.percent} />;

Percent.propTypes = {
  classes: PropTypes.object.isRequired,
  style: PropTypes.object,
};

export default injectSheet({
  percent: {
    height: 2,
    background: '#290',
    transition: 'all 300ms ease',
  },
})(Percent);
