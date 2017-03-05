import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import { breakpoints, colors } from 'modules/common/styles';
import { humanizeTime, formatAddress, humanizeLnglat } from 'utils/displayUtils';

const UpdateTimeAndLocation = ({ locationTile, location: { address, lnglat }, currentLocation, updatedAt, classes }) => (
  <Grid noSpacing className={classes.wrapper}>
    <Cell col={6} tablet={4} phone={4} className={classes.small}>
      更新时间： {humanizeTime(updatedAt)}
    </Cell>
    <Cell col={6} tablet={4} phone={4} className={classes.small}>
      {locationTile || '发货地'}： {formatAddress(address)}
      <small>
        {
          (currentLocation && currentLocation.lnglat) &&
          `(${humanizeLnglat(currentLocation.lnglat.latitude, currentLocation.lnglat.longitude, lnglat.latitude, lnglat.longitude)})`
        }
      </small>
    </Cell>
  </Grid>
);

UpdateTimeAndLocation.propTypes = {
  locationTile: PropTypes.string,
  currentLocation: PropTypes.object,
  location: PropTypes.object.isRequired,
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
