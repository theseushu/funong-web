import toastr from 'react-redux-toastr/lib/toastrEmitter';
import options from './options';

export default ({ icon, title, message, extra }) => {
  toastr.success(title, message, {
    icon,
    ...options,
    component: extra,
  });
};
