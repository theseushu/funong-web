import React, { PropTypes } from 'react';
import Thumbnail from 'modules/common/thumbnail';

const icons = {
  supply: 'shopping_basket',
  trip: 'toys',
  logistics: 'local_shipping',
  shop: 'local_grocery_store',
};

const ProductThumbnail = ({ type, thumbnail, className, onClick }) => {
  const image = thumbnail && thumbnail.thumbnail_300_300;
  return (
    <Thumbnail onClick={onClick} image={image} icon={icons[type]} className={className} />
  );
};

ProductThumbnail.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  thumbnail: PropTypes.object,
  onClick: PropTypes.func,
};

export default ProductThumbnail;
