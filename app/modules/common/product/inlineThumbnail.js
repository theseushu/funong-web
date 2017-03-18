import React, { PropTypes } from 'react';
import { InlineThumbnail as Thumbnail } from 'modules/common/thumbnail';


const icons = {
  supply: 'shopping_basket',
  trip: 'toys',
  logistics: 'local_shipping',
  shop: 'local_grocery_store',
};

const ProductInlineThumbnail = ({ type, thumbnail, className, onClick }) => {
  const image = thumbnail && thumbnail.thumbnail_80_80;
  return (
    <Thumbnail onClick={onClick} image={image} icon={icons[type]} className={className} />
  );
};

ProductInlineThumbnail.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  thumbnail: PropTypes.object,
  onClick: PropTypes.func,
};

export default ProductInlineThumbnail;
