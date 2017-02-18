import { connect } from 'react-redux';
import { currentUserSelector, myShopSelector } from 'modules/data/ducks/selectors';
import Info from './info';

export default connect(
  (state) => {
    const user = currentUserSelector(state);
    const shop = myShopSelector(state);
    return { user, shop };
  }
)(Info);
