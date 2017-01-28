import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Dialog from '../dialog';
import RichContent from '../richContent';

export const defaultValidate = ({ text, images }) => images.length > 0 && text.length > 10;

class DescDialog extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    desc: PropTypes.shape({
      images: PropTypes.array,
      text: PropTypes.string,
    }),
    textLabel: PropTypes.string,
    validate: PropTypes.func,
  };
  constructor(props) {
    super(props);
    const { desc } = this.props;
    this.resetState(desc);
  }
  componentWillReceiveProps({ desc = {} }) {
    this.resetState(desc);
  }
  onImagesChange = (newImages) => {
    this.setState({ images: newImages });
  }
  onTextChange = (text) => {
    this.setState({ text });
  }
  onSubmit = () => {
    const { onSubmit } = this.props;
    const { text, images } = this.state;
    onSubmit({ text, images });
    this.props.close();
  }
  resetState = (desc = {}) => {
    this.state = { text: desc.text || '', images: desc.images || [] };
  }
  render() {
    const { desc, close, textLabel, validate = defaultValidate } = this.props;
    const { text, images } = this.state;
    return (
      <Dialog
        show
        onHide={close}
        onCancel={close}
        title={desc ? '添加描述' : '修改描述'}
        scrollableContent={
          <RichContent
            richContent={{ text, images }}
            editing
            textLabel={textLabel}
            onImagesChange={this.onImagesChange}
            onTextChange={this.onTextChange}
            allowGallery={false}
          />
        }
        submit={{
          onSubmit: this.onSubmit,
          disabled: !validate({ text, images }),
        }}
      />
    );
  }
}


export default injectSheet({
})(DescDialog);
