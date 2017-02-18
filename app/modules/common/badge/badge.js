import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Tooltip from 'react-mdl/lib/Tooltip';
import { colors } from 'modules/common/styles';

const Badge = ({ color, classes, tooltip, children }) => (
  tooltip ? (
    <Tooltip label={<span>{tooltip}</span>}>
      <span className={classes.wrapper} style={{ color: color || undefined, borderColor: color || undefined }}>
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
  color: PropTypes.string,
  tooltip: PropTypes.any,
};

export default injectSheet({
  wrapper: {
    display: 'inline-block',
    position: 'relative',
    border: `ridge ${colors.colorText}`,
    color: colors.colorText,
    padding: '1px',
    lineHeight: '1em',
    fontSize: 14,
    fontWeight: 900,
    boxSizing: 'border-box',
  },
})(Badge);
