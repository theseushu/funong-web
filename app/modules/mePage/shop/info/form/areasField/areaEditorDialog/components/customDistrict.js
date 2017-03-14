import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Textfield from 'react-mdl/lib/Textfield';

const CustomDistrict = ({ value, error, onChange, classes }) => (
  <div>
    <Textfield
      className={classes.input}
      floatingLabel
      label="店铺周边"
      value={value}
      type="number"
      name="_area_minimum"
      onChange={(e) => onChange(e.target.value)}
      error={error}
    />
    公里
  </div>
);

CustomDistrict.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.any,
};

export default injectSheet({
  input: {
    margin: 16,
    width: 100,
  },
})(CustomDistrict);
