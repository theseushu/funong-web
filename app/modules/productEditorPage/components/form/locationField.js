import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import LocationDialog from '../../../common/locationDialog';

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
    const { name, input: { value, onChange }, meta: { dirty, error } } = this.props;
    const showError = (!!dirty) && (!!error);
    const { showDialog } = this.state;
    return (
      <FormGroup validationState={showError ? 'error' : undefined}>
        <ControlLabel>发货地点</ControlLabel>
        <FormControl
          placeholder="点击选择"
          name={name}
          value={formatLocation(value)}
          onClick={this.showDialog}
          readOnly
        />
        {showError && <HelpBlock>{error}</HelpBlock>}
        { showDialog && <LocationDialog close={this.hideDialog} value={typeof value === 'string' ? {} : value} onSubmit={onChange} />}
      </FormGroup>
    );
  }
}

LocationField.propTypes = {
  name: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

export default injectSheet(styles)(LocationField);
