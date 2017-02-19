import React, { PropTypes } from 'react';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import Switch from 'react-mdl/lib/Switch';

const RecommendField = ({ input: { value, onChange }, sheet: { classes } }) => (
  <Grid>
    <Cell col={4} tablet={3} phone={2} className={classes.field}>
      店长推荐
    </Cell>
    <Cell col={8} tablet={5} phone={2} className={classes.field}>
      <Switch style={{ marginLeft: 16 }} ripple id="_shop_product_recommend" checked={value} onChange={(e) => onChange(e.target.checked)}></Switch>
    </Cell>
  </Grid>
);
RecommendField.propTypes = {
  input: PropTypes.object.isRequired,
  sheet: PropTypes.object.isRequired,
};

export default RecommendField;
