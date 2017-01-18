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
    const { desc } = this.props.profile;
    this.state = { editing: false, desc: (desc && desc.text) || '', descFiles: (desc && desc.images) || [] };
  }
  updateProfile = (e) => {
    e.preventDefault();
    const { profile, updateProfile } = this.props;
    const { desc, descFiles } = this.state;
    updateProfile({ profileId: profile.objectId,
      desc: { text: desc, images: descFiles },
      meta: {
        resolve: () => {
          this.setState({ editing: false });
        },
      },
    });
  }
  enableSave = () => {
    const { desc, descFiles, pending } = this.state;
    const { profile } = this.props;
    const initDesc = (profile.desc && profile.desc.text) || '';
    const initFiles = profile.descFiles || [];
    if (pending) {
      return false;
    }
    return desc !== initDesc && descFiles !== initFiles;
  }
  render() {
    const { desc, descFiles, editing } = this.state;
    const { sheet: { classes }, pending } = this.props;
    const buttons = [];
    if (editing) {
      buttons.push(pending ? <Spinner key={0} /> : <IconButton key={0} colored name="save" disabled={!this.enableSave()} type="submit" onClick={this.updateProfile} />);
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
          key={0} colored accent={!desc}
          onClick={() => this.setState({ editing: true })}
        >{desc ? '修改' : '介绍一下自己吧'}</Button>
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
          <Photos editing={editing} files={descFiles} onChange={(f) => { this.setState({ descFiles: f }); }} />
        }
        {
          editing ? <Textfield
            style={{ width: '100%', boxSizing: 'border-box' }} rows={4}
            label="介绍文字" maxLength={20000}
            value={desc} autoFocus onChange={(e) => this.setState({ desc: e.target.value })}
          /> : <p style={{ paddingTop: 20, fontSize: 16 }}>{desc}</p>
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
