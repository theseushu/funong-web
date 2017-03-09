import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';

const Address = ({ address }) => (
  <div style={{ width: '100%' }}>
  </div>
);

Address.propTypes = {
  address: PropTypes.object.isRequired,
};

export default injectSheet({})(Address);
