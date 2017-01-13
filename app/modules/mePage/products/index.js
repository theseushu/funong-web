import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Products from './products';
import { selector, fetchUserProducts } from '../../api/fetchUserProducts';
import { currentUserSelector, productsSelector } from '../../data/ducks/selectors';

const userProductSelector = (products, user) => products.filter((prod) => prod.owner.objectId === user.objectId);

export default connect(
  (state) => ({ user: currentUserSelector(state) }),
)(connect(
  (state, ownProps) => ({ ...selector(state), products: userProductSelector(productsSelector(state), ownProps.user) }),
  (dispatch) => bindActionCreators({ fetchUserProducts }, dispatch),
)(Products));

