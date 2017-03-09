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
      editing ?
        <form onSubmit={this.updateProfile}>
          <Line
            title="名称"
            content={[
              <Textfield
                key={0}
                autoFocus
                name="_user_name"
                label="名称"
                maxLength={20}
                onChange={(e) => this.setState({ name: e.target.value })}
                value={name}
                className={classes.input}
              />,
              pending ? <Spinner key={1} /> : <IconButton key={1} colored name="save" disabled={!name} type="submit" />,
              <IconButton
                key={2}
                colored name="block" onClick={(e) => {
                  e.preventDefault();
                  this.setState({ editing: false });
                }}
              />,
            ]}
          />
        </form> :
        <Line
          title="名称"
          content={
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
