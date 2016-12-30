import React, { Component, PropTypes } from 'react';
import _without from 'lodash/without';
import injectSheet from 'react-jss';

import { toastr } from 'react-redux-toastr';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Button from 'react-bootstrap/lib/Button';
import FileUploadPanel from '../../common/fileUploadPanel/fileUploadPanel';

const debug = require('debug')('app:photosField');

const styles = {

};

const convertStateToFormValue = (files) => files.filter((file) => file.upload.file).map((file) => file.upload.file);

const convertFormValueToState = (files) => files.map((file) => ({ process: { dataUrl: '' }, upload: { file } }));

class PhotosField extends Component {
  constructor(props) {
    super(props);
    const { input: { value } } = this.props;
    this.state = { showPanel: false, files: value === '' ? [] : convertFormValueToState(value) };
  }
  onFilesSelected = (e) => {
    const fileList = e.target.files;
    const files = [];
    for (let i = 0; i < fileList.length; i += 1) {
      files.push({ process: {}, upload: {}, rawFile: fileList[i] });
    }
    this.setState({ files: [...this.state.files, ...files] });
  }
  onProcessed = (index, dataUrl, error) => {
    const { files } = this.state;
    let file;
    if (dataUrl) {
      file = { ...files[index], process: { dataUrl } };
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
      const { input: { onChange } } = this.props;
      onChange(convertStateToFormValue(newFiles));
    });
  }
  onSwitch = (x, y) => {
    const files = [...this.state.files];
    const temp = files[x];
    files[x] = files[y];
    files[y] = temp;
    this.setState({ files }, () => {
      const { input: { onChange } } = this.props;
      onChange(convertStateToFormValue(files));
    });
  }
  onDrop = (x) => {
    const files = _without(this.state.files, this.state.files[x]);
    this.setState({ files }, () => {
      const { input: { onChange } } = this.props;
      onChange(convertStateToFormValue(files));
    });
  }
  render() {
    const { meta: { dirty, error } } = this.props;
    const showError = (!!dirty) && (!!error);
    return (
      <FormGroup validationState={showError ? 'error' : undefined}>
        <ControlLabel>上传照片</ControlLabel>
        <div>
          <Button onClick={() => this.fileSelector.click()}>选择文件</Button>
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
        /> }
        {showError && <HelpBlock>{error}</HelpBlock>}
      </FormGroup>
    );
  }
}

PhotosField.propTypes = {
  name: PropTypes.string.isRequired, // eslint-disable-line
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

export default injectSheet(styles)(PhotosField);
