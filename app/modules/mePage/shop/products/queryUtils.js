export const queryToSearch = (query = {}) => {
  const result = { ...query };
  const { available } = query;
  if (available != null) {
    if (available === 'true') {
      result.available = true;
    } else if (available === 'false') {
      result.available = false;
    }
  }
  return result;
};

export const queryToString = (query = {}) => {
  const obj = { ...query };
  return JSON.stringify(obj);
};
