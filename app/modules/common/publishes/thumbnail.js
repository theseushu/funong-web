import React, { PropTypes } from 'react';
import { publishTypesInfo } from 'funong-common/lib/appConstants';
import Thumbnail from 'modules/common/thumbnail';

const ProductThumbnail = ({ type, thumbnail, className, onClick }) => {
  const image = thumbnail && thumbnail.thumbnail_300_300;
  const icon = publishTypesInfo[type].icon;
  return (
    <Thumbnail onClick={onClick} image={image} icon={icon} className={className} />
  );
};

ProductThumbnail.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  thumbnail: PropTypes.object,
  onClick: PropTypes.func,
};

export default ProductThumbnail;
