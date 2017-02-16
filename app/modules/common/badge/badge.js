import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Tooltip from 'react-mdl/lib/Tooltip';

const Badge = ({ classes, tooltip, children }) => (
  tooltip ? (
    <Tooltip label={<span>Upload <strong>file.zip</strong></span>}>
      <span className={classes.wrapper}>
        {children && children[0]}
      </span>
    </Tooltip>
  ) : (
    <span className={classes.wrapper}>
      {children && children[0]}
    </span>
  )
);

Badge.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.string.isRequired,
  tooltip: PropTypes.any,
};

export default injectSheet({
  wrapper: {
    display: 'inline-block',
    position: 'relative',
    border: 'ridge green',
    color: 'green',
    padding: '1px',
    lineHeight: '1em',
    fontSize: 14,
    fontWeight: 900,
    boxSizing: 'border-box',
  },
})(Badge);
