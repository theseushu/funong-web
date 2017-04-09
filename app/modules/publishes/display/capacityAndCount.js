import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import { breakpoints, colors } from 'modules/common/styles';

const CapacityAndCount = ({ capacity, count, classes }) => (
  <Grid noSpacing className={classes.wrapper}>
    <Cell col={6} tablet={4} phone={4} className={classes.small}>
      最大运量：{capacity}吨
    </Cell>
    <Cell col={6} tablet={4} phone={4} className={classes.small}>
      车辆数: {count}
    </Cell>
  </Grid>
);

CapacityAndCount.propTypes = {
  capacity: PropTypes.number,
  count: PropTypes.number,
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
})(CapacityAndCount);
