import { toastrEmitter } from 'react-redux-toastr/lib/toastrEmitter';
import options from './options';

export default ({ title, message, extra, ...other }) => {
  toastrEmitter.light(title, message, {
    icon: 'info',
    status: 'warning',
    ...options,
    ...other,
    component: extra,
  });
};
