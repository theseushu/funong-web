import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Textfield from 'react-mdl/lib/Textfield';
import { SimpleDialog } from 'modules/common/dialog';

const valueRegex = /^[0-9]{1,7}(\.[0-9]{1,2})?$/; // 0.01 - 9999999.99

class AdditionalFeeDialog extends Component {
  static propTypes = {
    title: PropTypes.string,
    label: PropTypes.string,
    close: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    value: PropTypes.number,
  };
  constructor(props) {
    super(props);
    const value = props.value || '';
    this.state = { value };
  }
  submit = () => {
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit(Number(this.state.value));
    }
    this.props.close();
  }
  render() {
    const { title, label, close } = this.props;
    const { value } = this.state;
    return (
      <SimpleDialog
        show
        onHide={close}
        onCancel={close}
        title={title || '额外费用'}
        content={
          <Textfield
            name="_price"
            label={label || '额外费用'}
            value={value}
            onChange={(e) => this.setState({ value: e.target.value })}
            error={valueRegex.test(value) ? null : '请使用正数'}
          />
        }
        submit={{
          onSubmit: this.submit,
          disabled: !valueRegex.test(value),
        }}
      />
    );
  }
}


export default injectSheet({})(AdditionalFeeDialog);
