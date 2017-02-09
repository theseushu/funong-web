import { toastrEmitter } from 'react-redux-toastr/lib/toastrEmitter';
import options from './options';

export default ({ icon, title, message, extra }) => {
  toastrEmitter.success(title, message, {
    icon,
    ...options,
    component: extra,
  });
};
