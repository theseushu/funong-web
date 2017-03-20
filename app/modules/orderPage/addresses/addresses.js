import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Button from 'react-mdl/lib/Button';
import { breakpoints } from 'modules/common/styles';
import Address from './address';

const Addresses = ({ user: { addresses }, openDialog, createAddress, updateAddress, setDefaultAddress, onAddressSelected, selectedIndex = 0, classes }) => (
  <div className={classes.addresses}>
    {addresses.map((address, i) => (
      <Address
        key={i}
        className={classes.address}
        address={address}
        openDialog={openDialog}
        updateAddress={(addr) => {
          updateAddress(i, addr);
        }}
        setDefaultAddress={() => {
          setDefaultAddress(
            i,
            {
              resolve: () => onAddressSelected(i),
            }
          );
        }}
        active={selectedIndex === i}
        onClick={() => onAddressSelected(i, address)}
      />
      )
    )}
    <div style={{ width: '100%' }}>
      <Button
        colored
        onClick={(e) => {
          e.preventDefault();
          openDialog({
            onSubmit: (address) => {
              createAddress(
                address,
                {
                  resolve: () => onAddressSelected(addresses.length, address),
                },
              );
            },
            postAddress: true,
          });
        }}
      >使用新地址</Button>
    </div>
  </div>
);

Addresses.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  createAddress: PropTypes.func.isRequired,
  updateAddress: PropTypes.func.isRequired,
  setDefaultAddress: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
  onAddressSelected: PropTypes.func,
  selectedIndex: PropTypes.number,
};

export default injectSheet({
  addresses: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  address: {
    margin: 4,
    width: 'calc(25% - 8px)',
    [breakpoints.mediaSmallScreen]: {
      width: 'calc(33.3% - 8px)',
    },
    [breakpoints.mediaTabletBelow]: {
      width: 'calc(50% - 8px)',
    },
  },
})(Addresses);
