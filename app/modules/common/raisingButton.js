import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import injectSheet from 'react-jss';

const styles = {
  active: {
    opacity: '1 !important',
  },
  normal: {
    border: 'none !important',
    paddingTop: '7px !important',
    paddingBottom: '7px !important',
    background: 'none !important',
  },
  icon: {
    fontSize: '3em',
    width: '1.25em',
    lineHeight: 1,
    marginBottom: '8px',
  },
  label: {
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
  icon: PropTypes.object,
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

const RaisingButton = ({ label, icon, active = false, onClick, shadow = 4, sheet: { classes } }) => (
  <Button
    bsStyle={active ? 'primary' : 'default'}
    className={active ? `${classes.active} shadow--${shadow} material-transition` : `${classes.normal} material-transition`}
    disabled={active}
    onClick={onClick}
  >
    <PartIcon icon={icon} active={active} classes={classes} />
    <PartLabel label={label} active={active} classes={classes} />
  </Button>
);

RaisingButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  icon: PropTypes.object,
  sheet: PropTypes.object.isRequired,
  shadow: PropTypes.number,
};

export default injectSheet(styles)(RaisingButton);
