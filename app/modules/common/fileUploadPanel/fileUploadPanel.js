import React, { Component, PropTypes } from 'react';
import loadImage from 'blueimp-load-image';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Icon from 'react-mdl/lib/Icon';
import DragAndDropItem from './dragAndDropItem';
import FileUpload from './fileUploadContainer';

// const items = files.filter((file) => !!file.process.dataUrl).map((file) => ({
//   src: file.process.dataUrl,
//   thumbnail: 'http://lorempixel.com/120/90/sports/1',
//   w: 1200,
//   h: 900,
// }));
function asyncLoadImage(file) {
  return new Promise((resolve, reject) => {
    const loadingCanvas = loadImage(
      file,
      (canvas) => {
        resolve(canvas);
      },
      { contain: true, maxWidth: 1024, minWidth: 1024, canvas: true, downsamplingRatio: 0.2 }
    );
    loadingCanvas.onerror = (error) => { reject(error); };
  });
}

class FileUploadPanel extends Component {
  static propTypes = {
    files: PropTypes.array.isRequired, // { key: {process, upload, rawFile} }
    onProcessed: PropTypes.func.isRequired,
    onUploaded: PropTypes.func.isRequired,
    onSwitch: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onImageClick: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = { processing: true, galleryOpen: false };
  }
  componentDidMount() {
    const { files } = this.props;
    this.processFiles(files);
  }
  componentWillReceiveProps(newProps) {
    const { files } = newProps;
    this.processFiles(files);
  }
  onImageClick = (e, i) => {
    const { onImageClick } = this.props;
    e.preventDefault();
    if (typeof onImageClick === 'function') {
      onImageClick(i);
    }
  }
  processFiles = (files) => {
    files
      .filter((file) => !file.process.rejected && !file.process.dataUrl)
      .forEach((file) => {
        asyncLoadImage(file.rawFile)
          .then((canvas) => this.props.onProcessed(files.indexOf(file), canvas.toDataURL(), canvas.getAttribute('width'), canvas.getAttribute('height')))
          .catch((error) => this.props.onProcessed(files.indexOf(file), null, null, null, error));
      });
  }
  render() {
    const { files, onUploaded } = this.props;

    if (files.length === 0) {
      return null;
    }
    const items = files.filter((file) => !!file.process.dataUrl).map((file, i) => {
      const index = files.indexOf(file);
      return (
        <DragAndDropItem key={i} index={index} onDrop={this.props.onSwitch}>
          <a href="#gallery" onClick={(e) => this.onImageClick(e, i)}>
            <FileUpload
              file={file}
              onUploaded={(uploadedFile, err) => onUploaded(index, uploadedFile, err)}
            />
          </a>
        </DragAndDropItem>
      );
    });
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        {items}
        {items.length > 0 && (
          <DragAndDropItem onDrop={this.props.onDrop}>
            <Icon name="delete_sweep" style={{ fontSize: 50 }} />
          </DragAndDropItem>
        )}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(FileUploadPanel);
