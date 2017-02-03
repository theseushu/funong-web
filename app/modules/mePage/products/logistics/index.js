import { connect } from 'react-redux';
import { currentUserSelector, userSupplyProductsSelector } from '../../../data/ducks/selectors';
import Supply from './supply';

export default connect(
  (state) => {
    const user = currentUserSelector(state);
    return { user, products: userSupplyProductsSelector(user.objectId)(state) };
  }
)(Supply);
