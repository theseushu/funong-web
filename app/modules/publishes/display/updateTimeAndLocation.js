import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import { breakpoints, colors } from 'modules/common/styles';
import { humanizeTime, formatAddress, humanizeDistance } from 'funong-common/lib/utils/displayUtils';
import { distance } from 'funong-common/lib/utils/mapUtils';

const UpdateTimeAndLocation = ({ locationTile, location, currentLocation, updatedAt, classes }) => (
  <Grid noSpacing className={classes.wrapper}>
    <Cell col={6} tablet={4} phone={4} className={classes.small}>
        更新时间： {humanizeTime(updatedAt)}
    </Cell>
    { location && (
    <Cell col={6} tablet={4} phone={4} className={classes.small}>
      {locationTile || '发货地'}： {formatAddress(location.address)}
      <small>
        {
              (currentLocation && currentLocation.lnglat) &&
              `(${humanizeDistance(distance(currentLocation.lnglat, location.lnglat))})`
            }
      </small>
    </Cell>
      )}
  </Grid>
  );

UpdateTimeAndLocation.propTypes = {
  locationTile: PropTypes.string,
  currentLocation: PropTypes.object,
  location: PropTypes.object,
  updatedAt: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  wrapper: {
    marginBottom: 24,
    [breakpoints.mediaDestkopBelow]: {
      marginBottom: 8,
    },
  },
  small: {
    fontSize: '1rem',
    color: colors.colorSubTitle,
  },
})(UpdateTimeAndLocation);
