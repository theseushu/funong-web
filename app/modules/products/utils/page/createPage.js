import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import Layout from 'modules/common/layout';
import { createProductSelector } from 'modules/data/ducks/selectors';
import createForm from './createForm';

export default ({ type, actions, EMPTY_PRODUCT, FORM_NAME, FormComponent, Display }) => {
  const Form = createForm(FORM_NAME, actions, FormComponent);
  const Page = ({ product, params: { id }, location: { query } }) => (
    <Layout
      content={
        (id === 'new' || query.edit) ?
          <Form initialValues={product || EMPTY_PRODUCT} /> :
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
  };

  return connect(
    (state, { params: { id } }) => ({ product: id === 'new' ? null : createProductSelector(type, id)(state) }),
  )(Page);
};
