import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Address from './address';

const Addresses = ({ user: { addresses } }) => (
  <div style={{ width: '100%' }}>
    {addresses.map((address) => <Address address={address} />)}
  </div>
);

Addresses.propTypes = {
  user: PropTypes.object.isRequired,
};

export default injectSheet({})(Addresses);
