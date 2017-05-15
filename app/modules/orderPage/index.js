import React from 'react';
import { Layout } from 'modules/common/layouts';
import Page from './page';

const OrderPage = () => (
  <Layout
    helmet={{ title: '富农商城-创建订单' }}
    onReturn={'/me/cart'}
    smallContent={false}
  >
    <Page />
  </Layout>
  );

export default OrderPage;
