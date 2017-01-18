import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import _now from 'lodash/now';
import IconButton from 'react-mdl/lib/IconButton';

const generateKey = () => _now();

class FileUploadItem extends Component {
  static propTypes = {
    file: PropTypes.shape({
      process: PropTypes.shape({
        dataUrl: PropTypes.string.isRequired,
      }),
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
    className: PropTypes.string,
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
    const { uploadFile, uploadFileProgress, file: { process: { dataUrl, width, height } } } = this.props;
    uploadFile({
      key: this.key,
      filename: `${this.key}.png`,
      dataUrl,
      width,
      height,
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
    const { file: { process, upload }, sheet: { classes }, uploadStates, className = '' } = this.props;
    let info;
    const uploadingState = uploadStates[this.key];
    if (uploadingState) {
      const { pending, rejected, percent } = uploadingState; // eslint-disable-line
      if (pending) {
        info = <div className={classes.info} style={{ height: `${100 - percent}%` }} />;
      } else if (rejected) {
        info = (
          <div className={classes.info} style={{ background: 'rgba(255, 0, 0, 0.5)' }}>
            <div>重试</div>
            <IconButton name="refresh" onClick={(e) => { e.preventDefault(); this.uploadFile(); }} />
          </div>
        );
      }
    }
    return (
      <div className={[classes.wrapper, className].join(' ')}>
        <img role="presentation" src={(process && process.dataUrl) ? process.dataUrl : upload.file.url} />
        {info}
      </div>
    );
  }
}

export default injectSheet({
  wrapper: {
    width: 72,
    height: 96,
    margin: 4,
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.5)',
  },
})(FileUploadItem);
