import React, { PropTypes } from 'react';

const Tab = ({ children }) => (
  <div>{children}</div>
);

Tab.propTypes = {
  children: PropTypes.object,
};

export default Tab;
