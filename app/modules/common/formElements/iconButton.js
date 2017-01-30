import React, { PropTypes } from 'react';
import IconButton from 'react-mdl/lib/IconButton';
import styles from '../styles';

const formButton = ({ error, className, children, ...props }) => (
  <IconButton colored={!error} className={error ? `${className} ${styles.colorError}` : styles.colorError} {...props}>{children}</IconButton>
);

formButton.propTypes = {
  error: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.any,
};
export default formButton;
