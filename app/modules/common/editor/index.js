import React, { Component, PropTypes } from 'react';
import RichTextEditor from 'react-rte';

const toolbarConfig = {
  // Optionally specify the groups to display (displayed in the order listed).
  display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
  INLINE_STYLE_BUTTONS: [
    { label: '粗体', style: 'BOLD', className: 'custom-css-class' },
    { label: '斜体', style: 'ITALIC' },
    { label: '下划线', style: 'UNDERLINE' },
  ],
  BLOCK_TYPE_DROPDOWN: [
    { label: '一般', style: 'unstyled' },
    { label: '大标题', style: 'header-one' },
    { label: '中标题', style: 'header-two' },
    { label: '小标题', style: 'header-three' },
  ],
  BLOCK_TYPE_BUTTONS: [
    { label: '列表', style: 'unordered-list-item' },
    { label: '有序列表', style: 'ordered-list-item' },
  ],
  LINK_BUTTONS: [
    { label: '1', style: 'link' },
    { label: '2' },
  ],
};

export default class Editor extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    content: PropTypes.string,
  };
  constructor(props) {
    super(props);
    const { content } = this.props;
    this.state = { value: content ? RichTextEditor.createValueFromString(content, 'html') : RichTextEditor.createEmptyValue() };
  }
  onChange = (value) => {
    this.setState({ value });
  };
  onBlur = () => {
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        this.state.value.toString('html')
      );
    }
  }
  render() {
    return (
      <RichTextEditor
        value={this.state.value}
        onChange={this.onChange}
        toolbarConfig={toolbarConfig}
        onBlur={this.onBlur}
      />
    );
  }
}
