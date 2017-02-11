import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { colors } from '../styles';
import Label from './index';

const LabelWithBorder = ({ children, className, classes, colored, accent, ...props }) => {
  const computedClassName = [
    classes.label,
    colored ? classes.labelPrimary : '',
    accent ? classes.labelAccent : '',
    className || '',
  ];
  return <Label className={computedClassName.join(' ')} {...props}>{children}</Label>;
};

LabelWithBorder.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
  colored: PropTypes.bool,
  accent: PropTypes.bool,
};

export default injectSheet({
  label: {
    color: colors.colorSubTitle,
    border: `solid 1px ${colors.colorLightGrey}`,
    background: 'transparent',
  },
  labelPrimary: {
    color: colors.colorPrimary,
    border: `solid 1px ${colors.colorPrimary}`,
  },
  labelAccent: {
    color: colors.colorAccent,
    border: `solid 1px ${colors.colorAccent}`,
  },
})(LabelWithBorder);
