import React from 'react';
import _omitBy from 'lodash/omitBy';
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import success from 'modules/toastr/success';

export default (FORM_NAME, actions, FormComponent) => {
  const { create, update } = actions;
  return reduxForm({
    form: FORM_NAME,  // a unique identifier for this form
    onSubmit: ({ objectId, createdAt, minPrice, owner, thumbnail, updatedAt, capacity, count, ...params }, dispatch, { initialValues, shop }) => (
      initialValues.objectId ?
        new Promise((resolve, reject) => {
          dispatch(update(_omitBy({
            objectId,
            ...params,
            capacity: capacity ? Number(capacity) : undefined,
            count: count ? Number(count) : undefined,
            meta: {
              resolve: (publish) => {
                const image = params.images && params.images.length > 0 ? params.images[0].thumbnail_80_80 : null;
                success({
                  icon: image ? <img role="presentation" width="70" height="70" src={image} /> : undefined,
                  title: '保存完毕',
                  message: publish.name,
                  onHideComplete: () => {
                  },
                });
                resolve();
              },
              reject,
            },
          }, (value, key) => key === 'shop'))); // we don't update shop in any case. so omit it
        }) :
        new Promise((resolve, reject) => {
          dispatch(create({
            ...params,
            capacity: capacity ? Number(capacity) : undefined,
            count: count ? Number(count) : undefined,
            shop,
            meta: {
              resolve: (publish) => {
                const image = params.images && params.images.length > 0 ? params.images[0].thumbnail_80_80 : null;
                success({
                  icon: image ? <img role="presentation" width="70" height="70" src={image} /> : undefined,
                  title: '创建成功',
                  message: publish.name,
                  onHideComplete: () => {
                    dispatch(push('/me/published'));
                  },
                });
                resolve();
              },
              reject,
            },
          }));
        })
    ),
  })(FormComponent);
};
