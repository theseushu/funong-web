import React, { PropTypes } from 'react';
import Thumbnail from 'modules/common/thumbnail';

const icon = 'shop';

const ShopThumbnail = ({ shop, className, onClick }) => {
  const image = (shop && shop.thumbnail) && shop.thumbnail.thumbnail_160_160;
  return (
    <Thumbnail onClick={onClick} image={image} icon={icon} className={className} />
  );
};

ShopThumbnail.propTypes = {
  className: PropTypes.string,
  shop: PropTypes.object,
  onClick: PropTypes.func,
};

export default ShopThumbnail;
