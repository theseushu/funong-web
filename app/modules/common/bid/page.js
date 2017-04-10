import React, { PropTypes } from 'react';
import Page, { NoResult } from 'modules/common/page';
import List from './list';

const BidPage = ({ mine, hideUser, hideContent, pending, page, onPageChange, onWithdrawn }) => (
  <Page
    pending={pending}
    page={page}
    onPageChange={onPageChange}
    empty={<NoResult title={'没有找到相关报价'} />}
    List={({ entries }) => <List mine={mine} bids={entries} hideContent={hideContent} hideUser={hideUser} onWithdrawn={onWithdrawn} />}
  />);

BidPage.propTypes = {
  pending: PropTypes.bool,
  mine: PropTypes.bool,
  hideContent: PropTypes.bool,
  hideUser: PropTypes.bool,
  page: PropTypes.object,
  onPageChange: PropTypes.func,
  onWithdrawn: PropTypes.func,
};

export default BidPage;
