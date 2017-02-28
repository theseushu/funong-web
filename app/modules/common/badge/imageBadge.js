import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Tooltip from 'react-mdl/lib/Tooltip';
import * as images from './assets';

const Badge = ({ name, size = '1em', classes, tooltip }) => {
  const { title, img } = images[name];
  const style = {
    backgroundImage: `url(${img})`,
    width: size,
    height: size,
  };
  return (
    tooltip ? (
      <Tooltip label={<span>{title}</span>}>
        <span className={classes.wrapper} style={style}>
        </span>
      </Tooltip>
    ) : (
      <span className={classes.wrapper} style={style}>
      </span>
    )
  );
};

Badge.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.any,
  tooltip: PropTypes.any,
};

export default injectSheet({
  wrapper: {
    display: 'inline-block',
    backgroundPosition: 'center 40%',
    backgroundSize: '160% 200%',
  },
})(Badge);
