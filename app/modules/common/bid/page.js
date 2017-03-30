import React, { PropTypes } from 'react';
import Pagination from 'modules/common/pagination';
import List from './list';

const BidList = ({ hideUser, hideContent, page, onPageChange }) => {
  if (!page || !page.results || page.results.length === 0) {
    return null;
  }
  return (
    <div>
      <List hideContent={hideContent} hideUser={hideUser} bids={page.results} />
      <Pagination current={page.page} total={page.totalPages} boundary={1} sibling={1} onChange={onPageChange} />
    </div>
  );
};

BidList.propTypes = {
  hideContent: PropTypes.bool,
  hideUser: PropTypes.bool,
  page: PropTypes.object,
  onPageChange: PropTypes.func,
};

export default BidList;
