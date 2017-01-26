import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import FormControl from 'react-bootstrap/lib/FormControl';
import Field from './field';
import MapDialog from '../../common/mapDialog';

const styles = {

};

const formatLocation = (value) => (typeof value === 'object' ? `${value.country || ''}${value.province || ''}${value.city || ''}${value.district || ''}` : value);

class LocationField extends Component {
  constructor(props) {
    super(props);
    this.state = { showDialog: false };
  }

  showDialog = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showDialog: true });
  }

  hideDialog = () => {
    this.setState({ showDialog: false });
  }

  render() {
    const { input: { value, onChange }, meta } = this.props;
    const { showDialog } = this.state;
    return (
      <Field label="发货地点" required meta={meta}>
        <FormControl
          placeholder="点击选择"
          value={formatLocation(value)}
          onClick={this.showDialog}
          readOnly
        />
        { showDialog && <MapDialog close={this.hideDialog} value={typeof value === 'string' ? null : value} onSubmit={onChange} />}
      </Field>
    );
  }
}

LocationField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

export default injectSheet(styles)(LocationField);
