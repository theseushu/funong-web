import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { selector } from 'api/fetchLocation';
import { MainRight as ContentMainRight } from 'modules/common/layout/content';
import UserCard from 'modules/common/user/card';
import MediaLeftUserCard from 'modules/common/user/mediaLeftCard';
import { breakpoints } from 'modules/common/styles';

const Display = ({ product, location, sheet: { classes } }) => ( // eslint-disable-line
  <ContentMainRight
    main={[
      <MediaLeftUserCard className={classes.mobileUser} key={1} user={product.owner} hideActions={false} />,
    ]}
    right={
      <div>
        <UserCard user={product.owner} />
      </div>
      }
  />
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
