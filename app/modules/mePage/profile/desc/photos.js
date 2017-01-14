import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _without from 'lodash/without';
import injectSheet from 'react-jss';
import { toastr } from 'react-redux-toastr';
import IconButton from 'react-mdl/lib/IconButton';
import FileUploadPanel from '../../../common/fileUploadPanel/fileUploadPanel';
import { actions } from '../../../fullScreenGallery/ducks';

const debug = require('debug')('app:photosField');

const styles = {

};

const convertStateToFormValue = (files) => files.filter((file) => file.upload.file).map((file) => file.upload.file);

class PhotosField extends Component {
  constructor(props) {
    super(props);
    const { files = [] } = this.props;
    this.state = { showPanel: false, files };
  }
  onFilesSelected = (e) => {
    const fileList = e.target.files;
    const files = [];
    for (let i = 0; i < fileList.length; i += 1) {
      files.push({ process: {}, upload: {}, rawFile: fileList[i] });
    }
    this.setState({ files: [...this.state.files, ...files] });
  }
  onProcessed = (index, dataUrl, width, height, error) => {
    const { files } = this.state;
    let file;
    if (dataUrl) {
      file = { ...files[index], process: { dataUrl, width, height } };
      const newFiles = [...files];
      newFiles[index] = file;
      this.setState({ files: newFiles });
    } else {
      file = { ...files[index], process: { rejected: true, error } };
      toastr.warning(`${file.rawFile.name}`, '无法处理，请使用图片文件');
      this.setState({ files: _without(this.state.files, files[index]) });
    }
  }
  onUploaded = (index, AVFile, error) => { // content is AV.File.toJSON();
    const { files } = this.state;
    let file;
    if (AVFile) {
      file = { ...files[index], upload: { file: AVFile } };
    } else {
      file = { ...files[index], upload: { rejected: true, error } };
      debug(error);
    }
    const newFiles = [...files];
    newFiles[index] = file;
    this.setState({ files: newFiles }, () => {
      const { onChange } = this.props;
      onChange(convertStateToFormValue(newFiles));
    });
  }
  onSwitch = (x, y) => {
    const files = [...this.state.files];
    const temp = files[x];
    files[x] = files[y];
    files[y] = temp;
    this.setState({ files }, () => {
      const { onChange } = this.props;
      onChange(convertStateToFormValue(files));
    });
  }
  onDrop = (x) => {
    const files = _without(this.state.files, this.state.files[x]);
    this.setState({ files }, () => {
      const { onChange } = this.props;
      onChange(convertStateToFormValue(files));
    });
  }
  openFullScreenGallery = (i) => {
    const { openGallery } = this.props;
    const processedImages = this.state.files.filter((file) => !!file.process.dataUrl);
    if (processedImages.length > 0) {
      openGallery(processedImages.map((file) => ({ src: file.process.dataUrl, width: file.process.width, height: file.process.height })), i);
    }
  }
  render() {
    return (
      <div>
        <div style={{ lineHeight: '32px' }}>
          <small>图片介绍</small><IconButton name="add" colored onClick={() => this.fileSelector.click()}>选择文件</IconButton>
        </div>
        <input
          className="hidden"
          multiple
          type="file"
          placeholder="点击选择"
          ref={(fileSelector) => { this.fileSelector = fileSelector; }}
          onChange={this.onFilesSelected}
        />
        { this.state.files && <FileUploadPanel
          show={this.state.files.length > 0}
          files={this.state.files}
          onProcessed={this.onProcessed} onUploaded={this.onUploaded} onSwitch={this.onSwitch} onDrop={this.onDrop}
          onImageClick={this.openFullScreenGallery}
        /> }
      </div>
    );
  }
}

PhotosField.propTypes = {
  files: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  openGallery: PropTypes.func.isRequired,
};

export default connect(
  null,
  (dispatch) => ({
    ...bindActionCreators(actions, dispatch),
  })
)(injectSheet(styles)(PhotosField));
