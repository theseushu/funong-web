import React from 'react';
import { connect } from 'react-redux';
import { editPath, Card, selector } from './constants';
import Page from '../utils/page';
import List from '../utils/list';

const Products = connect(
  selector,
)((props) => <List editPath={editPath} Card={Card} {...props} />);

export default (props) => (<Page
  {...props}
  helmet={{ title: '富农商城-我的乡村游' }}
  editPath={editPath}
  content={<Products />}
/>);
