import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import DatesDialog from '../../../common/datesDialog';
import { displayPeriod } from '../../../../utils/momentUtils';

const styles = {

};

class DatesField extends Component {
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
        <ControlLabel>供货时间</ControlLabel>
        <FormControl
          placeholder="点击选择"
          onFocus={() => this.setState({ showDialog: true })}
          name={name}
          value={value && displayPeriod(value.start, value.end)}
          onClick={this.showDialog}
          readOnly
        />
        {showError && <HelpBlock>{error}</HelpBlock>}
        {showDialog && <DatesDialog close={this.hideDialog} value={typeof value === 'string' ? {} : value} onSubmit={({ start, end }) => onChange({ start, end })} />}
      </FormGroup>
    );
  }
}

DatesField.propTypes = {
  name: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

export default injectSheet(styles)(DatesField);
