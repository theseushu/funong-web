import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import Button from 'react-mdl/lib/Button';
import Avatar from '../avatar';
import Label from '../label';
import MediaLeftCard from '../cards/mediaLeftCard';
import { colors } from '../styles';

const LogisticsCard = ({ user, className, hideActions = true }) => {
  const { name } = user;
  return (
    <MediaLeftCard
      className={className}
      thumbnail={<Link to={`/user/${user.objectId}`}><Avatar user={user} /></Link>}
      title={name}
      subtitle={<Label style={{ border: `solid 1px ${colors.colorLightGrey}`, color: 'inherit', background: 'transparent' }}>{user.type}</Label>}
      content={<div dangerouslySetInnerHTML={{ __html: user.desc }} />}
      actions={hideActions ? [] : [
        <Button key={0} accent>关注</Button>,
        <Button key={1} accent>拨打电话</Button>,
      ]}
    />
  );
};

LogisticsCard.propTypes = {
  user: PropTypes.object.isRequired,
  className: PropTypes.string,
  hideActions: PropTypes.bool,
};

export default LogisticsCard;
