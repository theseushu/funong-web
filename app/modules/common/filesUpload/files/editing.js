import React, { Component, PropTypes } from 'react';
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
      .filter((file) => !file.upload.file && !file.process.rejected && !file.process.dataUrl)
      .forEach((file) => {
        asyncLoadImage(file.rawFile)
          .then((canvas) => this.props.onProcessed(files.indexOf(file), canvas.toDataURL(), Number(canvas.getAttribute('width')), Number(canvas.getAttribute('height'))))
          .catch((error) => this.props.onProcessed(files.indexOf(file), null, null, null, error));
      });
  }
  render() {
    const { files, onUploaded, onItemClick } = this.props;

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
            <div className={`${styles.contentCenter} mdl-shadow--4dp`} style={{ width: 48, height: 48, margin: 16, borderRadius: '20%' }}>
              <Icon name="delete_sweep" className={styles.colorAccent} style={{ fontSize: 32 }} />
            </div>
          </Droppable>
        )}
      </Panel>
    );
  }
}

export default DragDropContext(HTML5Backend)(Editing);
