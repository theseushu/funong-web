import React, { PropTypes } from 'react';
import Button from 'react-mdl/lib/Button';

const Page = ({ ...props }) => <Button ripple {...props}>{props.children}</Button>;
Page.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Page;
