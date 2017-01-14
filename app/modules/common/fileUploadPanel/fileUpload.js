import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Image from 'react-bootstrap/lib/Image';
import _now from 'lodash/now';

const styles = {
  wrapper: {
    width: 72,
    height: 72,
    padding: 4,
    boxSizing: 'border-box',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      maxWidth: '100%',
      maxHeight: '100%',
    },
  },
  info: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.5)',
  },
};

const generateKey = () => _now();

class FileUpload extends Component {
  static propTypes = {
    file: PropTypes.shape({
      process: PropTypes.shape({
        dataUrl: PropTypes.string.isRequired,
      }).isRequired,
      upload: PropTypes.shape({
        rejected: PropTypes.bool,
        file: PropTypes.shape({
          id: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
          error: PropTypes.object,
        }),
      }).isRequired,
    }).isRequired,
    sheet: PropTypes.object.isRequired,
    uploadFile: PropTypes.func.isRequired,
    uploadFileProgress: PropTypes.func.isRequired,
    uploadStates: PropTypes.object,
    onUploaded: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = { percent: 0 };
  }
  componentDidMount() {
    const key = generateKey();
    this.key = key;
    const { file: { upload: { file, rejected } } } = this.props;
    if (!file && !rejected) {
      this.uploadFile();
    }
  }
  uploadFile = () => {
    const { uploadFile, uploadFileProgress, file: { process: { dataUrl } } } = this.props;
    uploadFile({
      key: this.key,
      filename: `${this.key}.png`,
      dataUrl,
      onprogress: (percent) => {
        uploadFileProgress(this.key, percent);
      },
      meta: {
        resolve: (uploadedFile) => this.props.onUploaded(uploadedFile),
        reject: (err) => this.props.onUploaded(null, err),
      },
    });
  }
  render() {
    const { file: { process: { dataUrl }, upload: { file } }, sheet: { classes }, uploadStates } = this.props;
    let info;
    const uploadingState = uploadStates[this.key];
    if (uploadingState) {
      const { pending, rejected, percent, error } = uploadingState; // eslint-disable-line
      if (pending) {
        info = <div className={classes.info} style={{ height: `${100 - percent}%` }} />;
      } else if (rejected) {
        info = (
          <div className={classes.info} style={{ height: '100%', background: 'rgba(255, 0, 0, 0.5)' }}>
            <a href="#dummy" onClick={(e) => { e.preventDefault(); this.uploadFile(); }}>上传失败<br />点击重试</a>
          </div>
        );
      }
    }
    return (
      <div className={classes.wrapper}>
        <Image src={file ? file.url : dataUrl} />
        {info}
      </div>
    );
  }
}

export default injectSheet(styles)(FileUpload);
