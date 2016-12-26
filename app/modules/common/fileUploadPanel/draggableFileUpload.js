import React, { Component, PropTypes } from 'react';

import { DragSource, DropTarget } from 'react-dnd';

import FileUpload from './fileUploadContainer';

class DraggableFileUpload extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    onSwitch: PropTypes.func.isRequired,
  }
  render() {
    const { connectDragSource, isDragging, connectDropTarget, isOver, ...props } = this.props;
    return (
      connectDropTarget(
        connectDragSource(
          <div className="material-transition" style={{ width: 100, height: 100, padding: 7, opacity: (isDragging || isOver) ? 0.2 : 1 }}>
            <FileUpload {...props} />
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
  drop({ index, onSwitch }, monitor) {
    const sourceIndex = monitor.getItem().index;
    onSwitch(sourceIndex, index);
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
