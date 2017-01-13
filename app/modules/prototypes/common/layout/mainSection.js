import React, { PropTypes } from 'react';
import { Card } from 'react-mdl/lib/Card';
import injectSheet from 'react-jss';

import { layouts, breakpoints } from '../styles';

const styles = {
  main: {
    margin: '150px auto 0 auto',
    borderRadius: 8,
    width: '100%',
    overflow: 'visible',
    display: 'block',
    [breakpoints.mediaBigScreen]: {
      marginTop: 100,
    },
    [breakpoints.mediaTabletAbove]: {
      width: `calc(100% - ${layouts.gutter * 2}px)`,
    },
  },
};

const MainSection = ({ children, sheet: { classes } }) => (
  <Card shadow={2} className={classes.main}>
    <div style={{ display: 'block', width: '100%', padding: '1em', boxSizing: 'border-box', minHeight: 200, maxWidth: 1024, margin: '0 auto' }}>
      {children}
    </div>
  </Card>
);

MainSection.propTypes = {
  children: PropTypes.any,
  sheet: PropTypes.object.isRequired,
};

export default injectSheet(styles)(MainSection);
