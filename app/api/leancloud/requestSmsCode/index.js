import AV from 'leancloud-storage';
export default () => ({ mobilePhoneNumber }) => AV.Cloud.requestSmsCode(mobilePhoneNumber);
