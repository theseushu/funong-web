import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import Namefield from '../../nameField';

const CategorySpeciesNameNameField = ({ disabled }) => (
  <Namefield disabled={disabled} label={disabled ? '请先选择品种' : '名称'} />
  );

CategorySpeciesNameNameField.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

export default connect(
  (state, { form }) => ({ disabled: !formValueSelector(form)(state, 'category') || !formValueSelector(form)(state, 'species') }),
)(CategorySpeciesNameNameField);
