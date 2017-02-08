import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import { Card, CardTitle, CardText, CardActions } from 'react-mdl/lib/Card';
import { colors } from '../styles';

const CardComponent = ({ cardImage, link, titleAccent, title, content, actions, sheet: { classes }, className }) => (
  <Card shadow={4} className={className ? `${classes.card} ${className}` : classes.card} >
    <CardTitle className={classes.cardImage} style={{ backgroundImage: `url(${cardImage})` }}>
      <Link to={link}>
        <div style={{ backgroundImage: `url(${cardImage})` }}>
        </div>
      </Link>
    </CardTitle>
    <CardText className={classes.cardTitle}>
      <h6 className={classes.titleAccent}>{titleAccent}</h6>
      <h6 className={classes.title}>
        {title}
      </h6>
      {content && <p>{content}</p>}
    </CardText>
    { actions &&
      <CardActions className={classes.cardActions} border>
        {actions}
      </CardActions>
      }
  </Card>
  );

CardComponent.propTypes = {
  cardImage: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  titleAccent: PropTypes.any.isRequired,
  title: PropTypes.object.isRequired,
  content: PropTypes.any,
  actions: PropTypes.array,
  sheet: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default injectSheet({
  card: {
    width: '100%',
    minHeight: 0,
  },
  cardImage: {
    position: 'relative',
    background: 'center',
    backgroundSize: 'cover',
    width: '100%',
    padding: 0,
    paddingTop: '56.25%',
    '& > a': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
  },
  cardTitle: {
    padding: 8,
    '& > h6': {
      marginTop: 0,
      marginBottom: 4,
      fontSize: 14,
      lineHeight: '20px',
      overflow: 'hidden',
    },
    '& > p': {
      marginTop: 0,
      marginBottom: 4,
      fontSize: 12,
    },
  },
  titleAccent: {
    marginBottom: 0,
    color: colors.colorPrice,
  },
  title: {
    marginTop: 0,
    color: colors.colorText,
  },
  cardActions: {
    padding: '4px 0',
  },
})(CardComponent);
