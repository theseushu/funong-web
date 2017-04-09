import React, { PropTypes } from 'react';
import DescCardComponent from 'modules/common/desc/card';

const DescCard = ({ desc, className }) => (
  desc ? <DescCardComponent desc={desc} className={className} /> : null
);

DescCard.propTypes = {
  desc: PropTypes.string,
  className: PropTypes.string,
};

export default DescCard;
