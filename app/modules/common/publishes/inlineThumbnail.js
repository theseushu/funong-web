import React, { PropTypes } from 'react';
import { publishTypesInfo } from 'appConstants';
import { InlineThumbnail as Thumbnail } from 'modules/common/thumbnail';

const ProductInlineThumbnail = ({ type, thumbnail, className, onClick }) => {
  const image = thumbnail && thumbnail.thumbnail_80_80;
  const icon = publishTypesInfo[type].icon;
  return (
    <Thumbnail onClick={onClick} image={image} icon={icon} className={className} />
  );
};

ProductInlineThumbnail.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  thumbnail: PropTypes.object,
  onClick: PropTypes.func,
};

export default ProductInlineThumbnail;
