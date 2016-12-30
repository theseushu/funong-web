import React, { Component, PropTypes } from 'react';
import loadImage from 'blueimp-load-image';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Collapse from 'react-bootstrap/lib/Collapse';
import Panel from 'react-bootstrap/lib/Panel';

import FaTrashO from 'react-icons/lib/fa/trash-o';

import DragAndDropItem from './dragAndDropItem';
import FileUpload from './fileUploadContainer';

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
    show: PropTypes.bool.isRequired,
    files: PropTypes.array.isRequired, // { key: {process, upload, rawFile} }
    onProcessed: PropTypes.func.isRequired,
    onUploaded: PropTypes.func.isRequired,
    onSwitch: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = { processing: true };
  }
  componentDidMount() {
    const { files } = this.props;
    this.processFiles(files);
  }
  componentWillReceiveProps(newProps) {
    const { files } = newProps;
    this.processFiles(files);
  }
  processFiles = (files) => {
    files
      .filter((file) => !file.process.rejected && !file.process.dataUrl)
      .forEach((file) => {
        asyncLoadImage(file.rawFile)
          .then((canvas) => this.props.onProcessed(files.indexOf(file), canvas.toDataURL()))
          .catch((error) => this.props.onProcessed(files.indexOf(file), null, error));
      });
  }
  render() {
    const { show, files, onUploaded } = this.props;

    if (files.length === 0) {
      return null;
    }
    const items = files.filter((file) => !!file.process.dataUrl).map((file, i) => {
      const index = files.indexOf(file);
      return (
        <DragAndDropItem key={i} index={index} onDrop={this.props.onSwitch}>
          <FileUpload
            file={file}
            onUploaded={(uploadedFile, err) => onUploaded(index, uploadedFile, err)}
          />
        </DragAndDropItem>
      );
    });
    return (
      <Collapse in={show}>
        <Panel>
          <div style={{ display: 'flex' }}>
            {items}
            {items.length > 0 && (
              <DragAndDropItem onDrop={this.props.onDrop}>
                <FaTrashO style={{ padding: 15 }} width="100%" height="100%" />
              </DragAndDropItem>
            )}
          </div>
        </Panel>
      </Collapse>
    );
  }
}

export default DragDropContext(HTML5Backend)(FileUploadPanel);
