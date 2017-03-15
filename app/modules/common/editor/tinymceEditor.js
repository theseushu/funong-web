import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectSheet from 'react-jss';
import TinyMCE from 'react-tinymce';
import loadImage from 'blueimp-load-image';
import { actions } from 'api/uploadFile/ducks';
import styles, { colors } from '../styles';
import './zh_CN';

function asyncLoadImage(file) {
  return new Promise((resolve, reject) => {
    const loadingCanvas = loadImage(
      file,
      (canvas) => {
        resolve(canvas);
      },
      { contain: true, maxWidth: 512, canvas: true, downsamplingRatio: 1 }
    );
    loadingCanvas.onerror = (error) => { reject(error); };
  });
}

const createConfig = (uploadFile) => ({
  language: 'zh_CN',
    language_url: 'https://cdn.bootcss.com/tinymce/3.5.8/plugins/searchreplace/langs/zh-tw_dlg.js', // eslint-disable-line
    // seems this url is required, even I load the real file via webpack. so there's this dummy one
  inline: true,
  menubar: false,
  image_advtab: true,
  image_class_list: [
      { title: '图片', value: styles.mw100 },
  ],
  plugins: [
    'autoresize autolink link image charmap preview',
    'wordcount media table contextmenu',
    'template paste textcolor colorpicker',
  ],
  toolbar1: 'undo redo | formatselect',
  toolbar2: 'bold italic strikethrough charmap',
  toolbar3: 'alignleft aligncenter alignright alignjustify | outdent indent',
  toolbar4: 'link image table media',
  toolbar5: 'forecolor backcolor template preview',
  file_picker_types: 'image',
  file_picker_callback(cb) {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/png, image/jpeg, image/gif, image/bmp');
    input.onchange = function () {
      try {
        const file = this.files[0];

        const id = `blobid${(new Date()).getTime()}`;
        const blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
        const blobInfo = blobCache.create(id, file);
        blobCache.add(blobInfo);
          // call the callback and populate the Title field with the file name
        cb(blobInfo.blobUri(), { title: 'Image', width: '100%', height: 'auto' });
          // asyncLoadImage(file).then((canvas) => {
          //   canvas.toBlob((blob) => {
          //   });
          // });
      } catch (err) {
        console.log(err);
      }
    };
    input.click();
  },
  images_upload_handler(blobInfo, success, failure) {
    const filename = blobInfo.filename();
    const id = blobInfo.id();
    const file = blobInfo.blob();
    asyncLoadImage(file).then((canvas) => {
      const width = canvas.width;
      const height = canvas.height;
      const dataUrl = canvas.toDataURL();
      uploadFile({
        key: id,
        filename,
        dataUrl,
        width,
        height,
        meta: {
          resolve: (uploadedFile) => success(uploadedFile.url),
          reject: () => failure('文件上传失败'),
        },
      });
    });
  },
  imagetools_cors_hosts: ['ac-ouy08orf.clouddn.com', 'codepen.io'],
});

class TinyMceEditor extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    uploadFile: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.content = props.content;
    this.config = createConfig(props.uploadFile);
  }
  handleEditorChange = (e) => {
    const { onChange } = this.props;
    onChange(e.target.getContent());
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <TinyMCE
          content={this.content}
          config={this.config}
          onChange={this.handleEditorChange}
        />
      </div>
    );
  }
}

export default injectSheet({
  wrapper: {
    width: '100%',
    minHeight: 50,
    border: `solid 1px ${colors.colorLightGrey}`,
    '& > .mce-tinymce.mce-container.mce-panel': { // it's wired that the right border of tinymce is overlapped by its innter iframe. I haven't dug deep enough, here's just a hack
      paddingRight: '1px !important',
    },
  },
})(connect(
  null,
  (dispatch) => bindActionCreators({ uploadFile: actions.uploadFile }, dispatch),
)(TinyMceEditor));
