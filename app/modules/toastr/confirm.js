import { toastr as toastrEmitter } from 'react-redux-toastr';

export default ({ title, ok, cancel }) => {
  toastrEmitter.confirm(title, {
    okText: '确定',
    cancelText: '取消',
    onOk: ok,
    onCancel: cancel,
  });
};
