import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import Icon from 'react-mdl/lib/Icon';
import { Card, CardTitle, CardText, CardActions } from 'react-mdl/lib/Card';
import { colors } from 'modules/common/styles';

const LogisticsCard = ({ product, className, classes, actions }) => {
  const { thumbnail, name, price, range } = product;
  return (
    <Card shadow={2} className={className ? `${classes.card} ${className}` : classes.card} >
      <CardTitle>
        <div className={classes.title}>
          <Link to={`/logistics/${product.objectId}`}>
            <div className={classes.titleImage}>
              {thumbnail ? <div style={{ backgroundImage: `url(${thumbnail.thumbnail_300_300})` }}></div> : <Icon name="local_shipping" />}
            </div>
          </Link>
          <div className={classes.titleText}>
            <h6>
              <Link to={`/logistics/${product.objectId}`}>
                {name}
              </Link>
            </h6>
            <div>认证信息, 评价...</div>
          </div>
        </div>
      </CardTitle>
      <CardText>
        <div className={classes.mainText}>
          {price}
        </div>
        <div className={classes.secondaryText}>
          {range.map((province, i) => <span key={i}>{province.title}</span>)}
        </div>
      </CardText>
      { actions && actions.length > 0 &&
        <CardActions className={classes.cardActions} border>
          {actions}
        </CardActions>
      }
    </Card>
  );
};

LogisticsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  className: PropTypes.string,
  actions: PropTypes.array,
};

export default injectSheet({
  card: {
    width: '100%',
    minHeight: 0,
    '& > .mdl-card__title': {
      paddingBottom: 0,
    },
  },
  title: {
    display: 'flex',
  },
  titleImage: {
    width: 72,
    height: 72,
    marginRight: 8,
    '& > div': {
      background: 'center',
      backgroundSize: 'cover',
      borderRadius: 4,
      width: 72,
      height: 72,
    },
    '& > i': {
      fontSize: 72,
      borderRadius: 4,
      color: colors.colorLightGrey,
    },
  },
  titleText: {
    flex: 1,
    '& > h6': {
      height: 48,
      margin: 0,
      overflow: 'hidden',
    },
    '& a': {
      textDecoration: 'none',
      color: colors.colorText,
    },
  },
  mainText: {
    marginTop: 0,
    fontSize: 14,
    color: colors.colorText,
    overflow: 'hidden',
    maxHeight: 48,
  },
  secondaryText: {
    margin: 0,
    fontSize: 14,
    color: colors.colorSubTitle,
    overflow: 'hidden',
    height: 48,
  },
  cardActions: {
    padding: '4px 0',
  },
})(LogisticsCard);
