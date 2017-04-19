import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { getFormValues, isValid } from 'redux-form';
import { generateDisplayName } from 'utils/publishUtils';

const Keywords = ({ className, classes, type, values, valid }) => valid ? (
  <div className={className ? `${classes.keywords} ${className}` : classes.keywords}>{generateDisplayName(values, type)}</div>
  ) : null;

Keywords.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  valid: PropTypes.bool.isRequired,
};

export default (type, formName) => injectSheet({
  keywords: { marginBottom: 24 },
})(connect(
  (state) => ({ type, valid: isValid(formName)(state), values: getFormValues(formName)(state) }),
)(Keywords));
