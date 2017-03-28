import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Switch from 'react-mdl/lib/Switch';
import Checkbox from 'react-mdl/lib/Checkbox';

const Services = ({ value, title, checked, charge, onChange, pending, classes }) => (
  <div className={classes.service}>
    <Switch
      ripple
      disabled={pending}
      checked={checked}
      onChange={(e) => {
        onChange(value, e.target.checked, e.target.checked ? true : charge);
      }}
    >{title}</Switch>
    <Checkbox
      style={{ width: 56 }}
      ripple
      label="收费"
      disabled={!checked || pending}
      checked={charge}
      onChange={(e) => {
        onChange(value, true, e.target.checked);
      }}
    />
  </div>
  );

Services.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  charge: PropTypes.bool.isRequired,
  pending: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default injectSheet({
  service: {
    width: '100%',
    display: 'flex',
    height: 48,
    '& > .mdl-switch': {
      flex: 1,
    },
    '& > .mdl-checkbox': {
      width: 80,
    },
  },
})(Services);
