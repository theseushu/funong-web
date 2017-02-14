import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import loading from 'assets/iconButtonLoading.gif';

const IconButtonLoading = ({ classes }) => (
  <span className={classes.icon}>
    <img role="presentation" src={loading} />
  </span>
);

IconButtonLoading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  icon: {
    width: 32,
    height: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > img': {
      width: 16,
      height: 16,
    },
  },
})(IconButtonLoading);
