import { connect } from 'react-redux';
import { currentUserSelector, userSupplyProductsSelector } from 'modules/data/ducks/selectors';
import Products from './products';

export default connect(
  (state) => {
    const user = currentUserSelector(state);
    return { user, products: userSupplyProductsSelector(user.objectId)(state) };
  }
)(Products);
