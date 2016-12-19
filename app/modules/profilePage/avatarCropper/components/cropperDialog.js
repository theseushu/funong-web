import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Cropper from 'cropperjs';
import injectSheet from 'react-jss';

import { getRoundedScaledCanvas } from '../../../../utils/canvasUtils';

require('cropperjs/dist/cropper.css');

// I'm using toDataURL now, so there's no need to import this polyfill. keep it here for future references
// if (__CLIENT__) // canvas to blob polyfill
//   require('blueimp-canvas-to-blob');

const styles = {
  defaultCanvasWrapper: {
    maxHeight: '100%',
    '& canvas': {
      // maxWidth: '100%'
    },
    '& .cropper-view-box, .cropper-face': {
      borderRadius: '50%',
      outline: 'none !important',
    },
  },
};

class CropperDialog extends Component {
  static propTypes = {
    image: PropTypes.object.isRequired,
    onCrop: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    sheet: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.image.setAttribute('style', 'max-width: 100%; max-height: 100%');
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
    const { close, sheet: { classes } } = this.props;
    const padding = 8;
    let height = 0;
    const imageWidth = this.props.image.getAttribute('width');
    const imageHeight = this.props.image.getAttribute('height');
    const screenWidth = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    if (screenWidth > 768) {
      height = imageHeight;
    } else {
      height = (screenWidth - (padding * 2)) / (imageWidth / imageHeight);
    }
    return (
      <Modal show onHide={close}>
        <Modal.Body>
          <div ref={(imageWrapper) => { this.imageWrapper = imageWrapper; }} style={{ minHeight: `${height}px` }} className={classes.defaultCanvasWrapper}>

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close}>取消</Button>
          <Button onClick={this.crop}>确定</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default injectSheet(styles)(CropperDialog);
