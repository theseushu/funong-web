import React, { PropTypes } from 'react';
import Icon from 'react-mdl/lib/Icon';
import injectSheet from 'react-jss';
import { colors } from '../styles';


const Content = ({ shop }) => (
    (shop && shop.thumbnail) ?
      <div style={{ backgroundImage: `url(${shop.thumbnail.url})`, backgroundSize: 'cover', width: '100%', paddingTop: '100%' }} /> :
      <Icon
        name="shop"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transform: 'scale(1.2,1.2)',
          color: colors.colorSubTitle,
        }}
      />
  );

Content.propTypes = {
  shop: PropTypes.object,
};

const AvatarComponent = ({ shadow = 0, shop, onClick, sheet: { classes } }) => {
  const component = typeof onClick === 'function' ?
    (<a
      onClick={(e) => {
        e.preventDefault();
        if (typeof onClick === 'function') {
          onClick(e);
        }
      }}
      href="#avatar"
    ><Content shop={shop} /></a>) :
    <Content shop={shop} />;
  return (
    <div className={`${classes.wrapper} shadow--${shadow}`}>
      {component}
    </div>
  );
};

AvatarComponent.propTypes = {
  shadow: PropTypes.number,
  shop: PropTypes.object,
  onClick: PropTypes.func,
  sheet: PropTypes.object.isRequired,
};

export default injectSheet({
  wrapper: {
    borderRadius: '10%',
    '&>img': {
      width: '100%',
      height: '100%',
    },
  },
})(AvatarComponent);
