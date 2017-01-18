import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _without from 'lodash/without';
import injectSheet from 'react-jss';
import { toastr } from 'react-redux-toastr';
import Files from './files';
import { actions } from '../../fullScreenGallery/ducks';

const debug = require('debug')('app:photosField');

const styles = {

};

const getUploadedFiles = (files) => files.filter((file) => file.upload.file).map((file) => file.upload.file);

class FilesUpload extends Component {
  constructor(props) {
    super(props);
    const { files = [] } = this.props; // files here are uploaded files for sure
    this.state = { files: files.map((file) => ({ upload: { file } })) };
  }
  componentWillReceiveProps(newProps) {
    const { files = [] } = newProps; // files here are uploaded files for sure
    this.state = { files: files.map((file) => ({ upload: { file } })) };
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
      onChange(getUploadedFiles(newFiles));
    });
  }
  onSwitch = (x, y) => {
    const files = [...this.state.files];
    const temp = files[x];
    files[x] = files[y];
    files[y] = temp;
    this.setState({ files }, () => {
      const { onChange } = this.props;
      onChange(getUploadedFiles(files));
    });
  }
  onDrop = (x) => {
    const files = _without(this.state.files, this.state.files[x]);
    this.setState({ files }, () => {
      const { onChange } = this.props;
      onChange(getUploadedFiles(files));
    });
  }
  openFullScreenGallery = (i) => {
    const { openGallery } = this.props;
    const processedImages = this.state.files.filter((file) => !!file.upload.file || (!!file.process && !!file.process.dataUrl));
    if (processedImages.length > 0) {
      openGallery(processedImages.map((file) => {
        if (file.process) {
          return { src: file.process.dataUrl, width: file.process.width, height: file.process.height };
        }
        return { src: file.upload.file.url, width: file.upload.file.metaData.width, height: file.upload.file.metaData.height };
      }), i);
    }
  }
  render() {
    return (
      <Files
        editing={this.props.editing}
        files={this.state.files}
        onProcessed={this.onProcessed} onUploaded={this.onUploaded} onSwitch={this.onSwitch} onDrop={this.onDrop}
        onItemClick={this.openFullScreenGallery}
        onFilesSelected={this.onFilesSelected}
      />
    );
  }
}

FilesUpload.propTypes = {
  files: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  openGallery: PropTypes.func.isRequired,
  editing: PropTypes.bool,
};

export default connect(
  null,
  (dispatch) => ({
    ...bindActionCreators(actions, dispatch),
  })
)(injectSheet(styles)(FilesUpload));
