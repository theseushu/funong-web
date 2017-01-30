import React, { PropTypes } from 'react';
import Button from 'react-mdl/lib/Button';
import styles from '../styles';

const formButton = ({ error, className, children, ...props }) => (
  <Button colored={!error} className={error ? `${className} ${styles.colorError}` : styles.colorError} {...props}>{children}</Button>
);

formButton.propTypes = {
  error: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.any,
};
export default formButton;
