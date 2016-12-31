import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import FormControl from 'react-bootstrap/lib/FormControl';
import { toastr } from 'react-redux-toastr';

import Field from './field';
import SpecificationsSelectorDialog from '../../common/specificationsSelectorDialog';

const styles = {

};

class SpecificationsField extends Component {
  constructor(props) {
    super(props);
    this.state = { showDialog: false };
  }

  showDialog = () => {
    const { species } = this.props;
    if (!species || !species.objectId) {
      toastr.warning('请先选择货品名称');
    } else {
      this.setState({ showDialog: true });
    }
  }

  hideDialog = () => {
    this.setState({ showDialog: false });
  }

  render() {
    const { input: { value, onChange }, meta, species } = this.props;
    const { showDialog } = this.state;
    return (
      <Field label="规格" required meta={meta}>
        <FormControl
          placeholder="点击选择"
          onClick={this.showDialog}
          value={value.length > 0 ? value.map((spec) => spec.name).reduce((x, y) => `${x}, ${y}`) : value}
          readOnly
        />
        { showDialog && <SpecificationsSelectorDialog species={species} close={this.hideDialog} value={typeof value === 'string' ? [] : value} onSubmit={onChange} />}
      </Field>
    );
  }
}

SpecificationsField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
  species: PropTypes.object,
};


const selector = require('redux-form').formValueSelector('product');

export default connect(
  (state) => ({
    species: selector(state, 'species'),
  })
)(injectSheet(styles)(SpecificationsField));
