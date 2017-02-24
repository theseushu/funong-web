import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import success from 'modules/toastr/success';
import { actions, selectors } from 'api/logisticsProduct';
import FORM_NAME from './formName';
import productForm from './form';

const createLogisticsProduct = actions.create;
const createLogisticsProductStateSelector = selectors.create;
const updateLogisticsProduct = actions.update;

export default reduxForm({
  form: FORM_NAME,  // a unique identifier for this form
  onSubmit: ({ capacity, maxNumber, price, range, name, location, available, desc, labels }, dispatch, { initialValues }) => (
      initialValues.objectId ?
        new Promise((resolve, reject) => {
          dispatch(updateLogisticsProduct({
            objectId: initialValues.objectId,
            capacity: Number(capacity),
            maxNumber: Number(maxNumber),
            price,
            range,
            name,
            desc,
            available,
            location,
            labels,
            meta: {
              meta: {
                resolve: (product) => {
                  const image = product.thumbnail.thumbnail_80_80;
                  success({
                    icon: <img role="presentation" width="70" height="70" src={image} />,
                    title: `${product.name}的修改已保存`,
                    onHideComplete: () => {
                    },
                  });
                  resolve();
                },
                reject,
              },
              reject,
            },
          }));
        }) :
        new Promise((resolve, reject) => {
          dispatch(createLogisticsProduct({
            capacity: Number(capacity),
            maxNumber: Number(maxNumber),
            price,
            range,
            name,
            available,
            desc,
            location,
            labels,
            meta: {
              resolve: (product) => {
                const image = product.thumbnail.thumbnail_80_80;
                success({
                  icon: <img role="presentation" width="70" height="70" src={image} />,
                  title: `${product.name}已发布成功`,
                  onHideComplete: () => {
                    dispatch(push('/me/products/logistics'));
                  },
                });
                resolve();
              },
              reject,
            },
          }));
        })
    ),
})(connect(
  (state) => ({ createLogisticsProductState: createLogisticsProductStateSelector(state) }),
)(productForm));
