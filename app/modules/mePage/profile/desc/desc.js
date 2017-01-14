import React, { Component, PropTypes } from 'react';
import Button from 'react-mdl/lib/Button';
import IconButton from 'react-mdl/lib/IconButton';
import Spinner from 'react-mdl/lib/Spinner';
import Textfield from 'react-mdl/lib/Textfield';
import injectSheet from 'react-jss';
import Line from '../line';
import Photos from './photos';

class Desc extends Component {
  static propTypes = {
    profile: PropTypes.object,
    sheet: PropTypes.object,
    updateProfile: PropTypes.func.isRequired,
    pending: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    const { desc = {} } = this.props.profile;
    const { text = '' } = desc;
    this.state = { editing: false, text };
  }
  updateProfile = (e) => {
    e.preventDefault();
    const { profile, updateProfile } = this.props;
    const { name } = this.state;
    updateProfile({ profileId: profile.objectId,
      name,
      meta: {
        resolve: () => {
          this.setState({ editing: false });
        },
      },
    });
  }
  render() {
    const { name, editing } = this.state;
    const { sheet: { classes }, pending, profile } = this.props;
    const buttons = [];
    if (editing) {
      buttons.push(pending ? <Spinner key={0} /> : <IconButton key={0} colored name="save" disabled={!name} type="submit" />);
      buttons.push(
        <IconButton
          key={1} colored name="block" onClick={(e) => {
            e.preventDefault();
            this.setState({ editing: false });
          }}
        />
      );
    } else {
      buttons.push(
        <Button
          key={0} colored accent={!profile.name}
          onClick={() => this.setState({ editing: true })}
        >{'修改' || '介绍一下自己吧'}</Button>
      );
    }
    return (
      <Line
        title="介绍"
        content={
          <div className={classes.textfield}>
            {buttons}
          </div>
        }
      >
        {
          editing ? <Photos onChange={() => {}} /> : null
        }
        {
          editing ? <Textfield
            style={{ width: '100%', boxSizing: 'border-box' }} rows={4}
            label="介绍文字" maxLength={20000}
            value={this.state.text} autoFocus onChange={(e) => this.setState({ text: e.target.value })}
          /> : null
        }
      </Line>
    );
  }
}

export default injectSheet({
  textfield: {
    display: 'flex',
    alignItems: 'center',
  },
})(Desc);
