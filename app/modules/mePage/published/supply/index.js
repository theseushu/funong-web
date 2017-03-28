import React from 'react';
import { connect } from 'react-redux';
import { editPath, Card, selector } from './constants';
import Page from '../utils/page';
import List from '../utils/list';
import Services from './services';

const Products = connect(
  selector,
)((props) => <List editPath={editPath} Card={Card} {...props} />);

export default () => (<Page
  editPath={editPath}
  title={<Services />}
  content={<Products />}
/>);
