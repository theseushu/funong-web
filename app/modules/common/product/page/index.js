import React, { PropTypes } from 'react';
import { icons, productNames } from 'appConstants';
import Page, { NoResult } from 'modules/common/page';
import List from './list';

const ProductPage = ({ type, pending, page, onPageChange, actions }) => {
  return (
    <Page
      pending={pending}
      page={page}
      onPageChange={onPageChange}
      NoResult={<NoResult icon={icons[type]} title={`没有找到${productNames[type]}`} />}
      List={({ entries }) => <List type={type} products={entries} actions={actions} />}
    />
  );
};

ProductPage.propTypes = {
  type: PropTypes.string.isRequired,
  page: PropTypes.object,
  onPageChange: PropTypes.func,
  pending: PropTypes.bool,
  actions: PropTypes.array,
};

export default ProductPage;
