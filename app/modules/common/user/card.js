import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import { Card, CardTitle, CardText, CardActions } from 'react-mdl/lib/Card';
import Button from 'react-mdl/lib/Button';
import LabelWithBorder from '../label/labelWithBorder';
import { colors } from '../styles';

const CardComponent = ({ user, sheet: { classes }, className }) => (
  <Card shadow={0} className={className ? `${classes.card} ${className}` : classes.card} >
    <CardTitle className={classes.cardTitle}>
      <Link to={`/user/${user.objectId}`}>
        <img role="presentation" src={user.avatar.url} />
      </Link>
      <h6>
        {user.name}
      </h6>
      <div>
        <LabelWithBorder>{user.type}</LabelWithBorder>
      </div>
    </CardTitle>
    <CardText>
      认证信息
    </CardText>
    <CardActions className={classes.cardActions} border>
      <Button colored>关注</Button>
      <Button colored>拨打电话</Button>
    </CardActions>
  </Card>
);

CardComponent.propTypes = {
  user: PropTypes.object.isRequired,
  sheet: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default injectSheet({
  card: {
    width: '100%',
    minHeight: 0,
  },
  cardTitle: {
    textAlign: 'center',
    flexDirection: 'column',
    color: colors.colorSubTitle,
    '& img': {
      width: '50%',
    },
    '& h6': {
      margin: '16px 0 8px 0',
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
    display: 'flex',
    justifyContent: 'space-around',
  },
})(CardComponent);
