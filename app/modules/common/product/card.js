import React, { PropTypes } from 'react';
import _union from 'lodash/union';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import Button from 'react-mdl/lib/Button';
import IconButton from 'react-mdl/lib/IconButton';
import { formatPrices } from 'utils/displayUtils';
import Card from './components/card';

const formatPrice = (specs) => formatPrices(_union(...specs.map((spec) => spec.prices)));

const CardComponent = ({ product, sheet: { classes }, hideActions = true }) => {
  const { images, name, desc, available } = product;
  return (
    <Card
      cardImage={images[0].thumbnail_300_300}
      link={`/supply/${product.objectId}`}
      titleAccent={formatPrice(product.specs)}
      title={<Link to={`/supply/${product.objectId}`} className={classes.title}>{name}</Link>}
      content={desc}
      actions={hideActions ? null : [
        <Button key={0} colored accent={available}>{available ? '下架' : '上架'}</Button>,
        <Link key={1} to={{ pathname: `/supply/${product.objectId}`, query: { edit: true } }}><IconButton colored name="edit"></IconButton></Link>,
        <IconButton key={2} accent name="delete_sweep">删除</IconButton>,
      ]}
    />
  );
};

CardComponent.propTypes = {
  product: PropTypes.object.isRequired,
  sheet: PropTypes.object.isRequired,
  hideActions: PropTypes.bool,
};

export default injectSheet({
  title: {
    display: 'inline-block',
    height: 40,
    overflow: 'hidden',
    color: 'inherit',
    textDecoration: 'none',
  },
})(CardComponent);
