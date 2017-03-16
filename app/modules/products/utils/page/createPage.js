import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import Layout from 'modules/common/layout';
import { productTypes } from 'appConstants';
import { createProductSelector, myShopSelector } from 'modules/data/ducks/selectors';
import createForm from './createForm';

export default ({ type, actions, EMPTY_PRODUCT, FORM_NAME, FormComponent, Display }) => {
  const Form = createForm(FORM_NAME, actions, FormComponent);
  const Page = ({ product, params: { id }, location: { query }, shop }) => (
    <Layout
      content={
        (id === 'new' || query.edit) ?
          <Form initialValues={product || EMPTY_PRODUCT} shop={shop} /> :
          <Display product={product} />
      }
      smallContent={id === 'new' || !!query.edit}
    >
    </Layout>
  );

  Page.propTypes = {
    product: PropTypes.object,
    location: PropTypes.object,
    params: PropTypes.object,
    shop: PropTypes.object,
  };

  return connect(
    (state, { params: { id } }) => ({
      product: id === 'new' ? null : createProductSelector(type, id)(state),
      shop: id === 'new' && type === productTypes.shop ? myShopSelector(state) : undefined,
    }),
  )(Page);
};
