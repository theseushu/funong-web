import { connect } from 'react-redux';
import { currentUserSelector, createUserProductsSelector } from 'modules/data/ducks/selectors';
import Supply from './supply';

export default connect(
  (state) => {
    const user = currentUserSelector(state);
    return { user, products: createUserProductsSelector('supply', user.objectId)(state) };
  }
)(Supply);
