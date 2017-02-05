import React, { PropTypes } from 'react';
import injectJss from 'react-jss';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import Textfield from 'react-mdl/lib/Textfield';

const CapacityField = ({ input: { value = '', onChange }, meta: { error }, sheet: { classes } }) => (
  <Grid>
    <Cell col={12}>
      <div className={classes.wrapper}>
        <Textfield
          label={'最大运输量（吨）'}
          name="_capacity"
          type="number"
          floatingLabel
          className={classes.input}
          onChange={onChange}
          value={value}
          required
          error={value === '' ? null : error}
        />
      </div>
    </Cell>
  </Grid>
  );

CapacityField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  sheet: PropTypes.object.isRequired,
};

export default injectJss({
  wrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    '& .mdl-autocomplete': {
      flex: 1,
      width: '100%',
    },
  },
  input: {
    width: '100%',
  },
})(CapacityField);
