import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';

import FormControl from 'react-bootstrap/lib/FormControl';

import DatesDialog from '../../common/datesDialog';
import { displayPeriod } from '../../../utils/momentUtils';

import Field from './field';

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
    const { input: { value, onChange }, meta } = this.props;
    const { showDialog } = this.state;
    return (
      <Field label="供货时间" required meta={meta}>
        <FormControl
          placeholder="点击选择"
          onFocus={() => this.setState({ showDialog: true })}
          value={value && displayPeriod(value.start, value.end)}
          onClick={this.showDialog}
          readOnly
        />
        {showDialog && <DatesDialog close={this.hideDialog} value={typeof value === 'string' ? {} : value} onSubmit={({ start, end }) => onChange({ start, end })} />}
      </Field>
    );
  }
}

DatesField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

export default injectSheet(styles)(DatesField);
