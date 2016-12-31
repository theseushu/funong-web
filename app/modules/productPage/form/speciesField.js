import React, { Component, PropTypes } from 'react';

import FormControl from 'react-bootstrap/lib/FormControl';

import Field from './field';
import SpeciesSelectorDialog from '../../common/speciesSelectorDialog';

const formatValue = (value) => typeof value === 'string' ? value : value.name;


class SpeciesField extends Component {
  constructor(props) {
    super(props);
    this.state = { showDialog: false };
  }

  showDialog = () => {
    this.setState({ showDialog: true });
  }

  hideDialog = () => {
    this.setState({ showDialog: false });
  }

  render() {
    const { input: { value, onChange }, meta } = this.props;
    const { showDialog } = this.state;
    return (
      <Field label="货品名称" required meta={meta}>
        <FormControl
          placeholder="点击选择"
          value={formatValue(value)}
          onClick={this.showDialog}
          readOnly
        />
        { showDialog && <SpeciesSelectorDialog close={this.hideDialog} value={typeof value === 'string' ? null : value} onSubmit={onChange} />}
      </Field>
    );
  }
}

SpeciesField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

export default SpeciesField;
