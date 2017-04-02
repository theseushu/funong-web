import React from 'react';
import { connect } from 'react-redux';
import { List } from 'modules/common/inquiry';
import { editPath, selector } from './constants';
import Page from '../utils/page';

const Inquiries = (props) => <List hideUser {...props} actions={['edit', 'withdraw']} />;

const Content = connect(
  selector,
)(Inquiries);

export default () => (<Page
  editPath={editPath}
  content={<Content />}
/>);