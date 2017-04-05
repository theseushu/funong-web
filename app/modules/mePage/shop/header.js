import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { myShopSelector } from 'modules/data/ducks/selectors';
import { Thumbnail } from 'modules/common/shop';
import { breakpoints } from 'modules/common/styles';


const ShopHeader = ({ shop, classes }) => (
  <div className={classes.meHeader}>
    <Thumbnail shop={shop} className={classes.avatar} />
  </div>
);

ShopHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  shop: PropTypes.object,
};

export default injectSheet({
  meHeader: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    '.is-compact &': {
    },
    [breakpoints.mediaDestkopBelow]: {
      marginRight: 100,
    },
  },
  avatar: {
    width: 80,
    height: 80,
    '.is-compact &': {
      width: 48,
      height: 48,
    },
    '& > i': {
      fontSize: 80,
    },
    '.is-compact & i': {
      fontSize: 48,
    },
  },
})(connect(
  (state) => ({ shop: myShopSelector(state) }),
)(ShopHeader));
