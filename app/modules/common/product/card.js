import React, { PropTypes } from 'react';
import _union from 'lodash/union';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import { Card, CardTitle, CardText, CardActions } from 'react-mdl/lib/Card';
import Button from 'react-mdl/lib/Button';
import IconButton from 'react-mdl/lib/IconButton';
import styles, { colors } from '../styles';
import { formatPrices } from '../../../utils/displayUtils';

const formatPrice = (specs) => formatPrices(_union(...specs.map((spec) => spec.prices)));

const CardComponent = ({ product, sheet: { classes }, className, hideActions = true }) => {
  const { thumbnail: { url }, name, desc: { text }, available } = product;
  return (
    <Card shadow={4} className={className ? `${classes.card} ${className}` : classes.card} >
      <CardTitle expand className={classes.cardImage} style={{ backgroundImage: `url(${url})` }}>
        <div></div>
      </CardTitle>
      <CardText className={classes.cardTitle}>
        <h6>
          <span className={styles.colorAccent}>{formatPrice(product.specs)}</span>
          <br />
          <span>{name}</span>
        </h6>
        <p>{text}</p>
      </CardText>
      { !hideActions &&
        <CardActions className={classes.cardActions} border>
          <Button colored accent={available}>{available ? '下架' : '上架'}</Button>
          <Link to={`/supply/${product.objectId}`}><IconButton colored name="edit"></IconButton></Link>
          <IconButton accent name="delete_sweep">删除</IconButton>
        </CardActions>
      }
    </Card>
  );
};

CardComponent.propTypes = {
  product: PropTypes.object.isRequired,
  sheet: PropTypes.object.isRequired,
  className: PropTypes.string,
  hideActions: PropTypes.bool,
};

export default injectSheet({
  card: {
    width: '100%',
  },
  cardImage: {
    background: 'center',
    backgroundSize: 'cover',
    width: '100%',
    padding: 0,
    paddingTop: '56.25%',
  },
  cardTitle: {
    padding: 8,
    '& > h6': {
      height: 72,
      marginTop: 0,
      marginBottom: 4,
      fontSize: 14,
      color: colors.colorText,
      overflow: 'hidden',
    },
    '& > p': {
      marginTop: 0,
      marginBottom: 4,
      fontSize: 12,
    },
  },
  cardActions: {
    padding: '4px 0',
  },
})(CardComponent);
