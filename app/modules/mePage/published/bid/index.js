import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Page as BidPage } from 'modules/common/bid';
import { editPath } from './constants';
import { selectors } from './ducks';
import Page from '../utils/page';

const Bids = ({ pending, result }) => <BidPage mine pending={pending} page={result} actions={['edit', 'withdraw']} />;

Bids.propTypes = {
  pending: PropTypes.bool,
  result: PropTypes.object,
};

const Content = connect(
  selectors.page,
)(Bids);

export default (props) => (<Page
  {...props}
  helmet={{ title: '富农商城-我的报价' }}
  editPath={editPath}
  create={false}
  content={<Content />}
/>);
