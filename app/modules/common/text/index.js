import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Tooltip from 'react-mdl/lib/Tooltip';

const Text = ({ children, title = true, classes, sheet, className, ...props }) => { // eslint-disable-line
  if (children == null) {
    return null;
  }
  const content = (
    <span className={className ? `${classes.text} ${className}` : classes.text} {...props}>{children}</span>
  );
  if (!title) {
    return content;
  }
  return (
    <Tooltip
      className={className ? `${classes.text} ${className}` : classes.text}
      label={<div>{children.split('\n').map((line, i) => <p className={classes.tooltip} key={i}>{line}</p>)}</div>}
    >
      <div>{children}</div>
    </Tooltip>
  );
};

Text.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  text: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: '100%',
    '& > div': {
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  },
  tooltip: {
    marginBottom: 4,
    wordBreak: 'break-all',
    whiteSpace: 'normal',
  },
})(Text);
