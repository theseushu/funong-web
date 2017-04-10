import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import DateTime from 'react-datetime';
import { SimpleDialog } from 'modules/common/dialog';
import moment from 'moment';

export const defaultValidate = ({ desc, images }) => images.length > 0 && desc.length > 10;

class DescDialog extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitOnChange: PropTypes.bool,
    title: PropTypes.string,
    value: PropTypes.number,
    props: PropTypes.object,
  };
  componentWillMount() {
    const { value } = this.props;
    this.setState({ value: value != null ? moment(value) : null });
  }
  onChange = (value) => {
    this.setState({ value }, () => {
      if (this.props.submitOnChange) {
        this.onSubmit();
      }
    });
  }
  onSubmit = () => {
    const { onSubmit } = this.props;
    const { value } = this.state;
    onSubmit(value);
    this.props.close();
  }
  render() {
    const { close, show, title, props, classes } = this.props;
    const { value } = this.state;
    return (
      <SimpleDialog
        show={show}
        onHide={close}
        onCancel={close}
        title={title || '选择时间'}
        content={
          <div className={classes.dateTimeDialog}>
            <DateTime
              open
              value={value}
              onChange={this.onChange}
              {...props}
            />
          </div>
        }
        submit={{
          onSubmit: this.onSubmit,
          disabled: !value,
        }}
      />
    );
  }
}


export default injectSheet({
  dateTimeDialog: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
})(DescDialog);
