import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as mapDialogActions } from 'modules/mapDialog/ducks';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { actions, selectors } from 'api/profile';
import Addresses from './addresses';

const updateUser = actions.update;
const updateStateSelector = selectors.update;

const createAddress = ({ addresses = [] }, address, meta) => {
  const newAddresses = [...addresses, { ...address, default: addresses.length === 0 }];
  return updateUser({ addresses: newAddresses, meta });
};

const updateAddress = ({ addresses = [] }, index, address, meta) => {
  const newAddresses = [...addresses];
  newAddresses[index] = address;
  return updateUser({ addresses: newAddresses, meta });
};

const setDefaultAddress = ({ addresses = [] }, index, meta) => {
  const newAddresses = addresses.map((addr, i) => ({ ...addr, default: i === index }));
  return updateUser({ addresses: newAddresses, meta });
};

export default connect(
  (state) => ({ user: currentUserSelector(state), updateUserState: updateStateSelector(state) }),
  (dispatch) => bindActionCreators({
    openDialog: mapDialogActions.openDialog,
    createAddress,
    updateAddress,
    setDefaultAddress,
  }, dispatch),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    createAddress: (address, meta) => dispatchProps.createAddress(stateProps.user, address, meta),
    updateAddress: (index, address, meta) => dispatchProps.updateAddress(stateProps.user, index, address, meta),
    setDefaultAddress: (index, meta) => dispatchProps.setDefaultAddress(stateProps.user, index, meta),
    ...ownProps,
  })
)(Addresses);
