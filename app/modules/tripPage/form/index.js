import React from 'react';
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import success from 'modules/toastr/success';
import { actions } from 'api/tripProduct';
import FORM_NAME from './formName';
import productForm from './form';

const createTripProduct = actions.create;
const updateTripProduct = actions.update;


export default reduxForm({
  form: FORM_NAME,  // a unique identifier for this form
  onSubmit: ({ name, specs, location, desc, images, labels }, dispatch, { initialValues }) => (
      initialValues.objectId ?
        new Promise((resolve, reject) => {
          dispatch(updateTripProduct({
            product: initialValues,
            name,
            specs,
            desc,
            images,
            location,
            labels,
            meta: {
              resolve: (product) => {
                const image = images[0].thumbnail_80_80;
                success({
                  icon: <img role="presentation" width="70" height="70" src={image} />,
                  title: `乡村游${product.name}的修改已保存`,
                  onHideComplete: () => {
                  },
                });
                resolve();
              },
              reject,
            },
          }));
        }) :
        new Promise((resolve, reject) => {
          dispatch(createTripProduct({
            name,
            specs,
            desc,
            images,
            location,
            labels,
            meta: {
              resolve: (product) => {
                const image = images[0].thumbnail_80_80;
                success({
                  icon: <img role="presentation" width="70" height="70" src={image} />,
                  title: `新产品${product.name}已发布成功`,
                  onHideComplete: () => {
                    dispatch(push('/me/products'));
                  },
                });
                resolve();
              },
              reject,
            },
          }));
        })
    ),
})(productForm);
