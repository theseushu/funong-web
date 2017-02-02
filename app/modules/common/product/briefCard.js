import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card';
import { colors } from '../styles';

const CardComponent = ({ product, sheet: { classes }, className }) => {
  const { thumbnail: { url }, name } = product;
  return (
    <Card shadow={0} className={className ? `${classes.card} ${className}` : classes.card} >
      <CardTitle expand className={classes.cardImage} style={{ backgroundImage: `url(${url})` }}>
        <div></div>
      </CardTitle>
      <CardText className={classes.cardTitle}>
        <h6>
          <span>{name}</span>
        </h6>
      </CardText>
    </Card>
  );
};

CardComponent.propTypes = {
  product: PropTypes.object.isRequired,
  sheet: PropTypes.object.isRequired,
  className: PropTypes.string,
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
      height: 24,
      marginTop: 0,
      marginBottom: 4,
      fontSize: 14,
      color: colors.colorText,
      overflow: 'hidden',
    },
  },
})(CardComponent);
