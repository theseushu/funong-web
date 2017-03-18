import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import { colors } from 'modules/common/styles';
import { InlineAvatar as Avatar } from 'modules/common/user';
import { InlineThumbnail as ShopThumbnail } from 'modules/common/shop';

const Title = ({ owner, user, shop, classes }) => (
  <div className={classes.title}>
    { owner && '买家：'}
    { user && '卖家：'}
    { shop && '店铺：'}
    <Link to={(owner && `/user/${owner.objectId}`) || (user && `/user/${user.objectId}`) || (shop && `/shop/${shop.objectId}`)} className={classes.link}>
      { owner && <span><Avatar user={owner} /> {owner.name}</span> }
      { user && <span><Avatar user={user} /> {user.name}</span> }
      { shop && <span><ShopThumbnail shop={shop} /> {shop.name}</span> }
    </Link>
  </div>
);

Title.propTypes = {
  shop: PropTypes.object,
  user: PropTypes.object,
  owner: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  title: {
    display: 'flex',
    alignItems: 'center',
    color: colors.colorSubTitle,
    height: 32, // to align with cardMenu button
    lineHeight: '32px',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: colors.colorSubTitle,
  },
})(Title);
