import React, { Component, PropTypes } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import injectSheet from 'react-jss';
import { SimpleDialog } from 'modules/common/dialog';
import { getRoundedScaledCanvas } from 'utils/canvasUtils';
import { breakpoints } from 'modules/common/styles';


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

  constructor(props) {
    super(props);
    this.state = { open: true };
  }

  componentWillUnmount() {
    this.cropper.destroy();
  }

  crop = () => {
    const croppedCanvas = this.cropper.getCroppedCanvas();
    const roundedCanvas = getRoundedScaledCanvas(croppedCanvas, 160, 160);
    this.props.onCrop(roundedCanvas.toDataURL());
    this.setState({ open: false });
  };

  close = () => {
    const { close } = this.props;
    this.setState({ open: false }, () => {
      close();
    });
  }

  render() {
    const { sheet: { classes }, image } = this.props;
    // if screenWidth > desktop width, let height be image height. if not, it will be a full screen dialog
    const imageHeight = image.getAttribute('height');
    const imageWidth = image.getAttribute('width');
    const height = imageHeight * (468 / imageWidth);
    const content = (
      <div
        ref={(imageWrapper) => {
          this.imageWrapper = imageWrapper;
          if (imageWrapper) {
            imageWrapper.appendChild(image);
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
        }}
        className={classes.defaultCanvasWrapper} style={{ height, maxHeight: 'calc(100vh - 68px)' }}
      />
    );
    return (
      <SimpleDialog
        show
        close={this.close}
        onCancel={this.close}
        title="截取头像"
        content={content}
        submit={{
          onSubmit: this.crop,
          disabled: false,
        }}
      />
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
