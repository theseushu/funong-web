import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import { Card, CardTitle, CardText, CardActions } from 'react-mdl/lib/Card';
import { colors } from 'modules/common/styles';
import { publishTypesInfo, publishTypes } from 'funong-common/lib/appConstants';
import { generateDisplayName } from 'funong-common/lib/utils/publishUtils';
import Thumbnail from '../thumbnail';
import Actions from '../actions';

const type = publishTypes.logistics;
const info = publishTypesInfo[type];

const LogisticsCard = ({ publish, className, classes, actions }) => {
  const { thumbnail, price, range } = publish;
  const keywords = generateDisplayName(publish);
  return (
    <Card shadow={2} className={className ? `${classes.card} ${className}` : classes.card} >
      <CardTitle>
        <div className={classes.title}>
          <Link to={`/${info.route}/${publish.objectId}`}>
            <div className={classes.titleImage}>
              <Thumbnail type={type} thumbnail={thumbnail} />
            </div>
          </Link>
          <div className={classes.titleText}>
            <h6 title={keywords}>
              <Link to={`/${info.route}/${publish.objectId}`}>
                {keywords}
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
      <CardActions border>
        <Actions type={type} publish={publish} actions={actions} />
      </CardActions>
    </Card>
  );
};

LogisticsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  publish: PropTypes.object.isRequired,
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
    '& > i': {
      fontSize: 72,
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
