import React, { PropTypes } from 'react';
import Pagination from 'modules/common/pagination';
import List from './list';

const ProductPage = ({ type, page, onPageChange, empty }) => {
  if (!page || !page.results) {
    return null;
  }
  if (page.results.length === 0) {
    return empty || null;
  }
  return (
    <div>
      <List type={type} products={page.results} />
      <Pagination current={page.page} total={page.totalPages} boundary={1} sibling={1} onChange={onPageChange} />
    </div>
  );
};

ProductPage.propTypes = {
  type: PropTypes.string.isRequired,
  page: PropTypes.object,
  onPageChange: PropTypes.func,
  empty: PropTypes.object,
};

export default ProductPage;
