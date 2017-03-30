import React from 'react';
import { connect } from 'react-redux';
import { List } from 'modules/common/bid';
import { editPath, selector } from './constants';
import Page from '../utils/page';

const Bids = (props) => <List mine {...props} actions={['edit', 'withdraw']} />;

const Content = connect(
  selector,
)(Bids);

export default () => (<Page
  editPath={editPath}
  create={false}
  content={<Content />}
/>);
