import React, { PropTypes } from 'react';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import Switch from 'react-mdl/lib/Switch';

const AvailableField = ({ input: { value, onChange }, sheet: { classes } }) => (
  <Grid>
    <Cell col={4} tablet={3} phone={2} className={classes.field}>
      直接上架
    </Cell>
    <Cell col={8} tablet={5} phone={2} className={classes.field}>
      <Switch style={{ marginLeft: 16 }} ripple id="_shop_product_available" checked={value} onChange={(e) => onChange(e.target.checked)}></Switch>
    </Cell>
  </Grid>
);
AvailableField.propTypes = {
  input: PropTypes.object.isRequired,
  sheet: PropTypes.object.isRequired,
};

export default AvailableField;
