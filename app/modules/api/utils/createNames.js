import constantCase from 'constant-case';

export default (nameSpace, apiName) => ({
  slice: apiName,
  actionConstant: `${constantCase(apiName)}/${constantCase(apiName)}`,
  action: apiName,
});
