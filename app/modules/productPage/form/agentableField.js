import React, { PropTypes } from 'react';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import Switch from 'react-mdl/lib/Switch';

const AgentableField = ({ input: { value, onChange }, sheet: { classes } }) => (
  <Grid>
    <Cell col={4} tablet={3} phone={2} className={classes.field}>
      可代销
    </Cell>
    <Cell col={8} tablet={5} phone={2} className={classes.field}>
      <Switch style={{ marginLeft: 16 }} ripple id="_shop_product_recommend" checked={value} onChange={(e) => onChange(e.target.checked)}></Switch>
    </Cell>
  </Grid>
);
AgentableField.propTypes = {
  input: PropTypes.object.isRequired,
  sheet: PropTypes.object.isRequired,
};

export default AgentableField;
