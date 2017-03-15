import React, { PropTypes } from 'react';
import Thumbnail from 'modules/common/thumbnail';

const icon = 'account_circle';

const Avatar = ({ user, className, onClick }) => {
  const image = (user && user.avatar) && user.avatar.url;
  return (
    <Thumbnail round onClick={onClick} image={image} icon={icon} className={className} />
  );
};

Avatar.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  onClick: PropTypes.func,
};

export default Avatar;
