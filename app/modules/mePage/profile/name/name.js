import React, { Component, PropTypes } from 'react';
import Button from 'react-mdl/lib/Button';
import Textfield from 'react-mdl/lib/Textfield';
import IconButton from 'react-mdl/lib/IconButton';
import Spinner from 'react-mdl/lib/Spinner';
import injectSheet from 'react-jss';
import Line from '../line';
import styles from '../styles';

class Name extends Component {
  static propTypes = {
    profile: PropTypes.object,
    sheet: PropTypes.object,
    updateProfile: PropTypes.func.isRequired,
    pending: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.state = { editing: false, name: props.profile.name || '' };
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
    return (
      <Line
        title="名称"
        content={
          editing ?
            <form onSubmit={this.updateProfile}>
              <Textfield
                autoFocus
                label="名称"
                maxLength={20}
                onChange={(e) => this.setState({ name: e.target.value })}
                value={name}
                className={classes.input}
              />
              {pending ? <Spinner /> : <IconButton colored name="save" disabled={!name} type="submit" />}
              <IconButton
                colored name="block" onClick={(e) => {
                  e.preventDefault();
                  this.setState({ editing: false });
                }}
              />
            </form> :
            <Button
              colored accent={!profile.name}
              onClick={() => this.setState({ editing: true })}
            >{profile.name || '请添加名称'}</Button>
        }
      />
    );
  }
}

export default injectSheet({
  ...styles,
})(Name);
