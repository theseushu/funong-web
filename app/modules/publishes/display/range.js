import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import LabelWithBorder from 'modules/common/label/labelWithBorder';
import { breakpoints, colors } from 'modules/common/styles';

const CapacityAndCount = ({ range, classes }) => (
  <div style={{ display: 'flex', width: '100%' }} className={classes.wrapper}>
      服务区域：
      { range.map((province, i) => <LabelWithBorder key={i}> {province}</LabelWithBorder>) }
  </div>
  );

CapacityAndCount.propTypes = {
  range: PropTypes.array,
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
