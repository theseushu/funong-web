import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import styles from '../styles';

class Droppable extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    onDrop: PropTypes.func.isRequired, // eslint-disable-line
    children: PropTypes.any,
  }
  render() {
    const { connectDropTarget, isOver } = this.props;
    return (
      connectDropTarget(
        <div
          className={`${styles.contentCenter} mdl-animation--default`}
          style={{ transitionProperty: 'all', transitionDuration: '500ms', opacity: isOver ? 0.8 : undefined, transform: isOver ? 'scale(1.1,1.1)' : undefined }}
        >
          {this.props.children}
        </div>
      )
    );
  }
}

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

export default DropTarget('FILE', target, collectTarget)(Droppable);
