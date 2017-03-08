import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { selector } from 'api/fetchLocation';
import MediaLeftUserCard from 'modules/common/user/mediaLeftCard';
import styles, { breakpoints } from 'modules/common/styles';
import { Logistics } from 'modules/common/product';

// <UserCard user={product.owner} />
const Display = ({ product, location, sheet: { classes } }) => ( // eslint-disable-line
  <div className={styles.w100}>
    <Logistics product={product} location={location} />,
    <MediaLeftUserCard className={classes.mobileUser} user={product.owner} hideActions={false} />,
  </div>
);

Display.propTypes = {
  sheet: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export default connect(
  (state) => ({ location: selector(state).location })
)(injectSheet({
  mobileUser: {
    marginTop: 16,
    [breakpoints.mediaDestkopAbove]: {
      display: 'none',
    },
  },
})(Display));