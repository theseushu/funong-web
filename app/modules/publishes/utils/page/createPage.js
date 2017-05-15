import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { Layout } from 'modules/common/layouts';
import { publishTypesInfo } from 'funong-common/lib/appConstants';
import { createPublishSelector, myShopSelector } from 'modules/data/ducks/selectors';
import createForm from './createForm';

export default ({ type, actions, EMPTY_PRODUCT, FORM_NAME, FormComponent, Display }) => {
  const Form = createForm(type, FORM_NAME, actions, FormComponent);
  const info = publishTypesInfo[type];
  const Page = ({ entry, params: { id }, location, shop }, { router }) => {
    const { query } = location;
    let title;
    if (id === 'new') {
      title = `富农商城-发布新${info.title}`;
    } else if (query.edit) {
      title = `富农商城-更新${info.title}-${entry.name}`;
    } else {
      title = `富农商城-${info.title}-${entry.name}`;
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
            <Form initialValues={entry || EMPTY_PRODUCT} shop={shop} /> :
            <Display type={type} entry={entry} location={location} />
        }
      </Layout>
    );
  };

  Page.contextTypes = {
    router: PropTypes.object.isRequired,
  };

  Page.propTypes = {
    entry: PropTypes.object,
    location: PropTypes.object,
    params: PropTypes.object,
    shop: PropTypes.object,
  };

  return connect(
    (state, { params: { id } }) => ({
      entry: id === 'new' ? null : createPublishSelector(type, id)(state),
      shop: id === 'new' && info.shop ? myShopSelector(state) : undefined,
    }),
  )(Page);
};
