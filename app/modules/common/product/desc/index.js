import React, { PropTypes } from 'react';
import DescCardComponent from 'modules/common/desc/card';

const DescCard = ({ product: { desc }, className }) => (
  desc ? <DescCardComponent desc={desc} className={className} /> : null
);

DescCard.propTypes = {
  product: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default DescCard;
