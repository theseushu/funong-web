import React, { PropTypes } from 'react';
import { Chip } from 'react-mdl/lib/Chip';
import injectSheet from 'react-jss';
import { colors } from '../styles';

// have to specify 'sheet'. otherwise it will be passed to Chip
const Label = ({ children, className, sheet, classes, ...props }) => ( // eslint-disable-line no-unused-vars
  <Chip
    className={className ? `${classes.label} ${className}` : classes.label}
    {...props}
  >{children}</Chip>
  );

Label.propTypes = {
  sheet: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
};

export default injectSheet({
  label: {
    display: 'inline',
    padding: '.25em .6em .25em',
    height: '1.25em',
    lineHeight: '1.25em',
    fontSize: '75%',
    fontWeight: '700',
    color: colors.colorAccentContrast,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    borderRadius: '.25em',
    '& .mdl-chip__text': {
      fontSize: 'inherit',
      verticalAlign: 'inherit',
      display: 'inline',
    },
  },
})(Label);
