import React, { Component, PropTypes } from 'react';
import _isEqual from 'lodash/isEqual';
import _isEmpty from 'lodash/isEmpty';
import Button from 'react-mdl/lib/Button';
import IconButton from 'react-mdl/lib/IconButton';
import Spinner from 'react-mdl/lib/Spinner';
import injectSheet from 'react-jss';
import RichContent from 'modules/common/richContent';
import Line from '../line';

class Desc extends Component {
  static propTypes = {
    user: PropTypes.object,
    sheet: PropTypes.object,
    updateProfile: PropTypes.func.isRequired,
    pending: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    const { desc = '', images = [] } = this.props.user;
    this.state = { editing: false, desc, images };
  }
  save = () => {
    const { updateProfile } = this.props;
    const { desc, images } = this.state;
    updateProfile({
      desc,
      images,
      meta: {
        resolve: () => {
          this.setState({ editing: false });
        },
      },
    });
  }
  cancel = () => {
    const { desc = '', images = [] } = this.props.user;
    this.setState({ editing: false, desc, images });
  }
  // todo use this method to disable save button after changing to new rich editor
  enableSave = () => {
    const { desc, images, pending } = this.state;
    const { user } = this.props;
    const initDesc = user.desc || '';
    const initImages = user.images || [];
    if (pending) {
      return false;
    }
    return desc !== initDesc || !_isEqual(images, initImages);
  }
  render() {
    const { desc, images, editing } = this.state;
    const { sheet: { classes }, pending } = this.props;
    const buttons = [];
    if (editing) {
      buttons.push(pending ? <Spinner key={0} /> : <IconButton key={0} colored name="save" type="submit" onClick={this.save} />);
      buttons.push(<IconButton key={1} colored name="block" onClick={this.cancel} />);
    } else {
      const empty = _isEmpty(desc) && _isEmpty(images);
      buttons.push(
        <Button
          key={0} colored accent={empty}
          onClick={() => this.setState({ editing: true })}
        >{empty ? '介绍一下自己吧' : '修改'}</Button>
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
          richContent={{ desc, images }}
          editing={editing}
          descLabel={''}
          onImagesChange={(newImages) => { this.setState({ images: newImages }); }}
          onDescChange={(newDesc) => this.setState({ desc: newDesc })}
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
