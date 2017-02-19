import React, { PropTypes } from 'react';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import Checkbox from 'react-mdl/lib/Checkbox';
import { productLabels } from 'appConstants';

const LabelsField = ({ input: { value, onChange }, sheet: { classes } }) => (
  <Grid>
    <Cell col={12} className={classes.field}>
      {
        Object.values(productLabels).map(({ title, key }, i) => (
          <Checkbox key={i} ripple checked={!!value[key]} label={title} onChange={(e) => onChange({ ...value, [key]: e.target.checked })} />
        ))
      }
    </Cell>
  </Grid>
);
LabelsField.propTypes = {
  input: PropTypes.object.isRequired,
  sheet: PropTypes.object.isRequired,
};

export default LabelsField;
