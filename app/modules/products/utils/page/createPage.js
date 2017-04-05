import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { Layout } from 'modules/common/layouts';
import { productTypes, productNames } from 'appConstants';
import { createProductSelector, myShopSelector } from 'modules/data/ducks/selectors';
import createForm from './createForm';

export default ({ type, actions, EMPTY_PRODUCT, FORM_NAME, FormComponent, Display }) => {
  const Form = createForm(FORM_NAME, actions, FormComponent);
  const Page = ({ product, params: { id }, location: { query }, shop }, { router }) => {
    let title;
    if (id === 'new') {
      title = `富农商城-发布新${productNames[type]}`;
    } else if (query.edit) {
      title = `富农商城-更新${productNames[type]}-${product.name}`;
    } else {
      title = `富农商城-${productNames[type]}-${product.name}`;
    }
    return (
      <Layout
        helmet={{ title }}
        onReturn={() => {
          // todo do not go back. If the former page is outside of this site... use a url parameter or something
          router.goBack();
        }}
        smallContent={id === 'new' || !!query.edit}
      >
        {
          (id === 'new' || query.edit) ?
            <Form initialValues={product || EMPTY_PRODUCT} shop={shop} /> :
            <Display product={product} />
        }
      </Layout>
    );
  };

  Page.contextTypes = {
    router: PropTypes.object.isRequired,
  };

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
