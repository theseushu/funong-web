import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
// import CircularProgress from 'material-ui/CircularProgress';

import CropperDialog from './cropperDialog';

const styles = {
  spaceHolder: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    overflow: 'hidden',
  },
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    background: 'none',
    zIndex: 9999,
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9998,
    width: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
  },
};

class AvatarCropperComponent extends Component {
  static propTypes = {
    uploadAvatar: PropTypes.func.isRequired,
    uploadAvatarProgress: PropTypes.func.isRequired,
    pending: PropTypes.bool,
    // rejected: PropTypes.bool,
    // error: PropTypes.object,
    sheet: PropTypes.object,
    percent: PropTypes.number,
    dataUrl: PropTypes.string,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  onClick = (e) => {
    e.preventDefault();
    this.fileSelector.click();
  }
  onCrop = (data) => {
    this.closeCropper();
    this.props.uploadAvatar({
      filename: 'avatar.png',
      dataUrl: data,
      onprogress: ({ percent }) => {
        this.props.uploadAvatarProgress(percent);
      },
    });
    this.setState({ croppedAvatar: data });
  }
  fileSelected = (e) => {
    if (typeof window === 'object') {
      const loadImage = require('blueimp-load-image'); // eslint-disable-line global-require
      loadImage(
        e.target.files[0],
        (img) => {
          this.setState({ image: img });
        },
        { contain: true, canvas: true, maxWidth: 740 } // Options
      );
    }
  }
  closeCropper = () => {
    this.fileSelector.value = null;
    this.setState({ image: undefined });
  }
  render() {
    const { pending, percent, dataUrl, sheet: { classes } } = this.props;
    // const { rejected, error } = this.props
    return (
      <div className={classes.spaceHolder}>
        <a href="#showAvatar" onClick={this.onClick}>
          <div className={classes.wrapper}>
            {pending && <img role="presentation" src={dataUrl} />}
            {pending && <div className={classes.progress} style={{ height: `${100 - percent}%` }}></div>}
            {this.state.image && <CropperDialog close={this.closeCropper} onCrop={this.onCrop} image={this.state.image} />}
          </div>
        </a>
        <input className="hidden" onChange={this.fileSelected} type="file" ref={(fileSelector) => { this.fileSelector = fileSelector; }} />
      </div>
    );
  }
}

export default injectSheet(styles)(AvatarCropperComponent);
