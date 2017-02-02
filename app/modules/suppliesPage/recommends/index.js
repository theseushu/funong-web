import { connect } from 'react-redux';
import { supplyProductsSelector } from '../../data/ducks/selectors';
import Component from './recommends';

export default connect(
  (state) => ({ products: supplyProductsSelector(state) })
)(Component);

