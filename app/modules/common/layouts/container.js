import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { breakpoints } from 'modules/common/styles';

const Container = ({ classes, small, className = '', children, style }) => (
  <div style={style} className={`${classes.container} ${small ? classes.containerSmall : ''} ${className || ''}`}>
    { children }
  </div>
);

Container.propTypes = {
  small: PropTypes.bool,
  style: PropTypes.object,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default injectSheet({
  container: {
    width: '100%',
    'max-width': '1200px',
    padding: '0 8px',
    margin: '0 auto',
    'box-sizing': 'border-box',
    [breakpoints.mediaTabletAbove]: {
      padding: '0 16px',
    },
    [breakpoints.mediaBigScreen]: {
      padding: '0 24px',
    },
  },
  containerSmall: {
    'max-width': '900px',
  },
})(Container);
