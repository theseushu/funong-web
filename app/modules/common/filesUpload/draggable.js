import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import styles from '../styles';

class Draggable extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    children: PropTypes.any,
  }
  render() {
    const { connectDragSource, isDragging } = this.props;
    return (
      connectDragSource(
        <div
          className={`${styles.contentCenter} mdl-animation--default`}
          style={{ transitionProperty: 'all', transitionDuration: '500ms', opacity: isDragging ? 0.8 : undefined }}
        >
          {this.props.children}
        </div>
      )
    );
  }
}
const source = {
  beginDrag({ index }) {
    return { index };
  },
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

export default DragSource('FILE', source, collectSource)(Draggable);
