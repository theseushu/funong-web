import React, { Component, PropTypes } from 'react';

class DateTimePicker extends Component {
  static propTypes = {
    options: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    children: PropTypes.node,
  }

  static defaultProps = {
    options: {},
  }

  componentDidMount() {
    const Flatpickr = require('flatpickr'); // eslint-disable-line
    const options = {
      ...this.props.options,
      defaultDate: this.props.value,
      onChange: (v) => {
        this.props.onChange(v);
        if (!options.enableTime) {
          this.flatpickr.close();
        }
      },
    };

    this.flatpickr = new Flatpickr(this.node, options);
  }

  componentWillReceiveProps(props) {
    if (props.value) {
      this.flatpickr.setDate(props.value, false);
    }

    const optionsKeys = Object.getOwnPropertyNames(props.options);

    for (let index = optionsKeys.length - 1; index >= 0; index -= 1) {
      const key = optionsKeys[index];
      this.flatpickr.set(key, props.options[key]);
    }
  }

  componentWillUnmount() {
    this.flatpickr.destroy();
  }

  render() {
    // ignore onChange
    // eslint-disable-next-line no-unused-vars
    const { onChange, options, value, children, ...props } = this.props;
    return options.wrap
      ? (
        <div {...props} ref={(node) => { this.node = node; }}>
          { children }
        </div>
    )
      : (
        <input
          {...props}
          ref={(node) => { this.node = node; }}
        />
    );
  }
}

export default DateTimePicker;
