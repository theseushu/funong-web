import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Button from 'react-mdl/lib/Button';

const Tabs = ({ index, switchTab, children, classes }) => {
  const activeChild = children[index];
  const buttons = children.map((child, i) => {
    const childIndex = child.props.index || i;
    return <Button key={childIndex} colored={childIndex === index} onClick={() => switchTab(childIndex)}>{child.props.label}</Button>;
  });
  return (
    <div className={classes.wrapper}>
      <div className={classes.tabs}>
        {buttons}
      </div>
      <div>
        {activeChild}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  index: PropTypes.number.isRequired,
  switchTab: PropTypes.func,
  classes: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
};

export default injectSheet({
  wrapper: {
    width: '100%',
  },
  tabs: {
    display: 'flex',
    justifyContent: 'space-around',
  },
})(Tabs);
