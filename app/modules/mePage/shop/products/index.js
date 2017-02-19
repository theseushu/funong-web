import { connect } from 'react-redux';
import { currentUserSelector, myShopSelector } from 'modules/data/ducks/selectors';
import Products from './products';

export default connect(
  (state) => {
    const user = currentUserSelector(state);
    const shop = myShopSelector(state);
    return { user, shop };
  }
)(Products);
