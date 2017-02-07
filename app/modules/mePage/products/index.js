import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selector, fetchUserProducts } from 'api/fetchUserProducts';
import { currentUserSelector, productsSelector } from 'modules/data/ducks/selectors';
import Products from './products';

const userProductSelector = (products, user) => products.filter((prod) => prod.owner.objectId === user.objectId);

export default connect(
  (state) => ({ user: currentUserSelector(state) }),
)(connect(
  (state, ownProps) => ({ ...selector(state), products: userProductSelector(productsSelector(state), ownProps.user) }),
  (dispatch) => bindActionCreators({ fetchUserProducts }, dispatch),
)(Products));

