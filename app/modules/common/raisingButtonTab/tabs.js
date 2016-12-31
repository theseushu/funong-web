import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import RaisingButton from '../raisingButton';

const styles = {
  style: {
    display: 'flex',
    justifyContent: 'space-around',
    '>div': {
      margin: '0 0.5em',
    },
    '@media (max-width: 768px)': {
      width: '100%',
    },
  },
};

const Tabs = ({ index, switchTab, children, sheet: { classes } }) => {
  const activeChild = children[index];
  const buttons = children.map((child, i) => {
    const childIndex = child.props.index || i;
    return <RaisingButton key={childIndex} label={child.props.label} icon={child.props.icon} active={childIndex === index} onClick={() => switchTab(childIndex)} />;
  });
  return (
    <div>
      <div className="row">
        <div className={`col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 mt-5 ${classes.style}`}>
          {buttons}
        </div>
      </div>
      <div className="row mt-5">
        {activeChild}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  index: PropTypes.number.isRequired,
  switchTab: PropTypes.func,
  sheet: PropTypes.object.isRequired,
  children: PropTypes.any,
};

export default injectSheet(styles)(Tabs);
