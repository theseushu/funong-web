import { connect } from 'react-redux';
import { createProductsSelector } from 'modules/data/ducks/selectors';
import Component from './recommends';

export default connect(
  (state) => ({ products: createProductsSelector('supply')(state) })
)(Component);

