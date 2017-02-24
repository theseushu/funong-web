import React from 'react';
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import _isEmpty from 'lodash/isEmpty';
import { actions } from 'api/shopProduct';
import success from 'modules/toastr/success';
import FORM_NAME from './formName';
import productForm from './form';

const createShopProduct = actions.create;
const updateShopProduct = actions.update;

// export for unit testing
export const validate = (values) => {
  const { category, species, name, specs, desc } = values;
  const errors = {};
  if (_isEmpty(category)) {
    errors.category = '必填';
  }
  if (_isEmpty(species)) {
    errors.species = '必填';
  }
  if (_isEmpty(name) || name.length < 3) {
    errors.name = '必填, 至少3个字';
  }
  if (_isEmpty(specs)) {
    errors.specs = '必填';
  }
  if (_isEmpty(desc)) {
    errors.desc = '必填';
  } else if (desc.length < 20) {
    errors.desc = '请至少输入20字描述';
  }
  return errors;
};

export default reduxForm({
  form: FORM_NAME,  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
  onSubmit: ({ category, species, name, specs, recommend, agentable, desc, images, available, labels }, dispatch, { shop, initialValues }) => (
      initialValues.objectId ?
        new Promise((resolve, reject) => {
          dispatch(updateShopProduct({
            objectId: initialValues.objectId,
            category,
            species,
            name,
            specs,
            desc,
            images,
            recommend,
            agentable,
            available,
            labels,
            meta: {
              resolve: (product) => {
                const image = product.thumbnail.thumbnail_80_80;
                success({
                  icon: <img role="presentation" width="70" height="70" src={image} />,
                  title: `产品${product.name}的修改已保存`,
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
          dispatch(createShopProduct({
            category,
            species,
            name,
            specs,
            desc,
            images,
            recommend,
            agentable,
            available,
            labels,
            shop,
            meta: {
              resolve: (product) => {
                const image = product.thumbnail.thumbnail_80_80;
                success({
                  icon: <img role="presentation" width="70" height="70" src={image} />,
                  title: `新产品${product.name}已加入您的微店`,
                  onHideComplete: () => {
                    dispatch(push('/me/shop/products'));
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
