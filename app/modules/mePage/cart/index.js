import React, { PropTypes } from 'react';
import Page from '../page';
import Header from '../header';
import Cart from './cart';

const CartPage = ({ location }) => (
  <Page location={location} header={<Header />} helmet={{ title: '聚农商-购物车' }} smallContent={false}>
    <Cart />
  </Page>
);

CartPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default CartPage;
