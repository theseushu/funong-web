import { connect } from 'react-redux';
import { currentUserSelector, supplyProductsSelector } from '../data/ducks/selectors';
import Page from './page';

export default connect(
  (state) => {
    const user = currentUserSelector(state);
    return { user, products: supplyProductsSelector(state) };
  }
)(Page);

