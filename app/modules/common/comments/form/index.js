import { reduxForm } from 'redux-form';
import success from 'modules/toastr/success';
import { actions } from 'api/comment';
import FORM_NAME from './formName';
import productForm from './form';

const createComment = actions.create;

export default reduxForm({
  form: FORM_NAME,  // a unique identifier for this form
  onSubmit: ({ desc, images }, dispatch, { target }) => (
    new Promise((resolve, reject) => {
      resolve();
      dispatch(createComment({
        ...target,
        desc,
        images,
        meta: {
          resolve: () => {
            success({
              title: '新评论已发布成功',
            });
            resolve();
          },
          reject,
        },
      }));
    })
  ),
})(productForm);
