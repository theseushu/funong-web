import React, { PropTypes } from 'react';
import Normal from './normal';
import Editing from './editing';

const clickHander = (e, i, handler) => {
  e.preventDefault();
  if (typeof handler === 'function') {
    handler(i);
  }
};

const files = ({ editing = false, onItemClick, ...props }) =>
  editing ?
    <Editing {...props} onItemClick={(e, i) => clickHander(e, i, onItemClick)} /> :
    <Normal {...props} onItemClick={(e, i) => clickHander(e, i, onItemClick)} />;

files.propTypes = {
  editing: PropTypes.bool,
  onItemClick: PropTypes.func,
};

export default files;
