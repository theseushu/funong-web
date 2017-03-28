import React from 'react';
import { connect } from 'react-redux';
import { List } from 'modules/common/inquiry';
import { editPath, selector } from './constants';
import Page from '../utils/page';

const Content = connect(
  selector,
)((props) => <List hideUser {...props} actions={['edit', 'withdraw']} />);

export default () => (<Page
  editPath={editPath}
  content={<Content />}
/>);
