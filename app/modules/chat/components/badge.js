import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';

const Badge = ({ classes, className }) => (
  <span className={className ? `${classes.badge} ${className}` : classes.badge} />
);

Badge.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  badge: {
    display: 'inline-block',
    width: 8,
    height: 8,
    background: '#F44336', // red500
    borderRadius: 4,
    animation: 'badge-animation 1s infinite alternate',
  },
  '@keyframes badge-animation': {
    from: { opacity: 1 },
    to: { opacity: 0.6 },
  },
})(Badge);
