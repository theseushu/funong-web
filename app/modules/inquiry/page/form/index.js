import _omitBy from 'lodash/omitBy';
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import success from 'modules/toastr/success';
import { actions } from 'api/inquiry';
import Form from './form';

const { create, update } = actions;

export default reduxForm({
  form: 'inquiry',  // a unique identifier for this form
  onSubmit: ({ objectId, status, createdAt, owner, updatedAt, ...params }, dispatch, { initialValues }) => (
      initialValues.objectId ?
        new Promise((resolve, reject) => {
          dispatch(update(_omitBy({
            inquiry: initialValues,
            ...params,
            meta: {
              resolve: (product) => {
                success({
                  title: '保存完毕',
                  message: product.name,
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
            meta: {
              resolve: (product) => {
                success({
                  title: '创建成功',
                  message: product.name,
                  onHideComplete: () => {
                    dispatch(push('/me/inquiries'));
                  },
                });
                resolve();
              },
              reject,
            },
          }));
        })
    ),
})(Form);
