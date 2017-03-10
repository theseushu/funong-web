import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';

const Orders = ({ items, classes }) => (
  <div>
    {items.length}
  </div>
);

Orders.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
};

export default injectSheet({

})(Orders);
