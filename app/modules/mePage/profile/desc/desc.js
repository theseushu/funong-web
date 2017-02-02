import React, { Component, PropTypes } from 'react';
import Button from 'react-mdl/lib/Button';
import IconButton from 'react-mdl/lib/IconButton';
import Spinner from 'react-mdl/lib/Spinner';
import injectSheet from 'react-jss';
import Line from '../line';
import RichContent from '../../../common/richContent';

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
    this.state = { editing: false, text: desc.text || '', images: (desc && desc.images) || [] };
  }
  save = () => {
    const { profile, updateProfile } = this.props;
    const { text, images } = this.state;
    updateProfile({ profileId: profile.objectId,
      desc: { text, images },
      meta: {
        resolve: () => {
          this.setState({ editing: false });
        },
      },
    });
  }
  cancel = () => {
    const { desc = {} } = this.props.profile;
    this.setState({ editing: false, text: desc.text || '', images: (desc && desc.images) || [] });
  }
  enableSave = () => {
    const { text, images, pending } = this.state;
    const { profile } = this.props;
    const initText = (profile.desc && profile.desc.text) || '';
    const initImages = (profile.desc && profile.desc.images) || [];
    if (pending) {
      return false;
    }
    return text !== initText || images !== initImages;
  }
  render() {
    const { text, images, editing } = this.state;
    const { sheet: { classes }, pending } = this.props;
    const buttons = [];
    if (editing) {
      buttons.push(pending ? <Spinner key={0} /> : <IconButton key={0} colored name="save" disabled={!this.enableSave()} type="submit" onClick={this.save} />);
      buttons.push(<IconButton key={1} colored name="block" onClick={this.cancel} />);
    } else {
      buttons.push(
        <Button
          key={0} colored accent={!text}
          onClick={() => this.setState({ editing: true })}
        >{text ? '修改' : '介绍一下自己吧'}</Button>
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
        <RichContent
          richContent={{ text, images }}
          editing={editing}
          textLabel={''}
          onImagesChange={(newImages) => { this.setState({ images: newImages }); }}
          onTextChange={(newText) => this.setState({ text: newText })}
          allowGallery
        />
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
