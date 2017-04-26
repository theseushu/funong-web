import React from 'react';
import _omitBy from 'lodash/omitBy';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import success from 'modules/toastr/success';
import { publishTypesInfo } from 'funong-common/lib/appConstants';

const omitFileds = ['shop', 'original', 'updatedAt', 'owner', 'minPrice', 'createdAt', 'thumbnail'];
export default (type, FORM_NAME, actions, FormComponent) => {
  const { create, update } = actions;
  return reduxForm({
    form: FORM_NAME,  // a unique identifier for this form
    onSubmit: ({ objectId, capacity, count, ...params }, dispatch, { initialValues, shop }) => (
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
          }, (value, key) => omitFileds.indexOf(key) > -1))); // we don't update shop in any case. so omit it
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
                    dispatch(browserHistory.push(`/me/published/${publishTypesInfo[type].plural}`));
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
