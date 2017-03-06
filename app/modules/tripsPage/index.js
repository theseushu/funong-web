import { connect } from 'react-redux';
import { currentUserSelector } from '../data/ducks/selectors';
import { selectors } from './ducks';
import Page from './page';

export default connect(
  (state) => {
    const user = currentUserSelector(state);
    const searchState = selectors.searchTripProducts(state);
    return { user, products: searchState.result || [] };
  }
)(Page);

