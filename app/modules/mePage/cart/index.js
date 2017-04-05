import React from 'react';
import Page from '../page';
import Header from '../header';
import Cart from './cart';

const CartPage = () => (
  <Page header={<Header />} helmet={{ title: '富农商城-购物车' }} smallContent={false}>
    <Cart />
  </Page>
);

export default CartPage;
