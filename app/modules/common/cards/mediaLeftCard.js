import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Card, CardTitle, CardText, CardActions } from 'react-mdl/lib/Card';
import { colors } from '../styles';

const CardComponent = ({ thumbnail, title, subtitle, content, secondaryCotent, actions, sheet: { classes }, className }) => (
  <Card shadow={2} className={className ? `${classes.card} ${className}` : classes.card} >
    <CardTitle>
      <div className={classes.title}>
        <div className={classes.titleImage}>
          {thumbnail}
        </div>
        <div className={classes.titleText}>
          <h6>{title}</h6>
          <div>{subtitle}</div>
        </div>
      </div>
    </CardTitle>
    {
      (content || secondaryCotent) && (
        <CardText>
          {content && (
            <div className={classes.mainText}>
              {content}
            </div>
          )}
          {secondaryCotent && (<div className={classes.secondaryText}>
            {secondaryCotent}
          </div>
          )}
        </CardText>
      )
    }
    { actions.length > 0 &&
      <CardActions className={classes.cardActions} border>
        {actions}
      </CardActions>
      }
  </Card>
  );

CardComponent.propTypes = {
  thumbnail: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.any.isRequired,
  content: PropTypes.any,
  secondaryCotent: PropTypes.any,
  actions: PropTypes.arrayOf(PropTypes.element),
  sheet: PropTypes.object.isRequired,
  className: PropTypes.string,
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
})(CardComponent);
