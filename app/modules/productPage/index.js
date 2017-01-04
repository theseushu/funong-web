import React, { PropTypes } from 'react';
import _find from 'lodash/find';
import { connect } from 'react-redux';

import { productsSelector } from '../data/ducks/selectors';

import Appbar from '../common/Appbar';
import MainSection from '../common/mainSection';

import Product from './product';

const ProductPage = ({ product }) => (
  <div>
    <Appbar backgroundImage={(product.photos && product.photos.length > 0) ? product.photos[0].url : undefined} />
    <MainSection>
      <Product product={product} />
    </MainSection>
  </div>
  );

ProductPage.propTypes = {
  product: PropTypes.object.isRequired,
};

export default connect(
  (state, props) => ({ product: _find(productsSelector(state), (prod) => prod.objectId === props.params.id) })
)(ProductPage);

