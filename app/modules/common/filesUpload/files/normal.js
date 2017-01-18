import React, { Component, PropTypes } from 'react';
import Panel from './panel';
import Item from '../item';

class Normal extends Component {
  static propTypes = {
    files: PropTypes.array.isRequired, // { key: {process, upload, rawFile} }
    onItemClick: PropTypes.func,
  }
  render() {
    const { files, onItemClick } = this.props;
    if (files.length === 0) {
      return null;
    }
    return (
      <Panel>
        {files.filter((file) => !!file.upload.file || !!file.process.dataUrl).map((file, i) => (
          <a key={i} href="#_non_existing_anchor_" onClick={(e) => onItemClick(e, i)}>
            <Item
              file={file}
              onUploaded={() => {}}
              className="mdl-shadow--2dp"
            />
          </a>
          ))}
      </Panel>
    );
  }
}

export default Normal;
