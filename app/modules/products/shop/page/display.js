import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { selector } from 'api/fetchLocation';
import styles, { breakpoints } from 'modules/common/styles';
import { Shop } from 'modules/common/product';

// <UserCard user={product.owner} />
const Display = ({ product, location, sheet: { classes } }) => ( // eslint-disable-line
  <div className={styles.w100}>
    <Shop product={product} location={location} />,
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