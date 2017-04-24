import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import { formatPrices } from 'funong-common/lib/utils/displayUtils';
import Card from '../cards/card';

const formatPrice = (specs) => formatPrices(specs);

const CardComponent = ({ product, sheet: { classes } }) => {
  const { thumbnail, name } = product;
  return (
    <Card
      cardImage={thumbnail.thumbnail_300_300}
      link={`/supply/${product.objectId}`}
      titleAccent={formatPrice(product.specs)}
      title={<Link to={`/supply/${product.objectId}`} className={classes.title}>{name}</Link>}
    />
  );
};

CardComponent.propTypes = {
  product: PropTypes.object.isRequired,
  sheet: PropTypes.object.isRequired,
};

export default injectSheet({
  title: {
    display: 'inline-block',
    height: 20,
    overflow: 'hidden',
    color: 'inherit',
    textDecoration: 'none',
  },
})(CardComponent);
