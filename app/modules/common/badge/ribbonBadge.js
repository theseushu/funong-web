import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import './assets/gh-fork-ribbon.scss';

const RibbonBadge = ({ classes, url, text }) => (
  <a href={url || '#'} className={`${classes.badge} github-fork-ribbon right-top`} title={text}>{text}</a>
);

RibbonBadge.propTypes = {
  classes: PropTypes.object.isRequired,
  url: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default injectSheet({
  badge: {
  },
})(RibbonBadge);
