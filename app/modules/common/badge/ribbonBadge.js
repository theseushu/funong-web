import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { colors } from 'modules/common/styles';
import './assets/gh-fork-ribbon.scss';

const RibbonBadge = ({ classes, url, text, accent = true, position }) => {
  let positionClassName;
  let colorClassName;
  switch (position) {
    case 'leftTop':
      positionClassName = 'left-top';
      break;
    default:
      positionClassName = '';
  }
  if (!accent) {
    colorClassName = classes.pre;
  }
  return (
    <a href={url || '#'} className={`${classes.badge} github-fork-ribbon ${colorClassName} ${positionClassName}`} title={text}>{text}</a>
  );
};

RibbonBadge.propTypes = {
  classes: PropTypes.object.isRequired,
  url: PropTypes.string,
  text: PropTypes.string.isRequired,
  accent: PropTypes.bool,
  position: PropTypes.string,
};

export default injectSheet({
  badge: {
  },
  pre: {
    '&:before': {
      backgroundColor: `${colors.colorWarning} !important`,
    },
  },
})(RibbonBadge);
