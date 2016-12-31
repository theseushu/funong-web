import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import FormControl from 'react-bootstrap/lib/FormControl';
import Field from './field';
import LocationDialog from '../../common/locationDialog';

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
    const { name, input: { value, onChange }, meta } = this.props;
    const { showDialog } = this.state;
    return (
      <Field label="发货地点" required meta={meta}>
        <FormControl
          placeholder="点击选择"
          name={name}
          value={formatLocation(value)}
          onClick={this.showDialog}
          readOnly
        />
        { showDialog && <LocationDialog close={this.hideDialog} value={typeof value === 'string' ? null : value} onSubmit={onChange} />}
      </Field>
    );
  }
}

LocationField.propTypes = {
  name: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

export default injectSheet(styles)(LocationField);
