import React, { Component, PropTypes } from 'react';
import Textfield from 'react-mdl/lib/Textfield';
import injectSheet from 'react-jss';
import Images from './images';

class RichContent extends Component {
  static propTypes = {
    richContent: PropTypes.shape({
      text: PropTypes.string.isRequired,
      images: PropTypes.array.isRequired,
    }).isRequired,
    sheet: PropTypes.object.isRequired,
    onImagesChange: PropTypes.func,
    onTextChange: PropTypes.func,
    editing: PropTypes.bool,
    textLabel: PropTypes.string,
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
    System.import('../editor').then((module) => {
      if (!this.state.Editor) {
        this.setState({ Editor: module.default });
      }
    });
  }
  renderEditor = () => {
    const { richContent: { text }, onTextChange } = this.props;
    const { Editor } = this.state;
    if (Editor) {
      return <Editor ref={(editor) => { this.editorInstance = editor; }} onChange={onTextChange} content={text} />;
    }
    return <div>正在加载编辑器</div>;
  }
  render() {
    const { richContent: { text, images }, textLabel, sheet: { classes }, editing, onTextChange, onImagesChange, allowGallery } = this.props;
    return (
      <div>
        {
          (editing || images.length > 0) && (
            <div className={classes.marginTop}>
              <Images editing={editing} images={images} onChange={onImagesChange} allowGallery={allowGallery} />
            </div>
          )
        }
        {
          editing && (
            <div className={classes.marginTop}>
              <small>文字内容</small>
            </div>
          )
        }
        <div>
          {
            false ? (
              <Textfield
                style={{ width: '100%', boxSizing: 'border-box' }} rows={4}
                label={textLabel || '点击开始输入'} maxLength={20000}
                value={text} autoFocus onChange={(e) => onTextChange(e.target.value)}
              />
            ) : null
          }
        </div>
        <div>
          {
            editing ? (
              this.renderEditor()
            ) : (text.length > 0 && <div className={classes.marginTop} dangerouslySetInnerHTML={{ __html: text }} />) // eslint-disable-line
          }
        </div>
      </div>
    );
  }
}

export default injectSheet({
  marginTop: {
    marginTop: 16,
  },
})(RichContent);
