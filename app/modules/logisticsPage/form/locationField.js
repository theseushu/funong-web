import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectSheet from 'react-jss';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import FormButton from '../../common/formElements/button';
import { actions } from '../../mapDialog/ducks';
import { formatAddress } from '../../../utils/displayUtils';
import styles from '../../common/styles';

const LocationField = ({ input: { value, onChange }, meta: { error }, openDialog, sheet: { classes } }) => (
  <Grid className={error && styles.colorError}>
    <Cell col={4} tablet={3} phone={2} className={classes.field}>
      常驻地
    </Cell>
    <Cell col={8} tablet={5} phone={2} className={classes.field}>
      <FormButton
        error={error} onClick={(e) => {
          e.preventDefault();
          openDialog({
            onSubmit: onChange,
            location: value === '' ? null : value,
          });
        }}
      >
        {value === '' ? '点击选择' : formatAddress(value.address)}
      </FormButton>
    </Cell>
  </Grid>
);

LocationField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
  openDialog: PropTypes.func.isRequired,
  sheet: PropTypes.object.isRequired,
};

export default connect(
  null,
  (dispatch) => bindActionCreators({ openDialog: actions.openDialog }, dispatch)
)(injectSheet({
  field: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})(LocationField));
