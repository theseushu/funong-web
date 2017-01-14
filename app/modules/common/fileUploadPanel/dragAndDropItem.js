import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import styles from '../styles';

class DraggableFileUpload extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    onDrop: PropTypes.func.isRequired, // eslint-disable-line
    children: PropTypes.any,
  }
  render() {
    const { connectDragSource, isDragging, connectDropTarget, isOver } = this.props;
    return (
      connectDropTarget(
        connectDragSource(
          <div
            className={`${styles.contentCenter} material-transition`}
            style={{ opacity: (isDragging || isOver) ? 0.2 : 1 }}
          >
            {this.props.children}
          </div>
        )
      )
    );
  }
}
const source = {
  beginDrag({ index }) {
    return { index };
  },
};

const target = {
  drop({ index, onDrop }, monitor) {
    const sourceIndex = monitor.getItem().index;
    onDrop(sourceIndex, index);
  },
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}
function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

export default DropTarget('FILE', target, collectTarget)(DragSource('FILE', source, collectSource)(DraggableFileUpload));
