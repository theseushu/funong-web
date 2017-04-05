import React from 'react';
import Page from '../page';
import Header from '../header';
import Cart from './cart';

const CartPage = () => (
  <Page header={<Header />} smallContent={false}>
    <Cart />
  </Page>
);

export default CartPage;
