import React, { PropTypes } from 'react';
import { Chip } from 'react-mdl/lib/Chip';
import injectSheet from 'react-jss';
import { colors } from '../styles';

const Label = ({ children, className, sheet: { classes }, ...props }) => (
  <Chip
    className={className ? `${className} ${classes.label}` : classes.label}
    {...props}
  >{children}</Chip>
);

Label.propTypes = {
  sheet: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
};

export default injectSheet({
  label: {
    display: 'inline',
    padding: '.2em .6em .3em',
    fontSize: '75%',
    fontWeight: '700',
    lineHeight: '1',
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