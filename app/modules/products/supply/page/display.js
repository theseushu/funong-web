import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { selectors } from 'api/map';
import MediaLeftUserCard from 'modules/common/user/mediaLeftCard';
import styles, { breakpoints } from 'modules/common/styles';
import { Supply } from 'modules/common/product';

// <UserCard user={product.owner} />
const Display = ({ product, location, sheet: { classes } }) => ( // eslint-disable-line
  <div className={styles.w100}>
    <Supply product={product} location={location} />,
    <MediaLeftUserCard className={classes.mobileUser} user={product.owner} hideActions={false} />,
  </div>
);

Display.propTypes = {
  sheet: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export default connect(
  (state) => ({ location: selectors.getCurrentLocation(state).location })
)(injectSheet({
  mobileUser: {
    marginTop: 16,
    [breakpoints.mediaDestkopAbove]: {
      display: 'none',
    },
  },
})(Display));
