import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PublishesPage from 'modules/common/publishes/page';
import type, { editPath } from './constants';
import { selectors } from './ducks';
import Page from '../utils/page';

const ProductPage = ({ pending, result }) => (
  <PublishesPage pending={pending} type={type} page={result} actions={['enable', 'disable', 'edit', 'remove']} />
);

ProductPage.propTypes = {
  pending: PropTypes.bool,
  result: PropTypes.object,
};

const Products = connect(
  selectors.page,
)(ProductPage);

export default (props) => (<Page
  {...props}
  helmet={{ title: '富农商城-我的乡村游' }}
  editPath={editPath}
  content={<Products />}
/>
);
