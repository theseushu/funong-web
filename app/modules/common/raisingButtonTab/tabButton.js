import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import injectSheet from 'react-jss';

const styles = {
  button: {
    padding: '1em',
    cursor: 'pointer',
    minHeight: '6em',
    minWidth: '6em',
  },
  active: {
    opacity: '1 !important',
  },
  normal: {
    border: 'none !important',
    background: 'none !important',
  },
  icon: {
    fontSize: '3em',
    lineHeight: 1,
  },
  label: {
    paddingTop: '0.5em',
  },
};

const PartIcon = ({ icon, classes }) => {
  if (icon) {
    return (<div className={classes.icon}>
      {icon}
    </div>);
  }
  return null;
};

PartIcon.propTypes = {
  icon: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const PartLabel = ({ label, classes }) => (
  <div className={classes.label}>
    <span>{label}</span>
  </div>
);

PartLabel.propTypes = {
  label: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

const TabButton = ({ label, icon, active, onClick, sheet: { classes } }) => (
  <Button
    bsStyle={active ? 'primary' : 'default'}
    className={active ? `${classes.active} shadow--4 material-transition` : `${classes.normal} material-transition`}
    disabled={active}
    onClick={onClick}
  >
    <PartIcon icon={icon} active={active} classes={classes} />
    <PartLabel label={label} active={active} classes={classes} />
  </Button>
  );

TabButton.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.object,
  sheet: PropTypes.object.isRequired,
};

export default injectSheet(styles)(TabButton);
