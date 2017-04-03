import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import Button from 'react-mdl/lib/Button';
import { colors } from 'modules/common/styles';
import { messageTypes } from '../constants';
import { actions as messageActions } from '../ducks/message';
import { selectors } from '../ducks/data';

let messageKey = 0;
class Input extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    conversation: PropTypes.object,
    sendTextMessage: PropTypes.func.isRequired,
  }
  state = { value: '' }
  handleKeyPress = (e) => {
    if (e.nativeEvent.keyCode === 13) {
      if (e.nativeEvent.shiftKey) {
        e.preventDefault();
        this.send();
      }
    }
  }
  send = () => {
    const { conversation, sendTextMessage } = this.props;
    const { value } = this.state;
    if (conversation && value) {
      messageKey += 1;
      sendTextMessage({ conversation, message: { type: messageTypes.text, text: value }, meta: { storeKey: messageKey } });
      this.setState({ value: '' });
    }
  }
  render() {
    const { conversation, classes } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.wrapper}>
        <div style={{ width: '100%', height: 32, background: 'grey' }}></div>
        <textarea
          className={classes.input}
          value={value}
          onChange={(e) => this.setState({ value: e.target.value })}
          onKeyDown={this.handleKeyPress}
        ></textarea>
        <div className={classes.send}>
          <small>(Shift+Enter)</small>
          <Button
            colored
            disabled={!conversation || !value}
            onClick={this.send}
          >发送</Button>
        </div>
      </div>
    );
  }
}

export default injectSheet({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    flex: 1,
    fontSize: '13px',
    lineHeight: '20px',
    height: 100,
    resize: 'none',
    outline: 'none',
    padding: 8,
    borderBottom: `solid 1px ${colors.colorLightGrey}`,
  },
  send: {
    textAlign: 'right',
    padding: '0 16px',
  },
})(connect(
  (state) => ({ conversation: selectors.currentConversation(state) }),
  (dispatch) => bindActionCreators({ sendTextMessage: messageActions.send }, dispatch),
)(Input));
