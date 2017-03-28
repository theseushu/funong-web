import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import loadingGif from 'assets/blockLoading.gif';

const BlockLoading = ({ classes }) => <div className={classes.blockLoading}><img src={loadingGif} role="presentation" /></div>;

BlockLoading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  blockLoading: {
    width: '100%',
    textAlign: 'center',
  },
})(BlockLoading);
