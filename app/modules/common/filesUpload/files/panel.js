import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';

const Panel = ({ sheet: { classes }, children }) => (
  <div className={classes.panel}>
    {children}
  </div>
);

Panel.propTypes = {
  sheet: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
};

export default injectSheet({
  panel: { display: 'flex', flexWrap: 'wrap', alignItems: 'center' },
})(Panel);
