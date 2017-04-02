import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import { Card, CardTitle, CardText, CardActions } from 'react-mdl/lib/Card';
import Button from 'react-mdl/lib/Button';
import { colors } from '../styles';
import Avatar from './avatar';
import ChatButton from './chatButton';

const CardComponent = ({ user, sheet: { classes }, className }) => (
  <Card shadow={0} className={className ? `${classes.card} ${className}` : classes.card} >
    <CardTitle className={classes.priceAndName}>
      <Link to={`/user/${user.objectId}`} className="_image" >
        <Avatar user={user} />
      </Link>
      <h6>
        {user.name}
      </h6>
    </CardTitle>
    <CardText>
        认证信息
      </CardText>
    <CardActions className={classes.cardActions} border>
      <Button colored ripple>关注</Button>
      <ChatButton colored ripple user={user}>联系我</ChatButton>
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
  priceAndName: {
    textAlign: 'center',
    flexDirection: 'column',
    color: colors.colorSubTitle,
    '& ._image': {
      width: '50%',
      '& i': {
        fontSize: '40px',
      },
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
