import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Card, CardTitle, CardText, CardActions } from 'react-mdl/lib/Card';
import Button from 'react-mdl/lib/Button';
import IconButton from 'react-mdl/lib/IconButton';
import { colors } from '../styles';

const CardComponent = ({ product, sheet: { classes } }) => {
  const { thumbnail: { url }, name, desc: { text }, available } = product;
  return (
    <Card shadow={4} className={classes.card} >
      <CardTitle expand className={classes.cardImage} style={{ backgroundImage: `url(${url})` }}>
        <div></div>
      </CardTitle>
      <CardText className={classes.cardTitle}>
        <h6>{name}</h6>
        <p>{text}</p>
      </CardText>
      <CardActions className={classes.cardActions} border>
        <Button colored accent={available}>{available ? '下架' : '上架'}</Button>
        <IconButton colored name="edit"></IconButton>
        <IconButton accent name="delete_sweep">删除</IconButton>
      </CardActions>
    </Card>
  );
};

CardComponent.propTypes = {
  product: PropTypes.object.isRequired,
  sheet: PropTypes.object.isRequired,
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
      height: 48,
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
