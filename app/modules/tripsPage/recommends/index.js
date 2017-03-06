import { connect } from 'react-redux';
import { tripProductsSelector } from 'modules/data/ducks/selectors';
import Component from './recommends';

export default connect(
  (state) => ({ products: tripProductsSelector(state) })
)(Component);

