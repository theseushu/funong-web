import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PublishesPage from 'modules/common/publishes/page';
import type, { editPath } from './constants';
import { selectors } from './ducks';
import Page from '../utils/page';

const Inquiries = ({ pending, result }) => (
  <PublishesPage pending={pending} type={type} hideUser page={result} actions={['enable', 'disable', 'edit', 'remove']} />
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
  helmet={{ title: '聚农商-我的采购' }}
  editPath={editPath}
  content={<Content />}
/>);
