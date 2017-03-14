// export default ({ AV }) => (...params) => new Promise((resolve, reject) => setTimeout(resolve, 1000)); // eslint-disable-line
export default ({ AV }) => ({ mobilePhoneNumber }) => AV.Cloud.requestSmsCode(mobilePhoneNumber);

