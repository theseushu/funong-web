import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { selectors } from './ducks';
import Page from './page';

export default connect(
  (state) => {
    const user = currentUserSelector(state);
    const searchState = selectors.searchSupplyProducts(state);
    return { user, products: searchState.result || [] };
  }
)(Page);

