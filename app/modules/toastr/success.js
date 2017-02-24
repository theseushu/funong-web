import { toastrEmitter } from 'react-redux-toastr/lib/toastrEmitter';
import options from './options';

export default ({ icon, title, message, extra, ...otherOptions }) => {
  toastrEmitter.success(title, message, {
    icon,
    ...options,
    ...otherOptions,
    component: extra,
  });
};
