import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LoadingDiv from 'modules/common/glossary/loadingDiv';
import { Page as ProductsPage } from 'modules/common/product';
import { Product as NoResult } from 'modules/common/glossary/noResult';
import type, { editPath } from './constants';
import { selectors } from './ducks';
import Page from '../utils/page';
import Services from './services';

const ProductPage = ({ pending, result }) => (<LoadingDiv pending={pending}>
  {result && (
    <ProductsPage empty={<NoResult type={type} mine />} type={type} page={result} actions={['enable', 'disable', 'edit', 'remove']} />
  )}
</LoadingDiv>);

ProductPage.propTypes = {
  pending: PropTypes.bool,
  result: PropTypes.object,
};

const Products = connect(
  selectors.page,
)(ProductPage);

export default (props) => (<Page
  {...props}
  helmet={{ title: '富农商城-我的供应' }}
  editPath={editPath}
  title={<Services />}
  content={<Products />}
/>
);
