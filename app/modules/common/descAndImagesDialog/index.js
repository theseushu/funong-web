import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Dialog from '../dialog';
import RichContent from '../richContent';

export const defaultValidate = ({ desc, images }) => images.length > 0 && desc.length > 10;

class DescDialog extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    desc: PropTypes.string,
    images: PropTypes.array,
    textLabel: PropTypes.string,
    validate: PropTypes.func,
  };
  constructor(props) {
    super(props);
    const { desc, images } = this.props;
    this.resetState(desc, images);
  }
  componentWillReceiveProps({ desc, images }) {
    this.resetState(desc, images);
  }
  onImagesChange = (newImages) => {
    this.setState({ images: newImages });
  }
  onDescChange = (desc) => {
    this.setState({ desc });
  }
  onSubmit = () => {
    const { onSubmit } = this.props;
    const { desc, images } = this.state;
    onSubmit({ desc, images });
    this.props.close();
  }
  resetState = (desc = '', images = []) => {
    this.state = { desc, images };
  }
  render() {
    const { close, textLabel, validate = defaultValidate } = this.props;
    const { desc, images } = this.state;
    return (
      <Dialog
        show
        onHide={close}
        onCancel={close}
        title={desc ? '添加描述' : '修改描述'}
        scrollableContent={
          <RichContent
            richContent={{ desc, images }}
            editing
            textLabel={textLabel}
            onImagesChange={this.onImagesChange}
            onDescChange={this.onDescChange}
            allowGallery={false}
          />
        }
        submit={{
          onSubmit: this.onSubmit,
          disabled: !validate({ desc, images }),
        }}
      />
    );
  }
}


export default injectSheet({
})(DescDialog);
