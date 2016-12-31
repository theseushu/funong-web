import snakeCase from 'snake-case';

export default (apiName) => ({
  slice: apiName,
  actionConstant: `api/${snakeCase(apiName)}`,
  stateActionConstant: `api/${snakeCase(apiName)}_state`,
  action: apiName,
  apiName,
});
