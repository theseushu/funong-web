import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectSheet from 'react-jss';
import FormControl from 'react-bootstrap/lib/FormControl';
import Field from './field';
import { actions } from '../../mapDialog/ducks';

const styles = {

};

const formatLocation = (value) => (typeof value === 'object' ? `${value.country || ''}${value.province || ''}${value.city || ''}${value.district || ''}` : value);

class LocationField extends Component {
  constructor(props) {
    super(props);
    this.state = { showDialog: false };
  }

  render() {
    const { input: { value, onChange }, meta, openDialog } = this.props;
    return (
      <Field label="发货地点" required meta={meta}>
        <FormControl
          placeholder="点击选择"
          value={formatLocation(value)}
          onClick={openDialog}
          readOnly
        />
      </Field>
    );
  }
}

LocationField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
  openDialog: PropTypes.func.isRequired,
};

export default connect(
  null,
  (dispatch) => bindActionCreators({ openDialog: actions.openDialog }, dispatch)
)(injectSheet(styles)(LocationField));
