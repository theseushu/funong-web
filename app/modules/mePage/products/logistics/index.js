import { connect } from 'react-redux';
import { currentUserSelector, userLogisticsProductsSelector } from 'modules/data/ducks/selectors';
import Logistics from './logistics';

export default connect(
  (state) => {
    const user = currentUserSelector(state);
    return { user, products: userLogisticsProductsSelector(user.objectId)(state) };
  }
)(Logistics);
