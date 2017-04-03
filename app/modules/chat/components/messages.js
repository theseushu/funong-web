import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';

const Messages = ({ classes }) => (
  <div className={classes.messages}>
  </div>
);

Messages.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  messages: {
    flex: 1,
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
})(Messages);
