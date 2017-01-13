import React, { Component, PropTypes } from 'react';
import Button from 'react-mdl/lib/Button';
import Textfield from 'react-mdl/lib/Textfield';
import IconButton from 'react-mdl/lib/IconButton';
import injectSheet from 'react-jss';

class Name extends Component {
  static propTypes = {
    name: PropTypes.string,
    sheet: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }
  render() {
    const { editing } = this.state;
    const { name, sheet: { classes } } = this.props;
    return (
      editing ?
        <span className={classes.textfield}>
          <Textfield
            id="_nameInput"
            label="名称"
            floatingLabel
            style={{ flex: 1 }}
            maxLength={20}
            value={name}
          />
          <IconButton colored name="save" />
          <IconButton colored name="block" onClick={() => this.setState({ editing: false })} />
        </span> :
        <Button colored accent={!name} onClick={() => this.setState({ editing: true })}>{name || '请添加名称'}</Button>
    );
  }
}

export default injectSheet({
  textfield: {
    display: 'flex',
    alignItems: 'center',
  },
})(Name);
