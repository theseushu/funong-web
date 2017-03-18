import React, { PropTypes } from 'react';
import { InlineThumbnail as Thumbnail } from 'modules/common/thumbnail';

const icon = 'local_grocery_store';

const ShopInlineThumbnail = ({ shop, className, onClick }) => {
  const image = (shop && shop.thumbnail) && shop.thumbnail.thumbnail_80_80;
  return (
    <Thumbnail onClick={onClick} image={image} icon={icon} className={className} />
  );
};

ShopInlineThumbnail.propTypes = {
  shop: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default ShopInlineThumbnail;
