import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Card, CardTitle, CardText, CardActions } from 'react-mdl/lib/Card';
import Button from 'react-mdl/lib/Button';

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
      <CardActions border>
        <Button colored>{available ? '下架' : '上架'}</Button>
      </CardActions>
    </Card>
  );
}

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
    '& > h6': {
      marginTop: 0,
      marginBottom: 8,
    },
    '& > p': {
      marginTop: 0,
      marginBottom: 4,
    },
  },
})(CardComponent);
