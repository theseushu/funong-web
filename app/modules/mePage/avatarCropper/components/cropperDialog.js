import React, { Component, PropTypes } from 'react';
import { Dialog, DialogActions } from 'react-mdl/lib/Dialog';
import Button from 'react-mdl/lib/Button';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import injectSheet from 'react-jss';
import { getRoundedScaledCanvas } from '../../../../utils/canvasUtils';
import { breakpoints } from '../../../common/styles';


// I'm using toDataURL now, so there's no need to import this polyfill. keep it here for future references
// if (__CLIENT__) // canvas to blob polyfill
//   require('blueimp-canvas-to-blob');

class CropperDialog extends Component {
  static propTypes = {
    image: PropTypes.object.isRequired,
    onCrop: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    sheet: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.imageWrapper.appendChild(this.props.image);
    this.cropper = new Cropper(this.props.image, {
      viewMode: 1,
      aspectRatio: 1,
      autoCropArea: 1,
      guides: false,
      dragMode: 'move',
      rotatable: false,
      cropBoxMovable: false,
      cropBoxResizable: false,
      responsive: true,
      background: false,
    });
  }

  componentWillUnmount() {
    this.cropper.destroy();
  }

  crop = () => {
    const croppedCanvas = this.cropper.getCroppedCanvas();
    const roundedCanvas = getRoundedScaledCanvas(croppedCanvas, 160, 160);
    this.props.onCrop(roundedCanvas.toDataURL());
  };

  render() {
    const { close, sheet: { classes }, image } = this.props;
    // if screenWidth > desktop width, let height be image height. if not, it will be a full screen dialog
    let height = 0;
    const imageHeight = image.getAttribute('height');
    const screenWidth = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    if (screenWidth >= breakpoints.desktop) {
      height = `${imageHeight}px`;
    } else {
      height = 'calc(100vh - 68px)';
    }
    return (
      <Dialog open onCancel={close} className={classes.dialog}>
        <div ref={(imageWrapper) => { this.imageWrapper = imageWrapper; }} className={classes.defaultCanvasWrapper} style={{ height, maxHeight: 'calc(100vh - 68px)' }}>
        </div>
        <DialogActions>
          <Button onClick={close}>取消</Button>
          <Button onClick={this.crop}>确定</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default injectSheet({
  dialog: {
    width: '100%',
    maxWidth: 768,
    boxSizing: 'border-box',
    maxHeight: '100vh',
    [breakpoints.mediaDestkopBelow]: {
      height: '100vh',
    },
  },
  defaultCanvasWrapper: {
    '& .cropper-view-box, .cropper-face': {
      borderRadius: '50%',
      outline: 'none !important',
    },
  },
})(CropperDialog);
