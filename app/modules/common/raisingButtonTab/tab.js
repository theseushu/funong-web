import { Children, PropTypes } from 'react';

const Tab = ({ children }) => Children.only(children);

Tab.propTypes = {
  label: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  children: PropTypes.object,
};

export default Tab;
