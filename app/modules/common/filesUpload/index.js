import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _without from 'lodash/without';
import injectSheet from 'react-jss';
import { toastrEmitter } from 'react-redux-toastr/lib/toastrEmitter';
import Icon from 'react-mdl/lib/Icon';
import IconButton from 'react-mdl/lib/IconButton';
import Tooltip from 'react-mdl/lib/Tooltip';
import { actions } from 'modules/fullScreenGallery/ducks';
import Files from './files';

const debug = require('debug')('app:photosField');

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
      toastrEmitter.warning(`${file.rawFile.name}`, '无法处理，请使用图片文件');
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
    const { title, editing, sheet: { classes }, allowGallery = true } = this.props;
    return (
      <div>
        {
          editing && (
            <div>
              <small className={classes.title}>{title || '图片内容'}</small>
              <IconButton colored name="add_circle" onClick={(e) => { e.preventDefault(); this.fileSelector.click(); }}></IconButton>
              <input
                className="hidden"
                multiple
                type="file"
                placeholder="点击选择"
                ref={(fileSelector) => { this.fileSelector = fileSelector; }}
                onChange={this.onFilesSelected}
              />
              <Tooltip
                label={
                  <div>
                    <div>点击 <Icon name="add" style={{ fontSize: 10 }} /> 按钮添加图片</div>
                    <div>拖拽图片到 <Icon name="delete_sweep" style={{ fontSize: 10 }} /> 删除图片</div>
                    <div>您也可以拖拽交换图片的位置</div>
                    <div>单击图片可预览</div>
                  </div>
                }
              >
                <IconButton accent name="help_outline"></IconButton>
              </Tooltip>
            </div>
          )
        }
        <Files
          editing={editing}
          files={this.state.files}
          onProcessed={this.onProcessed} onUploaded={this.onUploaded} onSwitch={this.onSwitch} onDrop={this.onDrop}
          onItemClick={allowGallery ? this.openFullScreenGallery : null}
          onFilesSelected={this.onFilesSelected}
        />
      </div>
    );
  }
}

FilesUpload.propTypes = {
  files: PropTypes.array,
  onChange: PropTypes.func,
  allowGallery: PropTypes.bool,
  openGallery: PropTypes.func.isRequired,
  editing: PropTypes.bool,
  title: PropTypes.string,
  sheet: PropTypes.object.isRequired,
};

export default connect(
  null,
  (dispatch) => ({
    ...bindActionCreators(actions, dispatch),
  })
)(injectSheet({
  title: {
    marginRight: 24,
  },
})(FilesUpload));
