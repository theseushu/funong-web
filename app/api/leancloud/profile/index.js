/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import AV from 'leancloud-storage';
import { userToJSON } from '../utils/converters';
const debug = require('debug')('app:api:profile');

export default ({ context }) => {
  const fetchProfile = async ({ objectId }) => { // if its not for specific user, fetch currentUser then.
    const { token: { sessionToken } } = context;
    const userId = objectId || context.token.currentUserId;
    try {
      const avProfile = await AV.Object.createWithoutData('_User', userId)
        .fetch({
          include: ['avatar', 'images'],
        }, {
          sessionToken,
        }
        );
      const profile = userToJSON(avProfile);
      return profile;
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const updateProfile = async ({ ...attrs }) => {
    const { images, ...attributes } = attrs;
    const { token: { sessionToken, currentUserId } } = context;
    try {
      const avProfile = AV.Object.createWithoutData('_User', currentUserId);
      if (images) {
        avProfile.set('images', images.map((image) => AV.Object.createWithoutData('_File', image.id)));
      }
      await avProfile.save(attributes, { sessionToken });
      return attrs;
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const fetchAdmins = async () => {
    const { token: { sessionToken } } = context;
    try {
      const adminUsers = await new AV.Query('_User').containedIn('roles', ['admin', 'super']).find({ sessionToken });
      return adminUsers.map(userToJSON);
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const fetchUsers = async ({ mobilePhoneNumber, skip, limit }) => {
    const { token: { sessionToken } } = context;
    try {
      const query = new AV.Query('_User');
      if (mobilePhoneNumber) {
        query.contains('mobilePhoneNumber', mobilePhoneNumber);
      }
      query.skip(skip).limit(limit);
      const users = await query.find({ sessionToken });
      return users.map(userToJSON);
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const countAllUsers = async () => {
    const { token: { sessionToken } } = context;
    try {
      const count = await new AV.Query('_User').count({ sessionToken });
      return count;
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  return {
    fetchProfile,
    updateProfile,
    fetchAdmins,
    countAllUsers,
    fetchUsers,
  };
};
