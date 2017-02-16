export default (type) => {
  switch (type) {
    case '微店店主':
      return '/me/certs?type=company';
    case '农产农资收购':
      return '/supplies';
    case '农产农资供货':
      return '/supplies';
    case '物流供应商':
      return '/logistics';
    case '农贸专家':
      return '/me/certs?type=expert';
    case '一般用户':
    default:
      return '/';
  }
};
