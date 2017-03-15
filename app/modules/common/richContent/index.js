import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Images from './images';

class RichContent extends Component {
  static propTypes = {
    richContent: PropTypes.shape({
      desc: PropTypes.string.isRequired,
      images: PropTypes.array.isRequired,
    }).isRequired,
    sheet: PropTypes.object.isRequired,
    onImagesChange: PropTypes.func,
    onDescChange: PropTypes.func,
    editing: PropTypes.bool,
    imageTitle: PropTypes.string,
    descTitle: PropTypes.string,
    allowGallery: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.state = { Editor: null };
  }
  componentDidMount() {
    const { editing } = this.props;
    if (editing) {
      this.loadEditor();
    }
  }
  componentWillReceiveProps({ editing }) {
    if (editing && !this.state.Editor) {
      this.loadEditor();
    }
  }
  loadEditor = () => {
    System.import('modules/common/editor').then((module) => {
      if (!this.state.Editor) {
        this.setState({ Editor: module.default });
      }
    });
  }
  renderEditor = () => {
    // todo place holder using textLabel
    const { richContent: { desc }, onDescChange } = this.props;
    const { Editor } = this.state;
    if (Editor) {
      return <Editor ref={(editor) => { this.editorInstance = editor; }} onChange={onDescChange} content={desc} />;
    }
    return <div>正在加载编辑器</div>;
  }
  render() {
    const {
      richContent: { desc, images }, sheet: { classes },
      descTitle, imageTitle, editing, onImagesChange, allowGallery,
    } = this.props;
    return (
      <div className={classes.richContent}>
        {
          (editing || images.length > 0) && (
            <div className={classes.marginTop}>
              <Images title={imageTitle} editing={editing} images={images} onChange={onImagesChange} allowGallery={allowGallery} />
            </div>
          )
        }
        {
          editing && (
            <div className={classes.marginTop}>
              <small>{descTitle == null ? '介绍' : descTitle}</small>
            </div>
          )
        }
        <div>
          {
            editing ? (
              this.renderEditor()
            ) : (desc.length > 0 && <div className={classes.marginTop} dangerouslySetInnerHTML={{ __html: desc }} />) // eslint-disable-line
          }
        </div>
      </div>
    );
  }
}

export default injectSheet({
  richContent: {
    width: '100%',
  },
  marginTop: {
    marginTop: 16,
  },
})(RichContent);
