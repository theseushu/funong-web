import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Page as InquiryPage } from 'modules/common/inquiry';
import { editPath } from './constants';
import { selectors } from './ducks';
import Page from '../utils/page';

const Inquiries = ({ pending, result }) => (
  <InquiryPage pending={pending} page={result} hideUser actions={['enable', 'disable', 'edit', 'remove']} />
);

Inquiries.propTypes = {
  pending: PropTypes.bool,
  result: PropTypes.object,
};

const Content = connect(
  selectors.page,
)(Inquiries);

export default (props) => (<Page
  {...props}
  helmet={{ title: '富农商城-我的采购' }}
  editPath={editPath}
  content={<Content />}
/>);
