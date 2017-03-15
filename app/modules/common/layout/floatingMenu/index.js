import React, { PropTypes } from 'react';
import { floatingMenuClass } from '../styles';

const FloatingMenu = ({ children }) => <div className={floatingMenuClass}>{children}</div>;

FloatingMenu.propTypes = {
  children: PropTypes.any.isRequired,
};

export default FloatingMenu;
