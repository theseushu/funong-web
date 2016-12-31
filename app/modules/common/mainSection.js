import React, { PropTypes } from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import injectSheet from 'react-jss';

const styles = {
  mainSection: {
    width: 'auto',
    marginLeft: 8,
    marginRight: 8,
    minHeight: 'calc(100vh - 200px)',
    position: 'relative',
    '@media (min-width: 768px)': {
      marginLeft: 16,
      marginRight: 16,
      minHeight: 'calc(100vh - 250px)',
    },
    display: 'flex',
  },
  panel: {
    width: '100%',
    marginTop: -16,
    '&>.panel-body': {
    },
  },
};

const MainSectionComponent = ({ children, sheet: { classes } }) => (
  <section className={classes.mainSection}>
    <Panel className={classes.panel}>
      { children }
    </Panel>
  </section>
);

MainSectionComponent.propTypes = {
  sheet: PropTypes.object.isRequired,
  children: PropTypes.any,
};

export default injectSheet(styles)(MainSectionComponent);
