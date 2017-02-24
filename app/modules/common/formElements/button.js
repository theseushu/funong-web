import React, { PropTypes } from 'react';
import Button from 'react-mdl/lib/Button';
import styles from '../styles';

const formButton = ({ error, className, children, ...props }) => (
  <Button
    ripple
    colored={!error}
    style={{ padding: 0 }}
    className={error ? `${styles.colorError} ${className || ''}` : `${className || ''}`}
    {...props}
  >{children}</Button>
);

formButton.propTypes = {
  error: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.any,
};
export default formButton;
