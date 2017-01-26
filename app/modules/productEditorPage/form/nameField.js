import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import Textfield from 'react-mdl/lib/Textfield';
import { formValueSelector } from 'redux-form';
import FORM_NAME from './formName';

const NameField = ({ input: { value, onChange }, category, species, meta: { dirty, error } }) => {
  const showError = (!!dirty) && (!!error);
  return (
    <Grid>
      <Cell col={12}>
        <Textfield
          floatingLabel
          label="名称"
          style={{ width: '100%', minWidth: 200 }}
          error={showError ? error : ''}
          value={value === '' ? `${category ? category.name : ''} ${species ? species.name : ''}` : value}
          onChange={(e) => onChange(e.target.value)}
        />
      </Cell>
    </Grid>
  );
};

NameField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  category: PropTypes.object,
  species: PropTypes.object,
};

export default connect(
  (state) => ({
    category: formValueSelector(FORM_NAME)(state, 'category'),
    species: formValueSelector(FORM_NAME)(state, 'species'),
  })
)(NameField);
