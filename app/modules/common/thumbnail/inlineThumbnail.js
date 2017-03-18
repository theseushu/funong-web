import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Thumbnail from './thumbnail';


const InlineThumbnail = ({ classes, ...props }) => (
  <div className={`${classes.wrapper}`}>
    <Thumbnail {...props} />
  </div>
  );

InlineThumbnail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  wrapper: {
    display: 'inline-block',
    width: '1em',
    height: '1em',
    verticalAlign: 'text-top',
  },
})(InlineThumbnail);
