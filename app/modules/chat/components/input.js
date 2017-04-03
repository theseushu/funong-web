import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import Button from 'react-mdl/lib/Button';
import { colors } from 'modules/common/styles';
import { actions } from '../ducks';
import { selectors } from '../ducks/data';

class Input extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    conversation: PropTypes.object,
    sendTextMessage: PropTypes.func.isRequired,
  }
  state = { value: '' }
  render() {
    const { conversation, sendTextMessage, classes } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.wrapper}>
        <div style={{ width: '100%', height: 32, background: 'grey' }}></div>
        <textarea
          className={classes.input}
          value={value}
          onChange={(e) => this.setState({ value: e.target.value })}
        ></textarea>
        <div className={classes.send}>
          <Button
            colored
            disabled={!conversation}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              sendTextMessage({ message: value });
            }}
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
    borderBottom: `solid 1px ${colors.colorLightGrey}`,
  },
  send: {
    textAlign: 'right',
    padding: '0 16px',
  },
})(connect(
  (state) => ({ conversation: selectors.currentConversation(state) }),
  (dispatch) => bindActionCreators({ sendTextMessage: actions.sendTextMessage }, dispatch),
)(Input));
