import { toastr as toastrEmitter } from 'react-redux-toastr';
import options from './options';

export default ({ icon, title, message, extra, ...otherOptions }) => {
  toastrEmitter.success(title, message, {
    icon,
    ...options,
    ...otherOptions,
    component: extra,
  });
};
