import React, { Component, PropTypes } from 'react';
import FABButton from 'react-mdl/lib/FABButton';
import loadImage from 'blueimp-load-image';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Icon from 'react-mdl/lib/Icon';
import Draggable from '../draggable';
import Droppable from '../droppable';
import Panel from './panel';
import Item from '../item';
import styles from '../../styles';

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

class Editing extends Component {
  static propTypes = {
    files: PropTypes.array.isRequired, // { key: {process, upload, rawFile} }
    onProcessed: PropTypes.func.isRequired,
    onUploaded: PropTypes.func.isRequired,
    onSwitch: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onItemClick: PropTypes.func,
    onFilesSelected: PropTypes.func.isRequired,
  }
  componentDidMount() {
    const { files } = this.props;
    this.processFiles(files);
  }
  componentWillReceiveProps(newProps) {
    const { files } = newProps;
    this.processFiles(files);
  }
  onFilesSelected = (e) => {
    this.props.onFilesSelected(e);
  }
  processFiles = (files) => {
    files
      .filter((file) => !file.upload.file && !file.process.rejected && !file.process.dataUrl)
      .forEach((file) => {
        asyncLoadImage(file.rawFile)
          .then((canvas) => this.props.onProcessed(files.indexOf(file), canvas.toDataURL(), Number(canvas.getAttribute('width')), Number(canvas.getAttribute('height'))))
          .catch((error) => this.props.onProcessed(files.indexOf(file), null, null, null, error));
      });
  }
  render() {
    const { files, onUploaded, onItemClick } = this.props;

    if (files.length === 0) {
      return null;
    }
    const items = files.filter((file) => !!file.upload.file || !!file.process.dataUrl).map((file, i) => {
      const index = files.indexOf(file);
      return (
        <Draggable key={i} index={index}>
          <Droppable index={index} onDrop={this.props.onSwitch}>
            <a href="#_non_existing_anchor_" onClick={(e) => onItemClick(e, i)}>
              <Item
                file={file}
                onUploaded={(uploadedFile, err) => onUploaded(index, uploadedFile, err)}
                className="mdl-shadow--4dp"
              />
            </a>
          </Droppable>
        </Draggable>
      );
    });
    return (
      <Panel>
        {items}
        {items.length > 0 && (
          <Droppable onDrop={this.props.onDrop}>
            <div className={styles.contentCenter} style={{ width: 80 }}>
              <Icon name="delete_sweep" style={{ fontSize: 56 }} />
            </div>
          </Droppable>
        )}
        <div className={styles.contentCenter} style={{ width: 80 }}>
          <FABButton colored onClick={() => this.fileSelector.click()}>
            <Icon name="add" />
          </FABButton>
          <input
            className="hidden"
            multiple
            type="file"
            placeholder="点击选择"
            ref={(fileSelector) => { this.fileSelector = fileSelector; }}
            onChange={this.onFilesSelected}
          />
        </div>
      </Panel>
    );
  }
}

export default DragDropContext(HTML5Backend)(Editing);
