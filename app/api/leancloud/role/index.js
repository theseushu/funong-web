/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import { roleToJSON } from '../converters';
const debug = require('debug')('app:api:role');

export default ({ AV, context }) => {
  const fetchAllRoles = async () => {
    const { token: { sessionToken } } = context;
    try {
      const roles = await new AV.Query('_Role').find({ sessionToken });
      return roles.map(roleToJSON);
    } catch (err) {
      debug(err);
      throw err;
    }
  };
  const fetchUserRoles = async () => {
    const { token: { sessionToken } } = context;
    try {
      const roles = await AV.Cloud.run('fetchUserRoles', {}, { sessionToken });
      return roles.map((role) => role.name);
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const addUserToRole = async ({ role, user }) => {
    const { token: { sessionToken } } = context;
    try {
      await AV.Cloud.run('setUserToRole', { role, user }, { sessionToken });
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const removeUserFromRole = async ({ role, user }) => {
    const { token: { sessionToken } } = context;
    try {
      await AV.Cloud.run('removeUserFromRole', { role, user }, { sessionToken });
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  return {
    fetchAllRoles,
    fetchUserRoles,
    addUserToRole,
    removeUserFromRole,
  };
};
