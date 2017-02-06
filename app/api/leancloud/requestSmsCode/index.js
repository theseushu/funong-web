export default ({ AV }) => (...params) => new Promise((resolve, reject) => setTimeout(resolve, 1000));
// export default ({ AV }) => ({ mobilePhoneNumber }) => {
//   return AV.Cloud.requestSmsCode(mobilePhoneNumber);
// };

