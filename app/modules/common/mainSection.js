import React, { PropTypes } from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import injectSheet from 'react-jss';

const styles = {
  mainSection: {
    width: 'auto',
    marginLeft: 8,
    marginRight: 8,
    position: 'relative',
    '@media (min-width: 768px)': {
      marginLeft: 16,
      marginRight: 16,
    },
    display: 'flex',
  },
  panel: {
    width: '100%',
    marginTop: -16,
  },
};

const MainSectionComponent = ({ sheet: { classes } }) => (
  <section className={classes.mainSection}>
    <Panel className={classes.panel} style={{ height: 200 }}>
    </Panel>
  </section>
);

MainSectionComponent.propTypes = {
  sheet: PropTypes.object.isRequired,
};

export default injectSheet(styles)(MainSectionComponent);
