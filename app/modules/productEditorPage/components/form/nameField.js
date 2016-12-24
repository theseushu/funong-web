import React, { Component, PropTypes } from 'react';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
// import InputGroup from 'react-bootstrap/lib/InputGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import SpeciesSelectorDialog from '../../../common/speciesSelectorDialog';

const formatValue = (value) => typeof value === 'string' ? value : value.name;


class NameField extends Component {
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
        <ControlLabel>货品名称</ControlLabel>
        <FormControl
          placeholder="点击选择"
          name={name}
          value={formatValue(value)}
          onClick={this.showDialog}
          readOnly
        />
        {showError && <HelpBlock>{error}</HelpBlock>}
        { showDialog && <SpeciesSelectorDialog close={this.hideDialog} value={typeof value === 'string' ? null : value} onSubmit={onChange} />}
      </FormGroup>
    );
  }
}

NameField.propTypes = {
  name: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

export default NameField;
