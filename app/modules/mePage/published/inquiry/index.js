import React from 'react';
import { connect } from 'react-redux';
import { List } from 'modules/common/inquiry';
import { editPath, selector } from './constants';
import Page from '../utils/page';

const Inquiries = (props) => <List hideUser {...props} actions={['edit', 'withdraw']} />;

const Content = connect(
  selector,
)(Inquiries);

export default (props) => (<Page
  {...props}
  helmet={{ title: '富农商城-我的采购' }}
  editPath={editPath}
  content={<Content />}
/>);
