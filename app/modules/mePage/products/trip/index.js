import { connect } from 'react-redux';
import { currentUserSelector, userTripProductsSelector } from 'modules/data/ducks/selectors';
import Trip from './trip';

export default connect(
  (state) => {
    const user = currentUserSelector(state);
    return { user, products: userTripProductsSelector(user.objectId)(state) };
  }
)(Trip);
