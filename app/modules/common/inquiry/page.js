import React, { PropTypes } from 'react';
import Pagination from 'modules/common/pagination';
import List from './list';

const InquiryPage = ({ hideUser, page, onPageChange }) => {
  if (!page || !page.results || page.results.length === 0) {
    return null;
  }
  return (
    <div>
      <List hideUser={hideUser} inquiries={page.results} />
      <Pagination current={page.page} total={page.totalPages} boundary={1} sibling={1} onChange={onPageChange} />
    </div>
  );
};

InquiryPage.propTypes = {
  hideUser: PropTypes.bool,
  page: PropTypes.object,
  onPageChange: PropTypes.func,
};

export default InquiryPage;
