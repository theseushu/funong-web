import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { breakpoints } from 'modules/common/styles';
import { ImageBadge } from 'modules/common/badge';

const Badges = ({ classes }) => (
  <div className={classes.badges}>
    <ImageBadge name="company" tooltip size={'1em'} />
    <ImageBadge name="expert" tooltip size={'1em'} />
    <ImageBadge name="personal" tooltip size={'1em'} />
    <ImageBadge name="assurance" tooltip size={'1em'} />
  </div>
  );

Badges.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  badges: {
    marginBottom: 24,
    [breakpoints.mediaDestkopBelow]: {
      marginBottom: 8,
    },
  },
})(Badges);
