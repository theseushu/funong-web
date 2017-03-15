import React, { PropTypes } from 'react';
import Icon from 'react-mdl/lib/Icon';
import injectSheet from 'react-jss';
import styles, { colors } from 'modules/common/styles';


const Content = ({ image, icon }) => (image) ? <img role="presentation" src={image} /> : <Icon name={icon} />;

Content.propTypes = {
  image: PropTypes.string,
  icon: PropTypes.string.isRequired,
};

const Thumbnail = ({ image, icon, round, onClick, className, classes }) => {
  const component = typeof onClick === 'function' ?
    (<a
      onClick={(e) => {
        e.preventDefault();
        if (typeof onClick === 'function') {
          onClick(e);
        }
      }}
      href="#avatar"
    ><Content image={image} icon={icon} /></a>) :
    <Content image={image} icon={icon} />;
  return (
    <div className={`${classes.wrapper} ${round ? classes.round : ''} ${styles.contentCenter} ${className}`}>
      {component}
    </div>
  );
};

Thumbnail.propTypes = {
  className: PropTypes.string,
  round: PropTypes.bool,
  image: PropTypes.string,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  wrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    '& > img': {
      width: '100%',
      height: '100%',
    },
    '& > i': {
      color: colors.colorSubTitle,
    },
  },
  round: {
    borderRadius: '50%',
  },
})(Thumbnail);
